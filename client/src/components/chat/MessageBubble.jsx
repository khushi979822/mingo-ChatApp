/**
 * MessageBubble.jsx — A single chat message.
 * - Outgoing (isMe=true): right-aligned, primary gradient
 * - Incoming (isMe=false): left-aligned, surface background
 * Uses real message.createdAt and message.status from the DB.
 */

import React from "react";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";

// ── Helpers ───────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || "")
    .join("");

const AVATAR_COLORS = [
  "#25D366","#128C7E","#075E54","#2563EB","#7C3AED",
  "#DB2777","#EA580C","#CA8A04","#16A34A","#0891B2",
];

const getAvatarColor = (id = "") => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ── Tick Icons ────────────────────────────────────────────────────────────────
const SingleTick = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M1 6L5 10L11 2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DoubleTick = ({ read }) => (
  <svg width="15" height="10" viewBox="0 0 18 12" fill="none">
    <path d="M1 6L5 10L13 2" stroke={read ? "rgba(100,220,255,0.9)" : "rgba(255,255,255,0.6)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 6L9 10L17 2" stroke={read ? "rgba(100,220,255,0.9)" : "rgba(255,255,255,0.6)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── MessageBubble ─────────────────────────────────────────────────────────────
const MessageBubble = ({ message, index, senderUser }) => {
  const { user } = useAuth();
  const isMe = message.senderId === user?._id || message.senderId?._id === user?._id;
  const status = message.status || "sent";
  const time = formatTime(message.createdAt);
  const text = message.message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.02, 0.3), ease: "easeOut" }}
      className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1 items-end gap-2`}
    >
      {/* Sender avatar (incoming only) */}
      {!isMe && senderUser && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold select-none mb-0.5"
          style={{
            background: `linear-gradient(135deg, ${getAvatarColor(senderUser._id)} 0%, ${getAvatarColor(senderUser._id)}99 100%)`,
          }}
        >
          {senderUser.profilePicture ? (
            <img src={senderUser.profilePicture} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(senderUser.fullName)
          )}
        </div>
      )}
      {!isMe && !senderUser && <div className="w-7 flex-shrink-0" />}

      {/* Bubble */}
      <div
        className={`
          relative max-w-[72%] px-4 py-2.5 shadow-sm
          ${isMe ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"}
        `}
        style={{
          background: isMe
            ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)"
            : "var(--surface)",
          color: isMe ? "#ffffff" : "var(--text)",
          boxShadow: "var(--card-shadow)",
          border: isMe ? "none" : "1px solid var(--border)",
        }}
      >
        {/* Message text */}
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{text}</p>

        {/* Time + status */}
        <div className="flex items-center gap-1 mt-1 justify-end">
          <span
            className="text-[10px] leading-none"
            style={{ color: isMe ? "rgba(255,255,255,0.65)" : "var(--text-muted)" }}
          >
            {time}
          </span>

          {isMe && (
            <span style={{ lineHeight: 1 }}>
              {status === "read" ? (
                <DoubleTick read={true} />
              ) : status === "delivered" ? (
                <DoubleTick read={false} />
              ) : (
                <SingleTick />
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
