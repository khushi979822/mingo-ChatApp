import React from "react";
import { motion } from "motion/react";

/**
 * MessageBubble — renders a single chat message bubble.
 * - Outgoing (isMe=true): right-aligned, primary gradient background
 * - Incoming (isMe=false): left-aligned, surface background
 * All colors via CSS variables — automatically theme-aware.
 */
const MessageBubble = ({ message, index }) => {
  const { isMe, text, time, status } = message;

  const checkIcon = (filled) => (
    <svg width="14" height="10" viewBox="0 0 16 11" fill="none" style={{ display: "inline" }}>
      <path
        d="M1 5.5L5.5 10L15 1"
        stroke={filled ? "var(--primary)" : "currentColor"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={filled ? 1 : 0.5}
      />
      {status === "read" && (
        <path
          d="M5 5.5L9.5 10L19 1"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-4, 0)"
        />
      )}
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, delay: index * 0.03, ease: "easeOut" }}
      className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
    >
      <div
        className={`
          relative max-w-[72%] px-4 py-2.5 shadow-sm
          ${isMe
            ? "rounded-2xl rounded-tr-sm text-white"
            : "rounded-2xl rounded-tl-sm"
          }
        `}
        style={{
          background: isMe
            ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)"
            : "var(--surface)",
          color: isMe ? "#ffffff" : "var(--text)",
          boxShadow: "var(--card-shadow)",
          // Subtle border on incoming for separation
          border: isMe ? "none" : "1px solid var(--border)",
        }}
      >
        {/* Message text */}
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
          {text}
        </p>

        {/* Time + status row */}
        <div
          className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : "justify-end"}`}
        >
          <span
            className="text-[10px] leading-none"
            style={{
              color: isMe ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
            }}
          >
            {time}
          </span>

          {/* Double check marks for outgoing messages */}
          {isMe && (
            <span style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1 }}>
              {status === "read" ? (
                // Blue double checks for read
                <svg width="15" height="10" viewBox="0 0 18 12" fill="none">
                  <path d="M1 6L5 10L13 2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 6L9 10L17 2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : status === "delivered" ? (
                // Gray double checks for delivered
                <svg width="15" height="10" viewBox="0 0 18 12" fill="none">
                  <path d="M1 6L5 10L13 2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 6L9 10L17 2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                // Single check for sent
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6L5 10L11 2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
