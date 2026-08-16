import React, { createContext, useContext, useEffect, useState } from "react";

// ── Theme palette definitions ────────────────────────────────────────────────
export const THEMES = {
  light: {
    "--bg":            "#F7F5F3",
    "--surface":       "#FFFFFF",
    "--surface-alt":   "#F2E9DD",
    "--border":        "#E5E0DA",
    "--text":          "#111827",
    "--text-muted":    "#6B7280",
    "--primary":       "#25D366",
    "--primary-dark":  "#128C7E",
    "--primary-deep":  "#075E54",
    "--card-shadow":   "0 4px 20px rgba(0,0,0,0.06)",
    "--hover-bg":      "#EEEBE7",
    "--footer-bg":     "#111827",
    "--footer-text":   "#FFFFFF",
    "--glow":          "rgba(37,211,102,0.15)",
    "--badge-bg":      "rgba(37,211,102,0.10)",
    "--badge-text":    "#128C7E",
  },
  dark: {
    "--bg":            "#121212",
    "--surface":       "#1E1E1E",
    "--surface-alt":   "#252525",
    "--border":        "#2E2E2E",
    "--text":          "#F1F5F9",
    "--text-muted":    "#94A3B8",
    "--primary":       "#25D366",
    "--primary-dark":  "#128C7E",
    "--primary-deep":  "#075E54",
    "--card-shadow":   "0 4px 20px rgba(0,0,0,0.35)",
    "--hover-bg":      "#2A2A2A",
    "--footer-bg":     "#0A0A0A",
    "--footer-text":   "#F1F5F9",
    "--glow":          "rgba(37,211,102,0.20)",
    "--badge-bg":      "rgba(37,211,102,0.12)",
    "--badge-text":    "#25D366",
  },
  black: {
    "--bg":            "#000000",
    "--surface":       "#0F0F0F",
    "--surface-alt":   "#141414",
    "--border":        "#1A1A1A",
    "--text":          "#FFFFFF",
    "--text-muted":    "#888888",
    "--primary":       "#25D366",
    "--primary-dark":  "#128C7E",
    "--primary-deep":  "#075E54",
    "--card-shadow":   "0 4px 24px rgba(37,211,102,0.08)",
    "--hover-bg":      "#1A1A1A",
    "--footer-bg":     "#000000",
    "--footer-text":   "#FFFFFF",
    "--glow":          "rgba(37,211,102,0.12)",
    "--badge-bg":      "rgba(37,211,102,0.10)",
    "--badge-text":    "#25D366",
  },
  spotify: {
    "--bg":            "#F0FDF4",
    "--surface":       "#FFFFFF",
    "--surface-alt":   "#DCFCE7",
    "--border":        "#BBF7D0",
    "--text":          "#052E16",
    "--text-muted":    "#166534",
    "--primary":       "#1DB954",
    "--primary-dark":  "#15803D",
    "--primary-deep":  "#14532D",
    "--card-shadow":   "0 8px 32px rgba(29,185,84,0.18)",
    "--hover-bg":      "#DCFCE7",
    "--footer-bg":     "#14532D",
    "--footer-text":   "#FFFFFF",
    "--glow":          "rgba(29,185,84,0.30)",
    "--badge-bg":      "rgba(29,185,84,0.15)",
    "--badge-text":    "#15803D",
  },
  claude: {
    "--bg":            "#F6F4EF",
    "--surface":       "#ECE7DD",
    "--surface-alt":   "#E4DDD1",
    "--border":        "#D5CCBF",
    "--text":          "#3B3129",
    "--text-muted":    "#7A6E62",
    "--primary":       "#C67C4E",
    "--primary-dark":  "#A8653C",
    "--primary-deep":  "#8A4E2A",
    "--card-shadow":   "0 4px 20px rgba(198,124,78,0.10)",
    "--hover-bg":      "#E0D8CE",
    "--footer-bg":     "#2C241C",
    "--footer-text":   "#F6F4EF",
    "--glow":          "rgba(198,124,78,0.15)",
    "--badge-bg":      "rgba(198,124,78,0.12)",
    "--badge-text":    "#A8653C",
  },
  corporate: {
    "--bg":            "#F8FAFC",
    "--surface":       "#FFFFFF",
    "--surface-alt":   "#F1F5F9",
    "--border":        "#E2E8F0",
    "--text":          "#0F172A",
    "--text-muted":    "#64748B",
    "--primary":       "#2563EB",
    "--primary-dark":  "#1D4ED8",
    "--primary-deep":  "#1E40AF",
    "--card-shadow":   "0 4px 20px rgba(37,99,235,0.08)",
    "--hover-bg":      "#EEF2FF",
    "--footer-bg":     "#0F172A",
    "--footer-text":   "#F8FAFC",
    "--glow":          "rgba(37,99,235,0.15)",
    "--badge-bg":      "rgba(37,99,235,0.08)",
    "--badge-text":    "#2563EB",
  },
  ghibli: {
    "--bg":            "#EAF6E3",
    "--surface":       "#F8FFF3",
    "--surface-alt":   "#DFF0D8",
    "--border":        "#C8E6B8",
    "--text":          "#304D30",
    "--text-muted":    "#5C7A5C",
    "--primary":       "#6AA84F",
    "--primary-dark":  "#4E8A35",
    "--primary-deep":  "#3A6B26",
    "--card-shadow":   "0 6px 24px rgba(106,168,79,0.12)",
    "--hover-bg":      "#D4EDCA",
    "--footer-bg":     "#1E3320",
    "--footer-text":   "#EAF6E3",
    "--glow":          "rgba(106,168,79,0.18)",
    "--badge-bg":      "rgba(106,168,79,0.12)",
    "--badge-text":    "#4E8A35",
  },
  halloween: {
    "--bg":            "#1A0B2E",
    "--surface":       "#2D1B46",
    "--surface-alt":   "#3D2456",
    "--border":        "#4A2D6A",
    "--text":          "#FFEFD5",
    "--text-muted":    "#C4A882",
    "--primary":       "#FF7A00",
    "--primary-dark":  "#E06000",
    "--primary-deep":  "#B54500",
    "--card-shadow":   "0 8px 32px rgba(255,122,0,0.20)",
    "--hover-bg":      "#3D2456",
    "--footer-bg":     "#0D0619",
    "--footer-text":   "#FFEFD5",
    "--glow":          "rgba(255,122,0,0.25)",
    "--badge-bg":      "rgba(255,122,0,0.12)",
    "--badge-text":    "#FF7A00",
  },
};

const STORAGE_KEY = "mingo-theme";

// ── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  themeVars: THEMES.light,
});

// ── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "light";
  });

  const themeVars = THEMES[theme] || THEMES.light;

  // Apply CSS variables to :root on every theme change
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    // Also set the FlyonUI data-theme attribute for the existing header
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, themeVars]);

  const setTheme = (newTheme) => {
    if (THEMES[newTheme]) setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeVars }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme() {
  return useContext(ThemeContext);
}
