import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";

// ── Loading Spinner shown while session is being restored ──────────────────────
function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 rounded-full border-4"
        style={{
          borderColor: "var(--border)",
          borderTopColor: "var(--primary)",
        }}
      />
      <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
        Loading Mingo…
      </p>
    </div>
  );
}

// ── ProtectedRoute ─────────────────────────────────────────────────────────────
// Wraps any route that requires authentication.
// - While session is being checked: shows spinner
// - If not authenticated: redirects to /login with a state message
// - If authenticated: renders children
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please login to continue chatting.",
        }}
        replace
      />
    );
  }

  return children;
}
