/**
 * ProfileDrawer.jsx — Slide-in right drawer showing the selected user's profile.
 * Opens when the user clicks the avatar/name in ChatHeader.
 * Also shows the logged-in user's own profile when opened from sidebar.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiX,
  FiEdit2,
  FiMail,
  FiUser,
  FiPhone,
  FiCheck,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { userAPI } from "../../services/api";
import toast from "react-hot-toast";

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

// ── Component ─────────────────────────────────────────────────────────────────
const ProfileDrawer = ({ isOpen, onClose, targetUser, isSelf = false }) => {
  const { user, logout } = useAuth();
  const { onlineUsers } = useChat();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    bio: "",
    mobileNumber: "",
  });

  const profile = isSelf ? user : targetUser;
  if (!profile) return null;

  const isOnline = onlineUsers.has(profile._id);
  const initials = getInitials(profile.fullName);
  const avatarColor = getAvatarColor(profile._id);

  const startEdit = () => {
    setForm({
      fullName: user?.fullName || "",
      bio: user?.bio || "",
      mobileNumber: user?.mobileNumber || "",
    });
    setEditing(true);
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await userAPI.updateProfile(form);
      toast.success("Profile updated!");
      setEditing(false);
      // Refresh the page so AuthContext re-fetches the user
      window.location.reload();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.35)" }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: 340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 340, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 flex flex-col shadow-2xl theme-transition"
            style={{
              background: "var(--surface)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <h2
                className="font-bold text-base"
                style={{ color: "var(--text)" }}
              >
                {isSelf ? "Your Profile" : "Profile"}
              </h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full cursor-pointer"
                style={{ color: "var(--text-muted)" }}
              >
                <FiX size={18} />
              </motion.button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {/* Avatar */}
              <div className="flex flex-col items-center py-8 px-5">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl select-none mb-1"
                  style={{
                    background: profile.profilePicture
                      ? undefined
                      : `linear-gradient(135deg, ${avatarColor} 0%, ${avatarColor}99 100%)`,
                    backgroundImage: profile.profilePicture
                      ? `url(${profile.profilePicture})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: `0 8px 32px ${avatarColor}44`,
                  }}
                >
                  {!profile.profilePicture && initials}
                </div>

                {/* Online badge */}
                {!isSelf && (
                  <span
                    className="mt-2 px-3 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: isOnline
                        ? "rgba(37,211,102,0.12)"
                        : "var(--surface-alt)",
                      color: isOnline ? "var(--primary)" : "var(--text-muted)",
                    }}
                  >
                    {isOnline ? "● Online" : "● Offline"}
                  </span>
                )}
              </div>

              {/* Info section */}
              <div className="px-5 pb-6 flex flex-col gap-4">
                {editing ? (
                  /* Edit form */
                  <div className="flex flex-col gap-3">
                    <InputField
                      label="Full Name"
                      value={form.fullName}
                      onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
                      icon={<FiUser size={14} />}
                    />
                    <InputField
                      label="Bio"
                      value={form.bio}
                      onChange={(v) => setForm((p) => ({ ...p, bio: v }))}
                      icon={<FiEdit2 size={14} />}
                      maxLength={160}
                      placeholder="Tell people about yourself…"
                    />
                    <InputField
                      label="Phone"
                      value={form.mobileNumber}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, mobileNumber: v }))
                      }
                      icon={<FiPhone size={14} />}
                      placeholder="+91 99999 99999"
                    />
                    <div className="flex gap-2 mt-1">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                          opacity: saving ? 0.7 : 1,
                        }}
                      >
                        <FiCheck size={15} />
                        {saving ? "Saving…" : "Save Changes"}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setEditing(false)}
                        className="px-4 py-2.5 rounded-xl font-semibold text-sm"
                        style={{
                          background: "var(--surface-alt)",
                          color: "var(--text-muted)",
                        }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  /* Display */
                  <>
                    <InfoRow icon={<FiUser size={15} />} label="Name" value={profile.fullName} />
                    {profile.username && (
                      <InfoRow icon={<FiUser size={15} />} label="Username" value={`@${profile.username}`} />
                    )}
                    <InfoRow icon={<FiMail size={15} />} label="Email" value={profile.email} />
                    {profile.mobileNumber && (
                      <InfoRow icon={<FiPhone size={15} />} label="Phone" value={profile.mobileNumber} />
                    )}
                    {profile.bio && (
                      <InfoRow icon={<FiEdit2 size={15} />} label="Bio" value={profile.bio} />
                    )}

                    {isSelf && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={startEdit}
                        className="w-full py-2.5 rounded-xl font-semibold text-sm mt-1 flex items-center justify-center gap-2"
                        style={{
                          background: "var(--badge-bg)",
                          color: "var(--badge-text)",
                          border: "1px solid var(--primary)",
                        }}
                      >
                        <FiEdit2 size={14} />
                        Edit Profile
                      </motion.button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Footer — logout (only for own profile) */}
            {isSelf && !editing && (
              <div
                className="px-5 py-4 flex-shrink-0"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    logout();
                  }}
                  className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-red-500"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <FiLogOut size={15} />
                  Logout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span
      className="mt-0.5 flex-shrink-0"
      style={{ color: "var(--primary)" }}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <p
        className="text-[10px] font-semibold uppercase tracking-wide mb-0.5"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
      <p
        className="text-sm break-words"
        style={{ color: "var(--text)" }}
      >
        {value}
      </p>
    </div>
  </div>
);

const InputField = ({ label, value, onChange, icon, maxLength, placeholder }) => (
  <div>
    <label
      className="text-[10px] font-semibold uppercase tracking-wide mb-1 flex items-center gap-1"
      style={{ color: "var(--text-muted)" }}
    >
      <span style={{ color: "var(--primary)" }}>{icon}</span>
      {label}
    </label>
    <input
      type="text"
      value={value}
      maxLength={maxLength}
      placeholder={placeholder || label}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
      style={{
        background: "var(--surface-alt)",
        border: "1.5px solid var(--border)",
        color: "var(--text)",
        fontFamily: "inherit",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--primary)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--border)";
      }}
    />
    {maxLength && (
      <p
        className="text-[10px] text-right mt-0.5"
        style={{ color: "var(--text-muted)" }}
      >
        {value.length}/{maxLength}
      </p>
    )}
  </div>
);

export default ProfileDrawer;
