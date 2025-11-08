import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./design/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C5530",
        secondary: "#8B4513",
        accent: "#B8860B",
        background: "#FDF6E3",
        surface: "#FFFFFF",
        text: {
          primary: "#2D3748",
          secondary: "#4A5568"
        }
      },
      fontFamily: {
        display: ["'EB Garamond'", ...defaultTheme.fontFamily.serif],
        body: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["'Fira Code'", ...defaultTheme.fontFamily.mono]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(44, 85, 48, 0.08)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
