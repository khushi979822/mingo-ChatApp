import React from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "motion/react";
import { FiMessageCircle, FiHome } from "react-icons/fi";

const SiteHeader = ({ page, setPage }) => {
  const { theme, setTheme } = useTheme();
  const isChat = page === "chat";

  return (
    <>
      <div
        className="px-3 py-2 flex items-center justify-between theme-transition gap-3"
        style={{ background: "var(--primary-dark)" }}
      >
        {/* Brand */}
        <h1
          className="text-xl font-bold text-white whitespace-nowrap select-none"
          onClick={() => setPage?.("home")}
          style={{ cursor: "pointer" }}
        >
          Mingo ChatApp
        </h1>

        {/* Center nav */}
        <div className="flex items-center gap-1">
          {/* Home / Chat toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage?.(isChat ? "home" : "chat")}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={{
              background: isChat
                ? "rgba(255,255,255,0.15)"
                : "rgba(255,255,255,0.12)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
            id="nav-chat-toggle-btn"
          >
            {isChat ? (
              <>
                <FiHome size={15} />
                <span className="hidden sm:inline">Home</span>
              </>
            ) : (
              <>
                <FiMessageCircle size={15} />
                <span className="hidden sm:inline">Open Chat</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Theme selector */}
        <select
          name="theme"
          id="theme"
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
      </div>
    </>
  );
};

export default SiteHeader;
