import React from "react";
import { motion } from "motion/react";

const bullets = [
  { icon: "👥", text: "Create groups with up to 256 members" },
  { icon: "📌", text: "Pin important messages for everyone to see" },
  { icon: "🔔", text: "Mention @all or specific members instantly" },
  { icon: "🛡️", text: "Admin controls to manage your community" },
  { icon: "📊", text: "Built-in polls to decide together" },
];

const notifications = [
  { text: "Alex joined the group", avatar: "A", top: "8%", right: "-6%", delay: 0 },
  { text: "Poll: 8 votes so far!", avatar: "📊", top: "48%", right: "-10%", delay: 0.4 },
  { text: "@all: Meeting in 5 mins!", avatar: "🔔", bottom: "12%", right: "-6%", delay: 0.8 },
];

const groupMessages = [
  { text: "Good morning team! 👋", isMe: false, name: "Alex" },
  { text: "Morning! Ready for the standup?", isMe: false, name: "Sara" },
  { text: "Let's go! I'm sharing my screen now", isMe: true },
  { text: "Perfect, joining in 2 mins 🚀", isMe: false, name: "Mike" },
  { text: "Great work everyone yesterday 💪", isMe: false, name: "Alex" },
];

export default function GroupShowcase() {
  return (
    <section
      className="py-20 px-6 md:px-16 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Divider accent */}
        <div className="flex justify-center mb-16">
          <div
            className="w-16 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--primary), var(--primary-dark))" }}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <span
              className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-5 theme-transition"
              style={{ background: "var(--badge-bg)", color: "var(--badge-text)" }}
            >
              Group Chats
            </span>

            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5 theme-transition"
              style={{ color: "var(--text)" }}
            >
              Stay in sync with{" "}
              <span className="gradient-text">your people</span>
            </h2>

            <p
              className="text-lg leading-relaxed mb-8 max-w-md theme-transition"
              style={{ color: "var(--text-muted)" }}
            >
              Whether it's your work squad, family group, or friend circle — Mingo keeps everyone on the same page with powerful group tools.
            </p>

            {/* Bullets */}
            <ul className="space-y-4">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={bullet.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 theme-transition"
                    style={{ background: "var(--surface-alt)" }}
                  >
                    {bullet.icon}
                  </div>
                  <span
                    className="font-medium text-sm theme-transition"
                    style={{ color: "var(--text)" }}
                  >
                    {bullet.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 12px 30px var(--glow)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all primary-glow"
              style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)" }}
            >
              Create a Group
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          {/* ── Right: Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Phone */}
              <div
                className="w-64 md:w-72 rounded-[3rem] border-[6px] border-[#111827] overflow-hidden shadow-2xl"
                style={{ boxShadow: "0 40px 80px rgba(17,24,39,0.2)" }}
              >
                <div className="flex justify-center py-3 bg-[#111827]">
                  <div className="w-20 h-5 rounded-full bg-black" />
                </div>

                <div className="bg-[#ECE5DD] min-h-[520px] flex flex-col">
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#128C7E]">
                    <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm">T</div>
                    <div>
                      <p className="text-white font-semibold text-sm">Team Mingo 🚀</p>
                      <p className="text-green-200 text-xs">5 members online</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-white text-[8px]">📞</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
                    {groupMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.12 }}
                        className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`px-3 py-2 rounded-2xl text-xs max-w-[78%] shadow-sm ${
                            msg.isMe
                              ? "bg-[#DCF8C6] text-[#111827] rounded-tr-none"
                              : "bg-white text-[#111827] rounded-tl-none"
                          }`}
                        >
                          {!msg.isMe && msg.name && (
                            <p className="text-[9px] font-semibold text-[#128C7E] mb-0.5">{msg.name}</p>
                          )}
                          <p className="leading-relaxed">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 bg-[#F0F0F0] m-2 rounded-full">
                    <span className="flex-1 text-xs text-gray-400">Message Team Mingo…</span>
                    <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center py-2 bg-[#111827]">
                  <div className="w-24 h-1 rounded-full bg-gray-600" />
                </div>
              </div>

              {/* Floating notification cards */}
              {notifications.map((notif) => (
                <motion.div
                  key={notif.text}
                  className="absolute flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-lg min-w-[170px] theme-transition"
                  style={{
                    top: notif.top,
                    right: notif.right,
                    bottom: notif.bottom,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--card-shadow)",
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  viewport={{ once: true }}
                  transition={{
                    opacity: { delay: notif.delay + 0.5, duration: 0.4 },
                    scale: { delay: notif.delay + 0.5, duration: 0.4 },
                    y: { delay: notif.delay + 0.9, duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))" }}
                  >
                    {notif.avatar}
                  </div>
                  <p className="text-xs font-medium leading-tight" style={{ color: "var(--text)" }}>{notif.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
