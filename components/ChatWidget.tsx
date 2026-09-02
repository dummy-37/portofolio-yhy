"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  provider?: string;
  sources?: string[];
  guardrail?: string;
};

function AssistantOrb({ size = "default" }: { size?: "default" | "small" }) {
  return (
    <span className={`assistant-orb assistant-orb--${size}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" role="img" focusable="false">
        <path
          d="M7.5 8.5h17a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5h-7.1l-5.15 3.3a.8.8 0 0 1-1.23-.67V22.5H7.5A3.5 3.5 0 0 1 4 19v-7a3.5 3.5 0 0 1 3.5-3.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
      </svg>
    </span>
  );
}

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I can help answer questions about Yahya's projects, experience, skills, and portfolio."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, isOpen]);

  async function sendQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setIsOpen(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({ role: message.role, content: message.content }))
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Chatbot request failed.");

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer,
          provider: data.provider,
          sources: data.sources,
          guardrail: data.guardrail
        }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error ? `Chatbot error: ${error.message}` : "Chatbot error: something went wrong."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(input);
  }

  return (
    <div className="floating-assistant">
      {isOpen ? (
        <aside className="chat-panel" aria-label="Portfolio chatbot">
          <div className="chat-header">
            <div className="chat-title-row">
              <AssistantOrb size="small" />
              <div>
                <h2>Portfolio Assistant</h2>
                <small>Online</small>
              </div>
            </div>
            <button
              className="chat-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
                <p>{message.content}</p>
                {message.provider ? (
                  <small>
                    {message.provider}
                    {message.sources?.length ? ` · ${message.sources.join(", ")}` : ""}
                  </small>
                ) : null}
              </div>
            ))}
            {isLoading ? (
              <div className="chat-message assistant loading-message">
                <p>Reading portfolio context...</p>
              </div>
            ) : null}
            <div ref={messageEndRef} />
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              aria-label="Ask portfolio assistant"
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send question">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M4.5 19.5 20 12 4.5 4.5l2.2 6.15L14 12l-7.3 1.35L4.5 19.5Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </aside>
      ) : (
        <div className="chat-tooltip" role="status">
          Ask about my portfolio
        </div>
      )}

      <button
        className={`chat-launcher ${isOpen ? "chat-launcher-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close portfolio chatbot" : "Open portfolio chatbot"}
      >
        {isOpen ? <span className="launcher-close" aria-hidden="true">×</span> : <AssistantOrb />}
        <span className="status-dot" aria-hidden="true" />
      </button>
    </div>
  );
}
