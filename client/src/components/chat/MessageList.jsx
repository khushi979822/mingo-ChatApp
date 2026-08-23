/**
 * MessageList.jsx — Scrollable chat area with real messages,
 * proper date grouping, skeleton loader, and empty state.
 */

import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { MessageSkeleton } from "./SkeletonLoader";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

// ── Date helpers ──────────────────────────────────────────────────────────────
const isSameDay = (a, b) => {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
};

const formatDateLabel = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(d, now)) return "Today";
  if (isSameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

// ── DateSeparator ─────────────────────────────────────────────────────────────
const DateSeparator = ({ label }) => (
  <div className="flex items-center justify-center my-4 select-none">
    <span
      className="px-4 py-1 rounded-full text-xs font-medium"
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

// ── Group messages by date ────────────────────────────────────────────────────
const groupByDate = (messages) => {
  const groups = [];
  messages.forEach((msg) => {
    const dateKey = msg.createdAt
      ? new Date(msg.createdAt).toDateString()
      : "unknown";
    const last = groups[groups.length - 1];
    if (last && last.dateKey === dateKey) {
      last.messages.push(msg);
    } else {
      groups.push({ dateKey, label: formatDateLabel(msg.createdAt), messages: [msg] });
    }
  });
  return groups;
};

// ── MessageList ───────────────────────────────────────────────────────────────
const MessageList = () => {
  const { messages, isLoadingMsgs, selectedUser } = useChat();
  const { user } = useAuth();
  const bottomRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groups = groupByDate(messages);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* ── Scrollable messages area ── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 relative"
        id="message-scroll-area"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, var(--glow) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--glow) 0%, transparent 50%)
          `,
        }}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(var(--primary) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10">
          {isLoadingMsgs ? (
            <MessageSkeleton count={8} />
          ) : messages.length === 0 ? (
            <EmptyMessagesState partnerName={selectedUser?.fullName} />
          ) : (
            groups.map((group) => (
              <div key={group.dateKey}>
                <DateSeparator label={group.label} />
                {group.messages.map((msg, i) => (
                  <MessageBubble
                    key={msg._id || msg.id || i}
                    message={msg}
                    index={i}
                    senderUser={
                      msg.senderId !== user?._id ? selectedUser : null
                    }
                  />
                ))}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Fixed bottom input ── */}
      <MessageInput />
    </div>
  );
};

// ── EmptyMessagesState ────────────────────────────────────────────────────────
const EmptyMessagesState = ({ partnerName }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center h-full min-h-[300px] gap-3 text-center py-16"
  >
    <div
      className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-md"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
      }}
    >
      👋
    </div>
    <div>
      <p className="font-semibold text-base" style={{ color: "var(--text)" }}>
        Say hello to {partnerName || "them"}!
      </p>
      <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
        This is the beginning of your conversation.
      </p>
    </div>
  </motion.div>
);

export default MessageList;
