import React from "react";
import { motion } from "motion/react";

const leftPhoneMessages = [
  { text: "Let's plan the trip! 🗺️", isMe: false, time: "10:02 AM" },
  { text: "I'm in! When do we leave?", isMe: true, time: "10:03 AM" },
  { isPoll: true },
  { text: "Voted! Friday works 🙌", isMe: true, time: "10:05 AM" },
];

const rightPhoneMessages = [
  { text: "Good morning everyone! ☀️", isMe: false, name: "Alex", time: "9:00 AM" },
  { text: "Morning! Ready for today's meeting?", isMe: false, name: "Sara", time: "9:01 AM" },
  { text: "Always ready 💪", isMe: true, time: "9:02 AM" },
  { text: "Let's crush it team! 🚀", isMe: false, name: "Mike", time: "9:03 AM" },
];

const floatingPills = [
  { label: "Create Similar Group", icon: "👥", top: "5%", left: "-5%", delay: 0 },
  { label: "Poll Created ✓", icon: "📊", top: "40%", left: "-8%", delay: 0.3 },
  { label: "@all Mention", icon: "🔔", bottom: "10%", left: "5%", delay: 0.6 },
  { label: "Online Members: 12", icon: "🟢", top: "5%", right: "-5%", delay: 0.9 },
];

function PhoneMockup({ children, label }) {
  return (
    <div className="relative w-52 md:w-60">
      <div className="text-center mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</span>
      </div>
      <div
        className="rounded-[2.5rem] border-[5px] border-[#222] overflow-hidden shadow-2xl"
        style={{ background: "#111827", boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}
      >
        <div className="flex justify-center py-2 bg-[#111827]">
          <div className="w-16 h-4 rounded-full bg-black" />
        </div>
        <div className="bg-[#ECE5DD] min-h-[440px] flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#128C7E]">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold">G</div>
            <div>
              <p className="text-white text-xs font-semibold">Weekend Trip 🏖️</p>
              <p className="text-green-200 text-[10px]">4 members</p>
            </div>
          </div>
          <div className="flex-1 p-2 space-y-2">{children}</div>
          <div className="flex items-center gap-2 px-2 py-1.5 bg-[#F0F0F0] mx-2 mb-2 rounded-full">
            <span className="flex-1 text-[10px] text-gray-400">Message…</span>
            <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-1.5 bg-[#111827]">
          <div className="w-16 h-0.5 rounded-full bg-gray-600" />
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ text, isMe, name, time }) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-2.5 py-1.5 rounded-xl text-[10px] max-w-[80%] shadow-sm ${
          isMe ? "bg-[#DCF8C6] text-[#111827] rounded-tr-none" : "bg-white text-[#111827] rounded-tl-none"
        }`}
      >
        {name && <p className="font-semibold text-[9px] text-[#128C7E] mb-0.5">{name}</p>}
        <p className="leading-relaxed">{text}</p>
        <p className="text-gray-400 text-[8px] text-right mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function PollCard() {
  return (
    <div className="bg-white rounded-xl p-2.5 shadow-sm text-[10px]">
      <p className="font-semibold text-[#128C7E] mb-1.5">📊 When should we leave?</p>
      {["Friday evening", "Saturday morning", "Sunday afternoon"].map((opt, i) => (
        <div key={opt} className="flex items-center gap-2 mb-1">
          <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${[60, 25, 15][i]}%`,
                background: "linear-gradient(90deg, var(--primary), var(--primary-dark))",
              }}
            />
          </div>
          <span className="text-gray-500 w-5 text-right">{[60, 25, 15][i]}%</span>
        </div>
      ))}
    </div>
  );
}

export default function FeaturedPreview() {
  return (
    <section
      className="py-20 px-6 md:px-16 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4 theme-transition"
            style={{ background: "var(--badge-bg)", color: "var(--badge-text)" }}
          >
            See it in action
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight theme-transition"
            style={{ color: "var(--text)" }}
          >
            Everything your group needs
          </h2>
          <p className="mt-3 text-lg max-w-lg mx-auto theme-transition" style={{ color: "var(--text-muted)" }}>
            Polls, mentions, group chats — all in one beautiful app.
          </p>
        </motion.div>

        {/* Big card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 md:p-14 overflow-hidden theme-transition"
          style={{ background: "var(--surface-alt)", boxShadow: "var(--card-shadow)" }}
        >
          {/* Background orbs */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", transform: "translate(40%, -40%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, var(--primary-dark) 0%, transparent 70%)", transform: "translate(-40%, 40%)" }}
          />

          {/* Floating pills */}
          {floatingPills.map((pill) => (
            <motion.div
              key={pill.label}
              className="absolute hidden lg:flex items-center gap-2 rounded-xl px-3 py-2 shadow-md text-xs font-medium theme-transition"
              style={{
                top: pill.top, left: pill.left, right: pill.right, bottom: pill.bottom,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                boxShadow: "var(--card-shadow)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
              viewport={{ once: true }}
              transition={{
                opacity: { delay: pill.delay + 0.4, duration: 0.4 },
                scale: { delay: pill.delay + 0.4, duration: 0.4 },
                y: { delay: pill.delay + 0.8, duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <span>{pill.icon}</span>
              {pill.label}
            </motion.div>
          ))}

          {/* Phones */}
          <div className="flex flex-col sm:flex-row justify-center items-end gap-6 md:gap-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PhoneMockup label="Group Chat">
                {leftPhoneMessages.map((msg, i) =>
                  msg.isPoll ? <PollCard key={i} /> : <ChatBubble key={i} {...msg} />
                )}
              </PhoneMockup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="sm:mb-8"
            >
              <PhoneMockup label="Live Conversation">
                {rightPhoneMessages.map((msg, i) => (
                  <ChatBubble key={i} {...msg} />
                ))}
              </PhoneMockup>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
