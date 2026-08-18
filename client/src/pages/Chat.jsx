import React from "react";
import ChatLayout from "../components/chat/ChatLayout";

/**
 * ChatPage — the main chat page. Wraps ChatLayout.
 * Themed via CSS variables from ThemeContext.
 */
const ChatPage = () => {
  return (
    <div
      className="theme-transition"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <ChatLayout />
    </div>
  );
};

export default ChatPage;
