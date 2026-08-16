import React from "react";
import { motion } from "motion/react";

const features = [
  {
    icon: "💬",
    title: "Instant Messaging",
    description: "Send text, images, and files to anyone in real time. Experience the smoothest chat you've ever had.",
  },
  {
    icon: "👥",
    title: "Group Chats",
    description: "Create groups for work, family, or friends. Add up to 256 members, assign admins, and more.",
  },
  {
    icon: "📊",
    title: "Smart Polls",
    description: "Make decisions fast. Create polls in any group, track votes in real time, and act on results instantly.",
  },
  {
    icon: "🔒",
    title: "End-to-End Privacy",
    description: "Every message is encrypted end-to-end. Your conversations stay between you — nobody else can read them.",
  },
];

export default function FeatureGrid() {
  return (
    <section
      className="py-20 px-6 md:px-16 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
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
            Why Mingo?
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight theme-transition"
            style={{ color: "var(--text)" }}
          >
            Built for real connections
          </h2>
          <p className="mt-3 text-lg max-w-lg mx-auto theme-transition" style={{ color: "var(--text-muted)" }}>
            Everything you need to stay close to the people who matter most.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px var(--glow)" }}
              className="group rounded-3xl p-7 cursor-pointer theme-transition"
              style={{
                background: "var(--surface)",
                boxShadow: "var(--card-shadow)",
                border: "1px solid transparent",
              }}
            >
              {/* Icon bubble */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "var(--surface-alt)" }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3
                className="text-lg font-bold mb-2 theme-transition"
                style={{ color: "var(--text)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed theme-transition"
                style={{ color: "var(--text-muted)" }}
              >
                {feature.description}
              </p>

              {/* Arrow */}
              <div
                className="mt-5 flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: "var(--primary)" }}
              >
                Learn more
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
