import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      colors: {
        black: "#111111",
        white: "#FFFFFF",
        sky: "#DCEEFF",
        blue: "#4DA3FF",
        orange: "#FF5A1F",
        yellow: "#FFD400",
        lavender: "#D9C8FF",
        mint: "#38E0A6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
      },
      boxShadow: {
        pill: "0 12px 0 rgba(0,0,0,0.08)",
        card: "0 12px 24px rgba(0,0,0,0.08)",
      },
      transitionDuration: {
        350: "350ms",
      },
    },
  },
  plugins: [],
};

export default config;
