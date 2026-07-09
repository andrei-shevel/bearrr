'use client';

import Link from 'next/link';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import './ChatWidget.css';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const GREETING = "Hi! I'm Andrei's site assistant. Ask me about his experience, projects, or apps.";

const SUGGESTIONS = ['What did Andrei do at Apollo.io?', 'What apps has he built?', 'What are his main skills?'];

const MAX_INPUT_LENGTH = 1000;

// URLs, email addresses, and internal routes (e.g. /contact) in assistant replies.
const LINK_PATTERN =
  /(https?:\/\/[^\s<>()"']*[^\s<>()"'.,!?;:]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|(?<![\w/])\/(?:apps|contact|cv|privacy|projects)\b(?![\w/-]))/g;

function MessageContent({ content }: { content: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(LINK_PATTERN)) {
    const text = match[0];
    if (match.index > lastIndex) nodes.push(content.slice(lastIndex, match.index));

    if (text.startsWith('http')) {
      nodes.push(
        <a key={match.index} className="chat-link" href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    } else if (text.startsWith('/')) {
      nodes.push(
        <Link key={match.index} className="chat-link" href={text}>
          {text}
        </Link>
      );
    } else {
      nodes.push(
        <a key={match.index} className="chat-link" href={`mailto:${text}`}>
          {text}
        </a>
      );
    }

    lastIndex = match.index + text.length;
  }

  if (lastIndex < content.length) nodes.push(content.slice(lastIndex));

  return <>{nodes}</>;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, isOpen]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || isStreaming) return;

    const history = [...messages, { role: 'user' as const, content }];
    setMessages(history);
    setInput('');
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-20) }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        const fallback =
          response.status === 429
            ? 'Too many messages. Please try again in a minute.'
            : 'Something went wrong. Please try again.';
        setMessages([...history, { role: 'assistant', content: data?.error ?? fallback }]);
        return;
      }

      setMessages([...history, { role: 'assistant', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: 'assistant', content: answer }]);
      }
    } catch {
      setMessages([...history, { role: 'assistant', content: 'Connection lost. Please try again.' }]);
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Chat with site assistant">
          <div className="chat-header">
            <div>
              <span className="chat-title">Ask me about my work</span>
              <span className="chat-subtitle">AI assistant, answers from my CV</span>
            </div>
            <button className="chat-close" type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="chat-messages" ref={listRef}>
            <div className="chat-message assistant">{GREETING}</div>
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.role}`}>
                {message.content ? (
                  <MessageContent content={message.content} />
                ) : (
                  <span className="chat-typing" aria-label="Assistant is typing" />
                )}
              </div>
            ))}
            {messages.length === 0 && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((suggestion) => (
                  <button key={suggestion} type="button" className="chat-suggestion" onClick={() => send(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              value={input}
              maxLength={MAX_INPUT_LENGTH}
              placeholder="Ask a question…"
              aria-label="Your question"
              onChange={(event) => setInput(event.target.value)}
            />
            <button className="chat-send" type="submit" disabled={isStreaming || !input.trim()} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 8h11M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        className={`chat-bubble${isOpen ? ' open' : ''}`}
        type="button"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12a8 8 0 0 1-8 8H4.5a1.5 1.5 0 0 1-1.06-2.56A8 8 0 1 1 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="12" r="1" fill="currentColor" />
          <circle cx="12.5" cy="12" r="1" fill="currentColor" />
          <circle cx="16.5" cy="12" r="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
