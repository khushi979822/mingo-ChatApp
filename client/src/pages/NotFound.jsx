import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FiHome, FiMessageCircle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      {/* Background blob */}
      <div
        className="fixed top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
            boxShadow: "0 12px 36px var(--glow)",
          }}
        >
          <FiMessageCircle size={36} color="#fff" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-7xl font-black mb-2 gradient-text"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--text)" }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-base mb-8 max-w-sm mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              boxShadow: "0 6px 18px var(--glow)",
            }}
          >
            <FiHome size={15} />
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
