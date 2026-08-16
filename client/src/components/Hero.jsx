import React from "react";
import { motion } from "motion/react";
import { FiDownload, FiArrowRight } from "react-icons/fi";

const floatingCards = [
  {
    id: 1,
    text: "Sarah just messaged you!",
    avatar: "S",
    top: "8%",
    right: "-8%",
    delay: 0,
  },
  {
    id: 2,
    text: "Group: Weekend Trip 🏖️",
    avatar: "G",
    top: "55%",
    right: "-12%",
    delay: 0.4,
  },
  {
    id: 3,
    text: "Alex: On my way! 🚀",
    avatar: "A",
    top: "80%",
    left: "-5%",
    delay: 0.8,
  },
];

const chatMessages = [
  { id: 1, text: "Hey! Are you free tonight?", time: "9:41 AM", isMe: false },
  { id: 2, text: "Yes! Let's catch up 🎉", time: "9:42 AM", isMe: true },
  {
    id: 3,
    text: "Perfect! I'll call you at 7 📞",
    time: "9:43 AM",
    isMe: false,
  },
  { id: 4, text: "Can't wait! See you then 😊", time: "9:44 AM", isMe: true },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden py-20 px-6 md:px-16 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--primary-dark) 0%, transparent 70%)",
          transform: "translate(-40%, 40%)",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* ── Left: Copy ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm mb-6 theme-transition"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--primary)" }}
            />
            Now live — Mingo ChatApp
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight mb-6 theme-transition"
            style={{ color: "var(--text)" }}
          >
            Chat Better,{" "}
            <span className="gradient-text relative inline-block">
              Together
            </span>
            .
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed theme-transition"
            style={{ color: "var(--text-muted)" }}
          >
            Connect instantly with friends and groups through a fast, secure,
            and modern messaging experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 12px 30px var(--glow)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all primary-glow"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
              }}
            >
              <FiDownload className="text-lg" />
              Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all shadow-sm theme-transition"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              Learn More
              <FiArrowRight className="text-lg" />
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-10 mt-12 justify-center lg:justify-start"
          >
            {[
              { label: "Active Users", value: "2M+" },
              { label: "Messages/Day", value: "50M+" },
              { label: "Countries", value: "120+" },
            ].map((stat) => (
              <div key={stat.label} className="theme-transition">
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Phone Mockup ── */}
        <div className="flex-1 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Phone frame — always dark for realism */}
            <div
              className="relative w-64 md:w-72 rounded-[3rem] shadow-2xl overflow-hidden border-[6px] border-[#111827]"
              style={{
                background: "#111827",
                boxShadow: "0 40px 80px rgba(17,24,39,0.25)",
              }}
            >
              <div className="flex justify-center pt-3 pb-1 bg-[#111827]">
                <div className="w-20 h-5 rounded-full bg-black" />
              </div>

              {/* Screen */}
              <div className="bg-[#ECE5DD] min-h-[520px] flex flex-col">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-[#128C7E]">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Mingo Chat
                    </p>
                    <p className="text-green-200 text-xs">online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-3 space-y-3 overflow-hidden">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.isMe ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`px-3 py-2 rounded-2xl text-xs max-w-[75%] shadow-sm ${
                          msg.isMe
                            ? "bg-[#DCF8C6] text-[#111827] rounded-tr-sm"
                            : "bg-white text-[#111827] rounded-tl-sm"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-gray-400 text-[9px] text-right mt-1">
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 px-3 py-2 bg-[#F0F0F0] m-2 rounded-full">
                  <div className="flex-1 bg-transparent text-xs text-gray-400">
                    Type a message…
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
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
            {floatingCards.map((card) => (
              <motion.div
                key={card.id}
                className="absolute flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-lg min-w-[160px] theme-transition"
                style={{
                  top: card.top,
                  right: card.right,
                  left: card.left,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--card-shadow)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 0.8 + card.delay, duration: 0.4 },
                  scale: { delay: 0.8 + card.delay, duration: 0.4 },
                  y: {
                    delay: 1.2 + card.delay,
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                  }}
                >
                  {card.avatar}
                </div>
                <p
                  className="text-xs font-medium leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {card.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
