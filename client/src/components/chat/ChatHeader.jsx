import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiArrowLeft,
  FiVideo,
  FiPhone,
  FiMoreVertical,
  FiSearch,
  FiUser,
  FiBell,
  FiTrash2,
} from "react-icons/fi";

/**
 * ChatHeader — top bar inside the active chat window.
 * Shows avatar, name, online/last-seen, and action icons.
 * Back button shown only on mobile (md:hidden).
 */
const ChatHeader = ({ chat, onBack }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!chat) return null;

  const menuItems = [
    { icon: <FiSearch size={15} />, label: "Search messages" },
    { icon: <FiUser size={15} />, label: "View profile" },
    { icon: <FiBell size={15} />, label: "Mute notifications" },
    { icon: <FiTrash2 size={15} />, label: "Clear chat", danger: true },
  ];

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 flex-shrink-0 theme-transition relative z-20"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Back button — mobile only */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="md:hidden flex-shrink-0 p-1.5 rounded-full mr-0.5 cursor-pointer transition-colors duration-150"
        style={{ color: "var(--primary)" }}
        id="chat-back-btn"
      >
        <FiArrowLeft size={22} />
      </motion.button>

      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        className="relative flex-shrink-0 cursor-pointer"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md select-none"
          style={{ background: chat.avatarColor || "var(--primary)" }}
        >
          {chat.avatar}
        </div>
        {/* Online indicator */}
        {chat.online && (
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
            style={{
              background: "var(--primary)",
              borderColor: "var(--surface)",
            }}
          />
        )}
      </motion.div>

      {/* Name + Status */}
      <div className="flex-1 min-w-0">
        <h2
          className="font-semibold text-sm leading-tight truncate"
          style={{ color: "var(--text)" }}
        >
          {chat.name}
          {chat.isGroup && (
            <span
              className="ml-2 text-[10px] font-normal px-1.5 py-0.5 rounded-full"
              style={{
                background: "var(--badge-bg)",
                color: "var(--badge-text)",
              }}
            >
              Group
            </span>
          )}
        </h2>
        <p
          className="text-xs truncate leading-tight mt-0.5"
          style={{ color: chat.online ? "var(--primary)" : "var(--text-muted)" }}
        >
          {chat.online ? "● online" : chat.lastSeen}
          {chat.isGroup && ` · ${chat.memberCount} members`}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        {/* Video call */}
        <motion.button
          whileHover={{ scale: 1.15, color: "var(--primary)" }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full transition-colors duration-150 cursor-pointer hidden sm:flex items-center justify-center"
          style={{ color: "var(--text-muted)" }}
          title="Video call"
          id="video-call-btn"
        >
          <FiVideo size={19} />
        </motion.button>

        {/* Voice call */}
        <motion.button
          whileHover={{ scale: 1.15, color: "var(--primary)" }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full transition-colors duration-150 cursor-pointer hidden sm:flex items-center justify-center"
          style={{ color: "var(--text-muted)" }}
          title="Voice call"
          id="voice-call-btn"
        >
          <FiPhone size={19} />
        </motion.button>

        {/* More menu */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-full transition-colors duration-150 cursor-pointer flex items-center justify-center"
            style={{ color: menuOpen ? "var(--primary)" : "var(--text-muted)" }}
            title="More options"
            id="more-options-btn"
          >
            <FiMoreVertical size={19} />
          </motion.button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Overlay to close */}
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-1 w-48 rounded-2xl shadow-xl overflow-hidden z-40"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  {menuItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors duration-150 cursor-pointer"
                      style={{
                        color: item.danger ? "#EF4444" : "var(--text)",
                        borderBottom: i < menuItems.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--hover-bg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span style={{ color: item.danger ? "#EF4444" : "var(--text-muted)" }}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
