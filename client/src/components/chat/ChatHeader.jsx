/**
 * ChatHeader.jsx — Top bar inside the active chat window.
 * Shows real user avatar, name, live online/offline status,
 * animated typing indicator, and action buttons.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiArrowLeft,
  FiVideo,
  FiPhone,
  FiMoreVertical,
  FiUser,
  FiBell,
  FiTrash2,
} from "react-icons/fi";
import { useChat } from "../../context/ChatContext";
import ProfileDrawer from "./ProfileDrawer";

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

const formatLastSeen = (dateStr) => {
  if (!dateStr) return "last seen recently";
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return "last seen just now";
  if (diff < 3600000) return `last seen ${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `last seen ${Math.floor(diff / 3600000)}h ago`;
  return `last seen ${d.toLocaleDateString([], { day: "numeric", month: "short" })}`;
};

// ── TypingDots ────────────────────────────────────────────────────────────────
const TypingDots = () => (
  <span className="flex items-center gap-0.5 ml-1">
    <span className="typing-dot" />
    <span className="typing-dot" />
    <span className="typing-dot" />
  </span>
);

// ── Main Component ────────────────────────────────────────────────────────────
const ChatHeader = ({ onBack }) => {
  const { selectedUser, onlineUsers, typingUsers } = useChat();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!selectedUser) return null;

  const isOnline = onlineUsers.has(selectedUser._id);
  const isTyping = typingUsers.has(selectedUser._id);
  const initials = getInitials(selectedUser.fullName);
  const avatarColor = getAvatarColor(selectedUser._id);

  const menuItems = [
    {
      icon: <FiUser size={15} />,
      label: "View profile",
      action: () => { setMenuOpen(false); setProfileOpen(true); },
    },
    {
      icon: <FiBell size={15} />,
      label: "Mute notifications",
      action: () => setMenuOpen(false),
    },
    {
      icon: <FiTrash2 size={15} />,
      label: "Clear chat",
      danger: true,
      action: () => setMenuOpen(false),
    },
  ];

  return (
    <>
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
          className="md:hidden flex-shrink-0 p-1.5 rounded-full mr-0.5 cursor-pointer"
          style={{ color: "var(--primary)" }}
          id="chat-back-btn"
        >
          <FiArrowLeft size={22} />
        </motion.button>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="relative flex-shrink-0 cursor-pointer"
          onClick={() => setProfileOpen(true)}
        >
          {selectedUser.profilePicture ? (
            <img
              src={selectedUser.profilePicture}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md select-none"
              style={{
                background: `linear-gradient(135deg, ${avatarColor} 0%, ${avatarColor}99 100%)`,
              }}
            >
              {initials}
            </div>
          )}
          {isOnline && (
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
              style={{ background: "#25D366", borderColor: "var(--surface)" }}
            />
          )}
        </motion.div>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <h2
            className="font-semibold text-sm leading-tight truncate"
            style={{ color: "var(--text)" }}
          >
            {selectedUser.fullName}
          </h2>

          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.p
                key="typing"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs flex items-center"
                style={{ color: "var(--primary)" }}
              >
                typing
                <TypingDots />
              </motion.p>
            ) : (
              <motion.p
                key="status"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs truncate"
                style={{ color: isOnline ? "var(--primary)" : "var(--text-muted)" }}
              >
                {isOnline ? "● online" : formatLastSeen(selectedUser.lastSeen)}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full transition-colors duration-150 cursor-pointer hidden sm:flex items-center justify-center"
            style={{ color: "var(--text-muted)" }}
            title="Video call"
            id="video-call-btn"
          >
            <FiVideo size={19} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
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

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
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
                        onClick={item.action}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors duration-150 cursor-pointer"
                        style={{
                          color: item.danger ? "#EF4444" : "var(--text)",
                          borderBottom:
                            i < menuItems.length - 1
                              ? "1px solid var(--border)"
                              : "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--hover-bg)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span
                          style={{
                            color: item.danger ? "#EF4444" : "var(--text-muted)",
                          }}
                        >
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

      {/* Profile drawer for the selected conversation partner */}
      <ProfileDrawer
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        targetUser={selectedUser}
        isSelf={false}
      />
    </>
  );
};

export default ChatHeader;
