/**
 * api.js — Centralised Axios instance + all API call functions.
 * Uses withCredentials so the HTTP-only JWT cookie is sent on every request.
 * Vite proxy routes /api → http://localhost:4500 in dev.
 */

import axios from "axios";

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Auth API ──────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
};

// ── User API ──────────────────────────────────────────────────────────────────
export const userAPI = {
  getAllUsers: () => api.get("/user/allUsers"),
  searchUsers: (q) => api.get(`/user/search?q=${encodeURIComponent(q)}`),
  updateProfile: (data) => api.put("/user/profile", data),
};

// ── Message API ───────────────────────────────────────────────────────────────
export const messageAPI = {
  send: (receiverId, message) =>
    api.post("/user/send-message", { receiverID: receiverId, message }),
  getMessages: (friendId) => api.get(`/user/get-messages/${friendId}`),
};

export default api;
