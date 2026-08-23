/**
 * socketHandler.js
 * Centralised Socket.IO event logic.
 * Keeps index.js clean and lets us unit-test socket logic separately.
 *
 * Online map: userId (string) → socketId
 * Allows broadcasting presence events to all connected clients.
 */

const onlineUsers = new Map(); // userId → socketId

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    // ── User comes online ────────────────────────────────────────────
    if (userId) {
      onlineUsers.set(userId, socket.id);
      // Broadcast updated online list to ALL clients
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }

    // ── Join personal room (for targeted delivery) ───────────────────
    socket.on("joinRoom", (uid) => {
      socket.join(uid);
    });

    // ── Real-time message relay ───────────────────────────────────────
    // The message is already saved via REST — socket just pushes it live
    socket.on("newMessage", ({ message, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }
    });

    // ── Typing indicators ────────────────────────────────────────────
    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { senderId });
      }
    });

    socket.on("stopTyping", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", { senderId });
      }
    });

    // ── Message read receipt ─────────────────────────────────────────
    socket.on("messageRead", ({ senderId, receiverId }) => {
      const senderSocketId = onlineUsers.get(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("messageRead", { receiverId });
      }
    });

    // ── Disconnect ───────────────────────────────────────────────────
    socket.on("disconnect", () => {
      if (userId) {
        onlineUsers.delete(userId);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      }
    });
  });
};

/** Returns the current online users map (for use in controllers) */
export const getOnlineUsers = () => onlineUsers;
