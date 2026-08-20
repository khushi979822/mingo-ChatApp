import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// ── Axios defaults ────────────────────────────────────────────────────────────
// withCredentials ensures cookies (JWT) are sent on every request
axios.defaults.withCredentials = true;

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true while checking session

  // ── Restore session on mount (checks HTTP-only cookie via /api/auth/me) ────
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        if (data.success) {
          setUser(data.data);
        }
      } catch {
        // Not logged in — that's fine
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  // ── Register ─────────────────────────────────────────────────────────────────
  const register = useCallback(async ({ fullName, username, email, password }) => {
    const { data } = await axios.post("/api/auth/register", {
      fullName,
      username,
      email,
      password,
    });
    return data; // caller handles toast & navigation
  }, []);

  // ── Login ─────────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ emailOrUsername, password }) => {
    const { data } = await axios.post("/api/auth/login", {
      emailOrUsername,
      password,
    });
    if (data.success) {
      setUser(data.data);
    }
    return data;
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch {
      // Even if the request fails, clear local state
    } finally {
      setUser(null);
      toast.success("Logged out successfully");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}
