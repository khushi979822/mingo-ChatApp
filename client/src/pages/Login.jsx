import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMessageCircle,
  FiAlertCircle,
} from "react-icons/fi";

// ── Input field component ─────────────────────────────────────────────────────
function AuthInput({ label, id, type = "text", value, onChange, placeholder, icon: Icon, rightElement, error }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-semibold"
        style={{ color: "var(--text)" }}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
        >
          <Icon size={16} />
        </div>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={id}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm font-medium outline-none transition-all theme-transition"
          style={{
            background: "var(--surface-alt)",
            border: error
              ? "1.5px solid #EF4444"
              : "1.5px solid var(--border)",
            color: "var(--text)",
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = "var(--primary)";
            e.target.style.boxShadow = `0 0 0 3px var(--glow)`;
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "#EF4444" }}
        >
          <FiAlertCircle size={12} /> {error}
        </motion.p>
      )}
    </div>
  );
}

// ── Login Page ────────────────────────────────────────────────────────────────
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // If already logged in, redirect to chat
  useEffect(() => {
    if (isAuthenticated) navigate("/chat", { replace: true });
  }, [isAuthenticated, navigate]);

  // Message from ProtectedRoute redirect
  const redirectMessage = location.state?.message;

  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email or username is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Logging in…");

    try {
      const data = await login({
        emailOrUsername: form.emailOrUsername.trim(),
        password: form.password,
      });

      toast.dismiss(loadingToast);
      if (data.success) {
        toast.success("Welcome back! 🎉");
        const redirectTo = location.state?.from?.pathname || "/chat";
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      const msg =
        err?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      {/* Background blobs */}
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary-dark) 0%, transparent 70%)",
          transform: "translate(-40%, 40%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass card */}
        <div
          className="rounded-3xl p-8 sm:p-10 theme-transition"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--card-shadow)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                boxShadow: "0 8px 24px var(--glow)",
              }}
            >
              <FiMessageCircle size={26} color="#fff" />
            </div>
            <h1
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Welcome back
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Sign in to your Mingo account
            </p>
          </motion.div>

          {/* Redirect message from ProtectedRoute */}
          {redirectMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 rounded-xl text-sm font-medium mb-6"
              style={{
                background: "rgba(37,211,102,0.10)",
                border: "1px solid var(--primary)",
                color: "var(--primary-dark)",
              }}
            >
              <FiAlertCircle size={15} />
              {redirectMessage}
            </motion.div>
          )}

          {/* General error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 rounded-xl text-sm font-medium mb-6"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#EF4444",
              }}
            >
              <FiAlertCircle size={15} />
              {errors.general}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <AuthInput
                label="Email or Username"
                id="emailOrUsername"
                type="text"
                value={form.emailOrUsername}
                onChange={handleChange}
                placeholder="you@example.com or @username"
                icon={FiMail}
                error={errors.emailOrUsername}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AuthInput
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                icon={FiLock}
                error={errors.password}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-0.5 rounded cursor-pointer transition-opacity hover:opacity-70"
                    style={{ color: "var(--text-muted)" }}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                }
              />
            </motion.div>

            {/* Remember me + Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer accent-[var(--primary)]"
                />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-semibold transition-opacity hover:opacity-70 cursor-pointer"
                style={{ color: "var(--primary)" }}
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                id="login-submit-btn"
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 12px 30px var(--glow)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full py-3.5 rounded-2xl text-white font-bold text-sm tracking-wide transition-all relative overflow-hidden"
                style={{
                  background: isSubmitting
                    ? "var(--primary-dark)"
                    : "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                  boxShadow: "0 4px 18px var(--glow)",
                  opacity: isSubmitting ? 0.8 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white inline-block"
                    />
                    Logging in…
                  </span>
                ) : (
                  "Login"
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* Register link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              id="go-to-register"
              className="font-bold transition-opacity hover:opacity-70"
              style={{ color: "var(--primary)" }}
            >
              Register
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
