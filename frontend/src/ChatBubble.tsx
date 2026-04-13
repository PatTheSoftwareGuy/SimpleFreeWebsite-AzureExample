import { type KeyboardEvent, useMemo, useState } from "react";
import {
  Button,
  FluentProvider,
  Spinner,
  Text,
  Textarea,
  webLightTheme,
} from "@fluentui/react-components";

export type WidgetMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatBubbleProps = {
  apiBaseUrl: string;
  title?: string;
  description?: string;
};

export function ChatBubble({ apiBaseUrl, title = "Agent Plane Talk", description = "Aviation humor, clear skies, text-only comms." }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<WidgetMessage[]>([
    {
      role: "assistant",
      content: "Tower online. Agent Plane Talk is parked at gate C3 and ready for your request.",
    },
  ]);

  const canSend = draft.trim().length > 0 && !isBusy;
  const streamEndpoint = useMemo(() => `${apiBaseUrl.replace(/\/$/, "")}/api/chat/stream`, [apiBaseUrl]);

  async function sendMessage() {
    const text = draft.trim();
    if (!text || isBusy) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setDraft("");
    setIsBusy(true);

    try {
      const response = await fetch(streamEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const contentType = response.headers.get("content-type") ?? "";
      const isEventStream = contentType.includes("text/event-stream");
      if (!isEventStream || !response.body) {
        const payload: { assistant_message: string } = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: payload.assistant_message }]);
        return;
      }

      let assistantIndex = -1;
      setMessages((prev) => {
        assistantIndex = prev.length;
        return [...prev, { role: "assistant", content: "" }];
      });

      const appendAssistantText = (delta: string) => {
        if (!delta) {
          return;
        }
        setMessages((prev) => {
          if (assistantIndex < 0 || assistantIndex >= prev.length) {
            return prev;
          }

          const next = [...prev];
          const current = next[assistantIndex];
          next[assistantIndex] = { role: "assistant", content: `${current.content}${delta}` };
          return next;
        });
      };

      const setAssistantText = (text: string) => {
        setMessages((prev) => {
          if (assistantIndex < 0 || assistantIndex >= prev.length) {
            return prev;
          }

          const next = [...prev];
          next[assistantIndex] = { role: "assistant", content: text };
          return next;
        });
      };

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        let boundary = buffer.indexOf("\n\n");
        while (boundary >= 0) {
          const rawEvent = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);

          let eventType = "message";
          let eventData = "";
          for (const line of rawEvent.split(/\r?\n/)) {
            if (line.startsWith("event:")) {
              eventType = line.slice(6).trim();
            } else if (line.startsWith("data:")) {
              eventData += line.slice(5).trim();
            }
          }

          if (eventData) {
            const payload = JSON.parse(eventData) as {
              content?: string;
              assistant_message?: string;
              message?: string;
            };

            if (eventType === "delta" && typeof payload.content === "string") {
              appendAssistantText(payload.content);
            } else if (eventType === "done" && typeof payload.assistant_message === "string") {
              setAssistantText(payload.assistant_message);
            } else if (eventType === "error") {
              throw new Error(payload.message ?? "Chat stream failed.");
            }
          }

          boundary = buffer.indexOf("\n\n");
        }
      }
    } catch (error) {
      const fallback = "The tower lost radio contact. Please retry this transmission.";
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="chatbubble-shell">
        {isOpen && (
          <section className="chatbubble-panel" aria-label="AI Chat">
            <header className="chatbubble-header">
              <p className="chatbubble-header-title">{title}</p>
              <p className="chatbubble-header-subtitle">{description}</p>
            </header>

            <div className="chatbubble-log">
              {messages.map((item, index) => {
                const isEmptyAssistantPlaceholder =
                  item.role === "assistant" && item.content.trim().length === 0;
                if (isEmptyAssistantPlaceholder) {
                  return null;
                }

                return (
                  <article key={`${item.role}-${index}`} className={`chatbubble-message ${item.role}`}>
                    {item.content}
                  </article>
                );
              })}
              {isBusy && (
                <div className="chatbubble-message assistant">
                  <Spinner size="tiny" labelPosition="after">
                    <Text>Agent Plane Talk is taxiing for a response...</Text>
                  </Spinner>
                </div>
              )}
            </div>

            <div className="chatbubble-compose">
              <Textarea
                resize="vertical"
                value={draft}
                placeholder="Send a message to the tower"
                onChange={(_, data: { value: string }) => setDraft(data.value)}
                onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
              />
              <Button appearance="primary" onClick={() => void sendMessage()} disabled={!canSend}>
                Send
              </Button>
            </div>
          </section>
        )}

        <button
          className="chatbubble-button"
          aria-label={isOpen ? "Close chat" : "Open chat"}
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          {isOpen ? "×" : "✈"}
        </button>
      </div>
    </FluentProvider>
  );
}
