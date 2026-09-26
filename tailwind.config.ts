import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        panel: "#121317",
        "panel-2": "#16181d",
        line: "#24262c",
        lime: "#ccff00",
        muted: "#9a9ca4",
        "muted-2": "#6f717a",
      },
      fontFamily: {
        display: ["var(--font-oswald)"],
        sans: ["var(--font-inter)"],
      },
      borderRadius: {
        card: "10px",
        pill: "999px",
      },
      keyframes: {
        "toast-in": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.25s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;