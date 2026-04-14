import React from "react";
import { createRoot, Root } from "react-dom/client";
import { ChatBubble } from "./ChatBubble";
import "./base.css";

export type MountOptions = {
  container?: HTMLElement;
  apiBaseUrl?: string;
  title?: string;
  description?: string;
  historyLimit?: number;
};

let widgetRoot: Root | null = null;

export function mount(options: MountOptions = {}): void {
  const host = options.container ?? document.body;
  const mountNode = document.createElement("div");
  host.appendChild(mountNode);

  widgetRoot = createRoot(mountNode);
  widgetRoot.render(
    <React.StrictMode>
      <ChatBubble
        apiBaseUrl={options.apiBaseUrl ?? window.location.origin}
        title={options.title ?? "Agent Plane Talk"}
        description={options.description ?? "Aviation humor, clear skies, text-only comms."}
        historyLimit={options.historyLimit}
      />
    </React.StrictMode>,
  );
}

export function unmount(): void {
  if (widgetRoot) {
    widgetRoot.unmount();
    widgetRoot = null;
  }
}

declare global {
  interface Window {
    SimpleChatBubble: {
      mount: typeof mount;
      unmount: typeof unmount;
    };
  }
}

window.SimpleChatBubble = {
  mount,
  unmount,
};
