import React from "react";
import ChatLayout from "../components/chat/ChatLayout";

/**
 * Chat page — full-screen chat application.
 * No site header (ChatLayout owns its own layout).
 * ChatProvider is injected by App.jsx around this route.
 */
const Chat = () => {
  return <ChatLayout />;
};

export default Chat;
