/**
 * Sidebar.jsx — Left panel: logged-in user profile, user search, chat list.
 * Fully connected to ChatContext — zero hardcoded data.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch, FiX, FiMessageCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { userAPI } from "../../services/api";
import { ChatListSkeleton } from "./SkeletonLoader";
import ProfileDrawer from "./ProfileDrawer";

// ── Helpers ───────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || "")
    .join("");

const AVATAR_COLORS = [
  "#25D366","#128C7E","#075E54","#2563EB","#7C3AED",
  "#DB2777","#EA580C","#CA8A04","#16A34A","#0891B2",
];

const getAvatarColor = (id = "") => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return d.toLocaleDateString([], { weekday: "short" });
  }
  return d.toLocaleDateString([], { day: "numeric", month: "short" });
};

// ── Main Sidebar ──────────────────────────────────────────────────────────────
const Sidebar = ({ selectedUserId, onSelectUser, onClose, isMobileDrawer }) => {
  const { user } = useAuth();
  const { users, onlineUsers, isLoadingUsers, messages } = useChat();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchTimerRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(async () => {
      try {
        const { data } = await userAPI.searchUsers(searchQuery);
        setSearchResults(data.data || []);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(searchTimerRef.current);
  }, [searchQuery]);

  // The list to display: search results or all users
  const displayList = searchQuery.trim() ? searchResults : users;

  const handleSelect = (u) => {
    onSelectUser(u);
    if (isMobileDrawer) onClose?.();
    setSearchQuery("");
  };

  return (
    <>
      <div
        className="flex flex-col h-full theme-transition"
        style={{
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* ── User strip at top ── */}
        <div
          className="flex items-center justify-between px-4 pt-4 pb-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Current user avatar + Mingo branding */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer min-w-0"
            id="my-profile-btn"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 select-none"
              style={{
                background: user
                  ? `linear-gradient(135deg, ${getAvatarColor(user._id)} 0%, ${getAvatarColor(user._id)}99 100%)`
                  : "var(--primary)",
              }}
            >
              {user ? getInitials(user.fullName) : "M"}
            </div>
            <div className="text-left min-w-0">
              <p
                className="font-bold text-sm leading-tight truncate"
                style={{ color: "var(--text)" }}
              >
                {user?.fullName || "Mingo"}
              </p>
              <p
                className="text-[10px] leading-tight"
                style={{ color: "var(--primary)" }}
              >
                ● Online
              </p>
            </div>
          </motion.button>

          {/* Close button on mobile */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {isMobileDrawer && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full cursor-pointer"
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
              placeholder="Search or start a new chat…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--text)", fontFamily: "inherit" }}
              id="sidebar-search"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchQuery("")}
                  style={{ color: "var(--text-muted)" }}
                >
                  <FiX size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Section label ── */}
        <p
          className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest select-none flex-shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          {searchQuery ? "Search results" : "All users"}
        </p>

        {/* ── User List ── */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingUsers && !searchQuery ? (
            <ChatListSkeleton count={6} />
          ) : isSearching ? (
            <ChatListSkeleton count={3} />
          ) : displayList.length === 0 ? (
            <EmptyState searchQuery={searchQuery} />
          ) : (
            <AnimatePresence>
              {displayList.map((u, i) => (
                <UserItem
                  key={u._id}
                  user={u}
                  index={i}
                  isActive={u._id === selectedUserId}
                  isOnline={onlineUsers.has(u._id)}
                  onClick={() => handleSelect(u)}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="px-4 py-3 flex-shrink-0 text-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
            Mingo · End-to-end encrypted
          </p>
        </div>
      </div>

      {/* Profile drawer for own profile */}
      <ProfileDrawer
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        targetUser={user}
        isSelf={true}
      />
    </>
  );
};

// ── UserItem ──────────────────────────────────────────────────────────────────
const UserItem = ({ user, index, isActive, isOnline, onClick }) => {
  const initials = getInitials(user.fullName);
  const avatarColor = getAvatarColor(user._id);

  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
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
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
      id={`user-item-${user._id}`}
    >
      {/* Avatar with online dot */}
      <div className="relative flex-shrink-0">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="w-11 h-11 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm select-none"
            style={{
              background: `linear-gradient(135deg, ${avatarColor} 0%, ${avatarColor}99 100%)`,
            }}
          >
            {initials}
          </div>
        )}
        {isOnline && (
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
            style={{ background: "#25D366", borderColor: "var(--surface)" }}
          />
        )}
      </div>

      {/* Name + status */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span
            className="font-semibold text-sm truncate leading-tight"
            style={{ color: "var(--text)" }}
          >
            {user.fullName}
          </span>
          {isOnline && (
            <span
              className="text-[10px] flex-shrink-0 font-semibold"
              style={{ color: "var(--primary)" }}
            >
              online
            </span>
          )}
        </div>
        <span
          className="text-xs truncate leading-tight block mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          {user.username ? `@${user.username}` : user.email}
        </span>
      </div>
    </motion.button>
  );
};

// ── EmptyState ────────────────────────────────────────────────────────────────
const EmptyState = ({ searchQuery }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-16 gap-3 px-6 text-center"
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center"
      style={{ background: "var(--badge-bg)" }}
    >
      <FiMessageCircle size={24} style={{ color: "var(--primary)" }} />
    </div>
    <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>
      {searchQuery ? "No users found" : "No conversations yet"}
    </p>
    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
      {searchQuery
        ? "Try a different name or username"
        : "Search above to find someone and start chatting!"}
    </p>
  </motion.div>
);

export default Sidebar;
