import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Custom color palette ───────────────────────────────────────────────
      colors: {
        obsidian: {
          DEFAULT: "#030712",
          50: "#0a0f1f",
          100: "#070d1a",
          200: "#050a14",
          900: "#030712",
        },
        "vortex-cyan": {
          DEFAULT: "#22d3ee",
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        "vortex-indigo": {
          DEFAULT: "#6366f1",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        "vortex-purple": {
          DEFAULT: "#a855f7",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
      },

      // ── Font families (CSS variable injection from next/font) ──────────────
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      // ── Custom breakpoints ─────────────────────────────────────────────────
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },

      // ── Custom keyframes ───────────────────────────────────────────────────
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.35)", opacity: "0" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },

      // ── Custom animation names ─────────────────────────────────────────────
      animation: {
        "spin-slow": "spin-slow 28s linear infinite",
        "ping-slow": "ping-slow 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "border-flow": "border-flow 3s ease infinite",
        "float-y": "float-y 2.8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },

      // ── Background sizes (for animated gradients) ──────────────────────────
      backgroundSize: {
        "200%": "200% 200%",
        "300%": "300% 300%",
      },

      // ── Extended backdrop blur ─────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },

      // ── Extended box shadows ───────────────────────────────────────────────
      boxShadow: {
        "neon-cyan":
          "0 0 20px rgba(34,211,238,0.5), 0 0 60px rgba(34,211,238,0.2)",
        "neon-indigo":
          "0 0 20px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.2)",
        "neon-purple":
          "0 0 20px rgba(168,85,247,0.5), 0 0 60px rgba(168,85,247,0.2)",
        "inset-glow":
          "inset 0 0 40px rgba(99,102,241,0.08)",
        "card-hover":
          "inset 0 0 40px rgba(99,102,241,0.1), 0 0 40px rgba(99,102,241,0.1)",
      },

      // ── Extended spacing for large screens ────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },

      // ── Max width extensions ───────────────────────────────────────────────
      maxWidth: {
        "8xl": "90rem",
        "9xl": "105rem",
      },
    },
  },
  plugins: [],
}

export default config
