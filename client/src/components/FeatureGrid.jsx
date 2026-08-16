import React from "react";
import { motion } from "motion/react";

const features = [
  {
    icon: "💬",
    title: "Instant Messaging",
    description:
      "Send text, images, and files to anyone in real time. Experience the smoothest chat you've ever had.",
    gradient: "from-green-400 to-emerald-600",
    bg: "#DCFCE7",
  },
  {
    icon: "👥",
    title: "Group Chats",
    description:
      "Create groups for work, family, or friends. Add up to 256 members, assign admins, and more.",
    gradient: "from-teal-400 to-cyan-600",
    bg: "#CCFBF1",
  },
  {
    icon: "📊",
    title: "Smart Polls",
    description:
      "Make decisions fast. Create polls in any group, track votes in real time, and act on results instantly.",
    gradient: "from-emerald-400 to-green-700",
    bg: "#D1FAE5",
  },
  {
    icon: "🔒",
    title: "End-to-End Privacy",
    description:
      "Every message is encrypted end-to-end. Your conversations stay between you — nobody else can read them.",
    gradient: "from-green-600 to-teal-700",
    bg: "#F0FDF4",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#F7F5F3]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#25D366]/10 text-[#128C7E] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Why Mingo?
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
            Built for real connections
          </h2>
          <p className="text-gray-400 mt-3 text-lg max-w-lg mx-auto">
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
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(37,211,102,0.15)" }}
              className="group bg-white rounded-3xl p-7 cursor-pointer transition-all duration-300 border border-transparent hover:border-[#25D366]/20"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              {/* Icon bubble */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: feature.bg }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#111827] mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>

              {/* Arrow indicator */}
              <div className="mt-5 flex items-center gap-1 text-[#25D366] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
