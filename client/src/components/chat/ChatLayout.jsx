/**
 * ChatLayout.jsx — Main two-panel layout.
 * Fully connected to ChatContext — zero hardcoded data.
 *
 * Desktop: Sidebar (320px fixed) + Chat window
 * Mobile: Drawer sidebar + full-screen chat
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMessageCircle, FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import { useChat } from "../../context/ChatContext";

const ChatLayout = () => {
  const { selectedUser, setSelectedUser } = useChat();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div
      className="flex relative overflow-hidden theme-transition"
      style={{
        height: "calc(100vh - 52px)",
        background: "var(--bg)",
      }}
    >
      {/* ── Mobile Drawer Overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.45)" }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[300px] md:hidden shadow-2xl"
            >
              <Sidebar
                selectedUserId={selectedUser?._id}
                onSelectUser={(u) => {
                  setSelectedUser(u);
                  setDrawerOpen(false);
                }}
                onClose={() => setDrawerOpen(false)}
                isMobileDrawer={true}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop Sidebar ── */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="hidden md:flex flex-col flex-shrink-0 shadow-sm"
        style={{ width: "320px" }}
      >
        <Sidebar
          selectedUserId={selectedUser?._id}
          onSelectUser={setSelectedUser}
          isMobileDrawer={false}
        />
      </motion.div>

      {/* ── Chat Window ── */}
      <motion.div
        key={selectedUser?._id || "empty"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col flex-1 min-w-0"
        style={{ background: "var(--bg)" }}
      >
        {/* Mobile top bar with hamburger */}
        <div
          className="flex md:hidden items-center gap-2 px-3 py-2 flex-shrink-0"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 rounded-xl cursor-pointer"
            style={{ color: "var(--text-muted)" }}
            id="open-sidebar-btn"
          >
            <FiMenu size={20} />
          </motion.button>
          <span className="font-bold text-base" style={{ color: "var(--text)" }}>
            Mingo
          </span>
        </div>

        {selectedUser ? (
          <>
            <ChatHeader onBack={() => setDrawerOpen(true)} />
            <MessageList />
          </>
        ) : (
          <EmptyState onOpenSidebar={() => setDrawerOpen(true)} />
        )}
      </motion.div>
    </div>
  );
};

// ── EmptyState ────────────────────────────────────────────────────────────────
const EmptyState = ({ onOpenSidebar }) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
        boxShadow: "0 12px 40px var(--glow)",
      }}
    >
      <FiMessageCircle size={42} color="white" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
        Welcome to Mingo
      </h3>
      <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
        Select a conversation from the sidebar or search for someone to start a secure chat.
      </p>
    </motion.div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 24px var(--glow)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onOpenSidebar}
      className="md:hidden mt-1 px-7 py-3 rounded-2xl text-white font-semibold text-sm shadow-lg"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
      }}
      id="start-chat-btn"
    >
      Start New Chat
    </motion.button>
  </div>
);

export default ChatLayout;
