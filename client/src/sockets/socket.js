/**
 * socket.js — Socket.IO client singleton.
 *
 * Call connectSocket(userId) after login.
 * Call disconnectSocket() on logout.
 * Import { socket } anywhere you need to emit / listen.
 */

import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:4500";

let socket = null;

export const connectSocket = (userId) => {
  if (socket?.connected) return; // already connected

  socket = io(SOCKET_URL, {
    query: { userId },
    withCredentials: true,
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket.id);
    // Join personal room for targeted delivery
    socket.emit("joinRoom", userId);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected");
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export { socket };
