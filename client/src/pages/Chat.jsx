import React from "react";
import ChatLayout from "../components/chat/ChatLayout";

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
