import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

/**
 * DateSeparator — "Today" pill centered in the chat area.
 */
const DateSeparator = ({ label }) => (
  <div className="flex items-center justify-center my-4 select-none">
    <span
      className="px-4 py-1 rounded-full text-xs font-medium shadow-sm"
      style={{
        background: "var(--surface)",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {label}
    </span>
  </div>
);

/**
 * MessageList — the full scrollable chat area including date separators,
 * message bubbles, and the fixed bottom MessageInput.
 */
const MessageList = ({ messages, onSend }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Group messages to add date separators
  // For simplicity, show "Today" before the first set and "Yesterday" if older dates
  const todayMessages = messages.filter((m) => !m.time.toLowerCase().includes("yesterday") && !m.time.toLowerCase().includes("mon"));
  const yesterdayMessages = messages.filter((m) => m.time.toLowerCase().includes("yesterday"));
  const olderMessages = messages.filter((m) => m.time.toLowerCase().includes("mon"));

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* ── Scrollable messages area ── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 relative"
        id="message-scroll-area"
        style={{
          // Subtle WhatsApp-inspired background pattern
          backgroundImage: `
            radial-gradient(circle at 20% 50%, var(--glow) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--glow) 0%, transparent 50%)
          `,
          backgroundSize: "100% 100%",
        }}
      >
        {/* WhatsApp subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(var(--primary) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10">
          {/* Older messages */}
          {olderMessages.length > 0 && (
            <>
              <DateSeparator label="Monday" />
              {olderMessages.map((msg, i) => (
                <MessageBubble key={msg.id} message={msg} index={i} />
              ))}
            </>
          )}

          {/* Yesterday's messages */}
          {yesterdayMessages.length > 0 && (
            <>
              <DateSeparator label="Yesterday" />
              {yesterdayMessages.map((msg, i) => (
                <MessageBubble key={msg.id} message={msg} index={olderMessages.length + i} />
              ))}
            </>
          )}

          {/* Today's messages */}
          {todayMessages.length > 0 && (
            <>
              <DateSeparator label="Today" />
              {todayMessages.map((msg, i) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  index={olderMessages.length + yesterdayMessages.length + i}
                />
              ))}
            </>
          )}

          {/* Anchor for auto-scroll */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Fixed bottom input ── */}
      <MessageInput onSend={onSend} />
    </div>
  );
};

export default MessageList;
