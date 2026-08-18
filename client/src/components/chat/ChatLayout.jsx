import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMessageCircle, FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import { CHATS, MESSAGES, CURRENT_USER } from "../../assets/chatDummy";

/**
 * ChatLayout — the main WhatsApp-style two-panel layout.
 *
 * Desktop (md+): Sidebar (320px) always visible + full chat window
 * Tablet/Mobile: Sidebar as slide-over drawer, back button in header
 *
 * All local state only — no backend, no API.
 */
const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState("airi");
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Local messages state per chat (for adding new messages)
  const [messagesMap, setMessagesMap] = useState({ ...MESSAGES });

  const selectedChat = CHATS.find((c) => c.id === selectedChatId);
  const messages = messagesMap[selectedChatId] || [];

  const handleSend = (text) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const newMsg = {
      id: Date.now(),
      isMe: true,
      text,
      time,
      status: "sent",
    };
    setMessagesMap((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMsg],
    }));
  };

  return (
    <div
      className="flex relative overflow-hidden theme-transition"
      style={{
        height: "calc(100vh - 52px)", // subtract SiteHeader height
        background: "var(--bg)",
      }}
    >
      {/* ── Mobile Drawer Overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.45)" }}
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[300px] md:hidden shadow-2xl"
            >
              <Sidebar
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                onClose={() => setDrawerOpen(false)}
                isMobileDrawer={true}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop Sidebar (hidden on mobile) ── */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="hidden md:flex flex-col flex-shrink-0 shadow-sm"
        style={{ width: "320px" }}
      >
        <Sidebar
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          isMobileDrawer={false}
        />
      </motion.div>

      {/* ── Chat Window ── */}
      <motion.div
        key={selectedChatId}
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
          <span
            className="font-bold text-base"
            style={{ color: "var(--text)" }}
          >
            Mingo
          </span>
        </div>

        {selectedChat ? (
          <>
            {/* Chat header */}
            <ChatHeader
              chat={selectedChat}
              onBack={() => setDrawerOpen(true)}
            />

            {/* Messages + input */}
            <MessageList
              messages={messages}
              onSend={handleSend}
            />
          </>
        ) : (
          // Empty state (shouldn't happen since default is "airi")
          <EmptyState onOpenSidebar={() => setDrawerOpen(true)} />
        )}
      </motion.div>
    </div>
  );
};

// ── EmptyState ────────────────────────────────────────────────────────────────

const EmptyState = ({ onOpenSidebar }) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
      }}
    >
      <FiMessageCircle size={36} color="white" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text)" }}
      >
        Select a conversation
      </h3>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Choose a chat from the sidebar to start messaging
      </p>
    </motion.div>
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onOpenSidebar}
      className="md:hidden mt-2 px-6 py-2.5 rounded-2xl text-white font-semibold text-sm"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
      }}
    >
      Open Chats
    </motion.button>
  </div>
);

export default ChatLayout;
