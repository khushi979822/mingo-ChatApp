/**
 * ChatContext.jsx — Global real-time chat state.
 *
 * Provides:
 *  - users          : all users from backend (for sidebar)
 *  - selectedUser   : currently open conversation partner
 *  - messages       : messages for the current conversation
 *  - onlineUsers    : Set<string> of user IDs currently online (socket)
 *  - typingUsers    : Set<string> of user IDs currently typing to us
 *  - isLoadingUsers : boolean while fetching user list
 *  - isLoadingMsgs  : boolean while fetching messages
 *  - sendMessage    : (text) → REST + socket emit
 *  - setSelectedUser: select a conversation partner
 *  - emitTyping     : () → tell server "I am typing"
 *  - emitStopTyping : () → tell server "I stopped typing"
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { userAPI, messageAPI } from "../services/api";
import { connectSocket, disconnectSocket, getSocket } from "../sockets/socket";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  // ── State ─────────────────────────────────────────────────────────────
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingMsgs, setIsLoadingMsgs] = useState(false);

  const typingTimeoutRef = useRef(null);

  // ── Connect/Disconnect socket based on auth ───────────────────────────
  useEffect(() => {
    if (isAuthenticated && user) {
      connectSocket(user._id);
      const sock = getSocket();
      if (!sock) return;

      // Online users list from server
      sock.on("onlineUsers", (ids) => {
        setOnlineUsers(new Set(ids));
      });

      // Incoming message
      sock.on("newMessage", (message) => {
        setMessages((prev) => {
          // Only add if it's from the currently open conversation
          if (
            selectedUser &&
            (message.senderId === selectedUser._id ||
              message.receiverId === selectedUser._id)
          ) {
            return [...prev, message];
          }
          return prev;
        });
      });

      // Typing events
      sock.on("typing", ({ senderId }) => {
        setTypingUsers((prev) => new Set([...prev, senderId]));
      });

      sock.on("stopTyping", ({ senderId }) => {
        setTypingUsers((prev) => {
          const next = new Set(prev);
          next.delete(senderId);
          return next;
        });
      });

      return () => {
        sock.off("onlineUsers");
        sock.off("newMessage");
        sock.off("typing");
        sock.off("stopTyping");
      };
    } else {
      disconnectSocket();
      setOnlineUsers(new Set());
      setTypingUsers(new Set());
    }
  }, [isAuthenticated, user]);

  // Need a ref to selectedUser to close over it in socket listener
  const selectedUserRef = useRef(selectedUser);
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  // Re-register newMessage listener whenever selectedUser changes
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const sock = getSocket();
    if (!sock) return;

    const handler = (message) => {
      const partner = selectedUserRef.current;
      if (
        partner &&
        (message.senderId === partner._id || message.receiverId === partner._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    sock.off("newMessage");
    sock.on("newMessage", handler);

    return () => {
      sock.off("newMessage", handler);
    };
  }, [isAuthenticated, user, selectedUser]);

  // ── Fetch all users once on mount ─────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) {
      setUsers([]);
      return;
    }
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const { data } = await userAPI.getAllUsers();
        if (data.success) setUsers(data.data);
      } catch {
        // Silent — toast handled elsewhere if needed
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [isAuthenticated]);

  // ── Fetch messages when selected user changes ─────────────────────────
  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }
    const fetchMessages = async () => {
      setIsLoadingMsgs(true);
      try {
        const { data } = await messageAPI.getMessages(selectedUser._id);
        if (data.success) setMessages(data.data);
      } catch {
        toast.error("Failed to load messages");
      } finally {
        setIsLoadingMsgs(false);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  // ── Send message ──────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text) => {
      if (!selectedUser || !text.trim()) return;

      try {
        const { data } = await messageAPI.send(selectedUser._id, text.trim());
        if (data.success) {
          const newMsg = data.data;
          setMessages((prev) => [...prev, newMsg]);

          // Relay via socket for instant delivery to receiver
          const sock = getSocket();
          if (sock) {
            sock.emit("newMessage", {
              message: newMsg,
              receiverId: selectedUser._id,
            });
          }
        }
      } catch {
        toast.error("Failed to send message");
      }
    },
    [selectedUser],
  );

  // ── Typing indicators ─────────────────────────────────────────────────
  const emitStopTyping = useCallback(() => {
    if (!selectedUser || !user) return;
    const sock = getSocket();
    if (sock) {
      sock.emit("stopTyping", {
        senderId: user._id,
        receiverId: selectedUser._id,
      });
    }
    clearTimeout(typingTimeoutRef.current);
  }, [selectedUser, user]);

  const emitTyping = useCallback(() => {
    if (!selectedUser || !user) return;
    const sock = getSocket();
    if (sock) {
      sock.emit("typing", { senderId: user._id, receiverId: selectedUser._id });
    }
    // Auto stop after 3s of no keystroke
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      const s = getSocket();
      if (s && selectedUser && user) {
        s.emit("stopTyping", { senderId: user._id, receiverId: selectedUser._id });
      }
    }, 3000);
  }, [selectedUser, user]);

  // ── Select user ───────────────────────────────────────────────────────
  const handleSelectUser = useCallback((u) => {
    setSelectedUser(u);
    setTypingUsers(new Set());
  }, []);

  return (
    <ChatContext.Provider
      value={{
        users,
        selectedUser,
        messages,
        onlineUsers,
        typingUsers,
        isLoadingUsers,
        isLoadingMsgs,
        sendMessage,
        setSelectedUser: handleSelectUser,
        emitTyping,
        emitStopTyping,
        setUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
