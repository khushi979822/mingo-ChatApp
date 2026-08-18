import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch, FiEdit, FiX } from "react-icons/fi";
import { CHATS } from "../../assets/chatDummy";

/**
 * Sidebar — left panel showing search bar + chat list.
 * On mobile this is rendered inside a slide-over drawer (controlled by parent).
 */
const Sidebar = ({ selectedChatId, onSelectChat, onClose, isMobileDrawer }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = CHATS.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="flex flex-col h-full theme-transition"
      style={{
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 pt-4 pb-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          {/* Mingo logo mark */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
            }}
          >
            M
          </div>
          <h1
            className="font-bold text-base leading-tight"
            style={{ color: "var(--text)" }}
          >
            Chats
          </h1>
        </div>

        <div className="flex items-center gap-1">
          {/* New chat / compose */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-full transition-colors duration-150 cursor-pointer"
            style={{ color: "var(--text-muted)" }}
            title="New chat"
            id="new-chat-btn"
          >
            <FiEdit size={17} />
          </motion.button>

          {/* Close button — only shown in mobile drawer */}
          {isMobileDrawer && (
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              className="p-2 rounded-full transition-colors duration-150 cursor-pointer"
              style={{ color: "var(--text-muted)" }}
              id="close-sidebar-btn"
            >
              <FiX size={18} />
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="px-3 py-3 flex-shrink-0">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
          style={{
            background: "var(--surface-alt)",
            border: "1px solid var(--border)",
          }}
        >
          <FiSearch size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search chats…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              color: "var(--text)",
              fontFamily: "inherit",
            }}
            id="sidebar-search"
          />
          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchQuery("")}
              style={{ color: "var(--text-muted)" }}
            >
              <FiX size={14} />
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Chat List ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Section label */}
        <p
          className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest select-none"
          style={{ color: "var(--text-muted)" }}
        >
          Recent
        </p>

        <AnimatePresence>
          {filteredChats.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 gap-2"
            >
              <FiSearch size={28} style={{ color: "var(--text-muted)", opacity: 0.4 }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                No chats found
              </p>
            </motion.div>
          ) : (
            filteredChats.map((chat, i) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                index={i}
                isActive={chat.id === selectedChatId}
                onClick={() => {
                  onSelectChat(chat.id);
                  if (isMobileDrawer) onClose?.();
                }}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer branding ── */}
      <div
        className="px-4 py-3 flex-shrink-0 text-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
          Mingo ChatApp · End-to-end encrypted
        </p>
      </div>
    </div>
  );
};

// ── ChatItem ─────────────────────────────────────────────────────────────────

const ChatItem = ({ chat, index, isActive, onClick }) => (
  <motion.button
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, delay: index * 0.04 }}
    whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
    whileTap={{ scale: 0.985 }}
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 cursor-pointer relative"
    style={{
      background: isActive
        ? "linear-gradient(90deg, var(--badge-bg) 0%, transparent 100%)"
        : "transparent",
      borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
    }}
    onMouseEnter={(e) => {
      if (!isActive) e.currentTarget.style.background = "var(--hover-bg)";
    }}
    onMouseLeave={(e) => {
      if (!isActive)
        e.currentTarget.style.background = "transparent";
    }}
    id={`chat-item-${chat.id}`}
  >
    {/* Avatar with online indicator */}
    <div className="relative flex-shrink-0">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm select-none"
        style={{ background: chat.avatarColor || "var(--primary)" }}
      >
        {chat.avatar}
      </div>
      {chat.online && (
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
          style={{
            background: "var(--primary)",
            borderColor: "var(--surface)",
          }}
        />
      )}
    </div>

    {/* Name + Last message */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-1">
        <span
          className="font-semibold text-sm truncate leading-tight"
          style={{ color: "var(--text)" }}
        >
          {chat.name}
        </span>
        <span
          className="text-[10px] flex-shrink-0 ml-1"
          style={{
            color: chat.unread > 0 ? "var(--primary)" : "var(--text-muted)",
            fontWeight: chat.unread > 0 ? "600" : "400",
          }}
        >
          {chat.time}
        </span>
      </div>
      <div className="flex items-center justify-between gap-1 mt-0.5">
        <span
          className="text-xs truncate leading-tight flex-1"
          style={{
            color: "var(--text-muted)",
            fontWeight: chat.unread > 0 ? "500" : "400",
          }}
        >
          {chat.lastMsg}
        </span>
        {chat.unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ml-1"
            style={{
              background: "var(--primary)",
              minWidth: chat.unread > 9 ? "auto" : "1.25rem",
              padding: chat.unread > 9 ? "0 4px" : 0,
            }}
          >
            {chat.unread > 99 ? "99+" : chat.unread}
          </motion.span>
        )}
      </div>
    </div>
  </motion.button>
);

export default Sidebar;
