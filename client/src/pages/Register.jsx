import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiUser,
  FiAtSign,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMessageCircle,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

// ── Password strength calculator ───────────────────────────────────────────────
function getPasswordStrength(password) {
  if (!password) return { level: 0, label: "", color: "transparent" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { level: 1, label: "Weak", color: "#EF4444" },
    { level: 2, label: "Fair", color: "#F59E0B" },
    { level: 3, label: "Good", color: "#3B82F6" },
    { level: 4, label: "Strong", color: "#25D366" },
  ];
  return levels[score - 1] || { level: 0, label: "", color: "transparent" };
}

// ── Input field ────────────────────────────────────────────────────────────────
function AuthInput({ label, id, type = "text", value, onChange, placeholder, icon: Icon, rightElement, error, hint }) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-xs font-semibold"
        style={{ color: "var(--text)" }}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
        >
          <Icon size={14} />
        </div>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={id}
          className="w-full pl-9 pr-9 py-2.5 rounded-xl text-xs font-medium outline-none transition-all theme-transition"
          style={{
            background: "var(--surface-alt)",
            border: error
              ? "1.5px solid #EF4444"
              : "1.5px solid var(--border)",
            color: "var(--text)",
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = "var(--primary)";
            e.target.style.boxShadow = "0 0 0 3px var(--glow)";
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
      {hint && !error && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

// ── Register Page ──────────────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/chat", { replace: true });
  }, [isAuthenticated, navigate]);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "confirmPassword" && errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating your account…");

    try {
      const data = await register({
        fullName: form.fullName.trim(),
        username: form.username.trim() || undefined,
        email: form.email.trim(),
        password: form.password,
      });

      toast.dismiss(loadingToast);
      if (data.success) {
        toast.success("Account created! Please log in 🎉");
        navigate("/login");
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

  const passwordsMatch =
    form.confirmPassword && form.password === form.confirmPassword;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 theme-transition"
      style={{ background: "var(--bg)" }}
    >
      {/* Background blobs */}
      <div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary-dark) 0%, transparent 70%)",
          transform: "translate(40%, 40%)",
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
          className="rounded-3xl p-6 sm:p-7 theme-transition"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--card-shadow)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-5"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                boxShadow: "0 8px 24px var(--glow)",
              }}
            >
              <FiMessageCircle size={22} color="#fff" />
            </div>
            <h1
              className="text-xl font-extrabold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Create an account
            </h1>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Join Mingo and start chatting today
            </p>
          </motion.div>

          {/* General error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl text-xs font-medium mb-4"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#EF4444",
              }}
            >
              <FiAlertCircle size={13} />
              {errors.general}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
            >
              <AuthInput
                label="Full Name"
                id="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                icon={FiUser}
                error={errors.fullName}
              />
            </motion.div>

            {/* Username (optional) */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16 }}
            >
              <AuthInput
                label={
                  <>
                    Username{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                      (optional)
                    </span>
                  </>
                }
                id="username"
                value={form.username}
                onChange={handleChange}
                placeholder="johndoe"
                icon={FiAtSign}
                error={errors.username}
                hint="Others can find you by username"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AuthInput
                label="Email Address"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                icon={FiMail}
                error={errors.email}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.24 }}
            >
              <AuthInput
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Min 8 characters"
                icon={FiLock}
                error={errors.password}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-0.5 rounded cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: "var(--text-muted)" }}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                }
              />
              {/* Password strength bar */}
              {form.password && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1.5 space-y-0.5"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-0.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= passwordStrength.level
                              ? passwordStrength.color
                              : "var(--border)",
                        }}
                      />
                    ))}
                  </div>
                  {passwordStrength.label && (
                    <p
                      className="text-xs font-medium"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.label} password
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 }}
            >
              <AuthInput
                label="Confirm Password"
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                icon={passwordsMatch ? FiCheckCircle : FiLock}
                error={errors.confirmPassword}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="p-0.5 rounded cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: "var(--text-muted)" }}
                    tabIndex={-1}
                  >
                    {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                }
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              className="pt-0.5"
            >
              <motion.button
                id="register-submit-btn"
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 12px 30px var(--glow)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full py-3 rounded-2xl text-white font-bold text-sm tracking-wide transition-all"
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
                    Creating Account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* Login link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              id="go-to-login"
              className="font-bold transition-opacity hover:opacity-70"
              style={{ color: "var(--primary)" }}
            >
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
