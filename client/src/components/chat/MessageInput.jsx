/**
 * MessageInput.jsx — Premium message composer.
 * Connected to ChatContext.sendMessage + emitTyping.
 * Enter = send, Shift+Enter = new line.
 * Auto-resizing textarea, emoji picker, typing socket events.
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSmile, FiPaperclip, FiSend, FiMic } from "react-icons/fi";
import { useChat } from "../../context/ChatContext";

const EMOJIS = [
  "😊","😂","🥰","😍","🤣","😭","😅","🙏","🔥","💯",
  "👍","❤️","🎉","✅","👀","😎","🤔","😢","😱","🥳",
  "🚀","✨","🌟","💪","🎊","🤝","👏","😴","🤗","😋",
  "🫡","🤙","🙌","😤","🫶","💙","💚","🧡","💜","🖤",
  "🐶","🐱","🦊","🐻","🎸","🎮","🍕","🌮","☕","🧋",
];

const MessageInput = () => {
  const { sendMessage, emitTyping, emitStopTyping } = useChat();
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [sending, setSending] = useState(false);
  const textareaRef = useRef(null);
  const emojiRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120,
      )}px`;
    }
  }, [text]);

  // Close emoji picker on outside click
  useEffect(() => {
    const handler = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    emitStopTyping();
    await sendMessage(trimmed);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setSending(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.target.value.trim()) {
      emitTyping();
    } else {
      emitStopTyping();
    }
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    textareaRef.current?.focus();
    setShowEmoji(false);
  };

  return (
    <div
      className="relative px-4 py-3 theme-transition flex-shrink-0"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div
            ref={emojiRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-full left-4 mb-2 p-3 rounded-2xl shadow-xl grid grid-cols-10 gap-1 z-50"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--card-shadow)",
              width: "290px",
            }}
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="flex items-center justify-center w-7 h-7 rounded-lg hover:scale-125 transition-transform duration-150 cursor-pointer"
                style={{ fontSize: "17px" }}
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Row */}
      <div
        className="flex items-end gap-2 rounded-2xl px-3 py-2 transition-all duration-200"
        style={{
          background: "var(--surface-alt)",
          border: "1.5px solid var(--border)",
        }}
        onFocus={() => {}}
      >
        {/* Emoji button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEmoji((v) => !v)}
          className="flex-shrink-0 p-1.5 rounded-full transition-colors duration-150 cursor-pointer"
          style={{ color: showEmoji ? "var(--primary)" : "var(--text-muted)" }}
          title="Emoji"
          id="emoji-picker-btn"
        >
          <FiSmile size={20} />
        </motion.button>

        {/* Attachment button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 p-1.5 rounded-full transition-colors duration-150 cursor-pointer"
          style={{ color: "var(--text-muted)" }}
          title="Attach file"
          id="attach-file-btn"
        >
          <FiPaperclip size={19} />
        </motion.button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          rows={1}
          id="message-input"
          className="flex-1 bg-transparent outline-none resize-none text-sm leading-5 py-1 max-h-[120px] overflow-y-auto"
          style={{ color: "var(--text)", fontFamily: "inherit" }}
        />

        {/* Send / Mic toggle */}
        <AnimatePresence mode="wait" initial={false}>
          {text.trim() ? (
            <motion.button
              key="send"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              whileHover={{ scale: 1.1, boxShadow: "0 4px 16px var(--glow)" }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSend}
              disabled={sending}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                color: "#ffffff",
                opacity: sending ? 0.7 : 1,
              }}
              title="Send message"
              id="send-message-btn"
            >
              <FiSend size={16} />
            </motion.button>
          ) : (
            <motion.button
              key="mic"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0 p-1.5 rounded-full cursor-pointer"
              style={{ color: "var(--text-muted)" }}
              title="Voice message"
              id="voice-message-btn"
            >
              <FiMic size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Hint */}
      <p
        className="text-[10px] text-center mt-1.5 select-none"
        style={{ color: "var(--text-muted)", opacity: 0.5 }}
      >
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
};

export default MessageInput;
