/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      colors: {
        ink:        "#0a0f1e",
        surface:    "#111827",
        indigo:     { DEFAULT: "#6366f1", dark: "#4f46e5", light: "#a5b4fc" },
        violet:     { DEFAULT: "#8b5cf6", dark: "#7c3aed" },
        cyan:       { DEFAULT: "#06b6d4", dark: "#0891b2" },
        emerald:    { DEFAULT: "#10b981", dark: "#059669" },
        amber:      { DEFAULT: "#f59e0b", dark: "#d97706" },
        danger:     "#ef4444",
      },
      boxShadow: {
        float:   "0 20px 60px rgba(0,0,0,0.5)",
        glow:    "0 0 30px rgba(99,102,241,0.4)",
        "glow-cyan": "0 0 30px rgba(6,182,212,0.4)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in":    "fade-in 0.4s ease both",
        "slide-up":   "slide-up 0.5s cubic-bezier(.22,1,.36,1) both",
        "slide-left": "slide-in-left 0.4s cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
};
