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
};

export function ChatBubble({ apiBaseUrl, title = "Agent Plane Talk" }: ChatBubbleProps) {
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
  const endpoint = useMemo(() => `${apiBaseUrl.replace(/\/$/, "")}/api/chat`, [apiBaseUrl]);

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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const payload: { assistant_message: string } = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: payload.assistant_message }]);
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
              <p className="chatbubble-header-subtitle">Aviation humor, clear skies, text-only comms.</p>
            </header>

            <div className="chatbubble-log">
              {messages.map((item, index) => (
                <article key={`${item.role}-${index}`} className={`chatbubble-message ${item.role}`}>
                  {item.content}
                </article>
              ))}
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
