import React from "react";
import { motion } from "motion/react";
import { FiDownload, FiArrowRight } from "react-icons/fi";

export default function CTA() {
  return (
    <section
      className="py-20 px-6 md:px-16 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-20 primary-glow"
          style={{
            background: "linear-gradient(135deg, var(--primary-deep) 0%, var(--primary-dark) 40%, var(--primary) 100%)",
            boxShadow: "0 30px 80px var(--glow)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)", transform: "translate(-40%, -40%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)", transform: "translate(40%, 40%)" }}
          />

          {/* Avatar cluster */}
          <div className="flex justify-center -space-x-3 mb-8">
            {["S", "A", "M", "K", "R"].map((letter, i) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm"
              >
                {letter}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-12 h-12 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center text-white text-xs font-semibold backdrop-blur-sm"
            >
              2M+
            </motion.div>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5"
          >
            Start Chatting with
            <br />
            Mingo Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-lg max-w-md mx-auto mb-10"
          >
            Join millions of users who chat securely and instantly on Mingo.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white font-bold text-base transition-all shadow-lg"
              style={{ color: "var(--primary-dark)" }}
            >
              <FiDownload className="text-lg" />
              Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/30 text-white font-semibold text-base transition-all backdrop-blur-sm"
            >
              Explore Features
              <FiArrowRight className="text-lg" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
