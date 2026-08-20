import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import {
  FiMessageCircle,
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiChevronDown,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

// ── Profile Dropdown ───────────────────────────────────────────────────────────
function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div ref={ref} className="relative">
      <motion.button
        id="profile-dropdown-btn"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-sm cursor-pointer select-none"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            background: "var(--primary)",
            color: "#fff",
          }}
        >
          {initials}
        </div>
        <span className="hidden sm:inline max-w-[120px] truncate">
          {user?.fullName}
        </span>
        <FiChevronDown
          size={13}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl shadow-xl overflow-hidden z-50 theme-transition"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            {/* User info header */}
            <div
              className="px-4 py-3 border-b theme-transition"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  {initials}
                </div>
                <div className="overflow-hidden">
                  <p
                    className="font-semibold text-sm truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {user?.fullName}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Dropdown actions */}
            <div className="p-1.5">
              <button
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                style={{ color: "var(--text)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--hover-bg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                onClick={() => setOpen(false)}
              >
                <FiUser size={15} style={{ color: "var(--text-muted)" }} />
                Profile
              </button>

              <button
                id="logout-btn"
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                style={{ color: "#EF4444" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(239,68,68,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
              >
                <FiLogOut size={15} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── SiteHeader ────────────────────────────────────────────────────────────────
const SiteHeader = () => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isChat = location.pathname === "/chat";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className="px-4 py-2 flex items-center justify-between theme-transition sticky top-0 z-40"
      style={{ background: "var(--primary-dark)" }}
    >
      {/* ── Left: Brand ── */}
      <Link
        to="/"
        className="text-xl font-bold text-white whitespace-nowrap select-none hover:opacity-90 transition-opacity"
      >
        Mingo ChatApp
      </Link>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2 sm:gap-3">

        {isAuthenticated ? (
          <>
            {/* Open Chat / Go Home button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => navigate(isChat ? "/" : "/chat")}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-white shadow-md cursor-pointer select-none whitespace-nowrap"
              style={{
                background: "var(--primary)",
                boxShadow: "0 4px 14px var(--glow)",
              }}
              id="open-chat-btn"
            >
              {isChat ? (
                <>
                  <FiHome size={14} />
                  <span className="hidden sm:inline">Home</span>
                </>
              ) : (
                <>
                  <FiMessageCircle size={14} />
                  <span className="hidden sm:inline">Open Chat</span>
                </>
              )}
            </motion.button>

            {/* Theme dropdown */}
            <select
              name="theme"
              id="theme-select"
              className="select select-bordered w-fit text-sm"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="black">Black</option>
              <option value="spotify">Spotify</option>
              <option value="claude">Claude</option>
              <option value="corporate">Corporate</option>
              <option value="ghibli">Ghibli</option>
              <option value="halloween">Halloween</option>
            </select>

            {/* Profile dropdown */}
            <ProfileDropdown user={user} onLogout={handleLogout} />
          </>
        ) : (
          <>
            {/* Theme dropdown (always visible) */}
            <select
              name="theme"
              id="theme-select"
              className="select select-bordered w-fit text-sm"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="black">Black</option>
              <option value="spotify">Spotify</option>
              <option value="claude">Claude</option>
              <option value="corporate">Corporate</option>
              <option value="ghibli">Ghibli</option>
              <option value="halloween">Halloween</option>
            </select>

            {/* Login */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/login"
                id="login-link"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm text-white transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <FiLogIn size={14} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </motion.div>

            {/* Register */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/register"
                id="register-link"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm text-white shadow-md cursor-pointer whitespace-nowrap"
                style={{
                  background: "var(--primary)",
                  boxShadow: "0 4px 14px var(--glow)",
                }}
              >
                <FiUserPlus size={14} />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default SiteHeader;
