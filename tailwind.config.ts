import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#18181b",
        border: "#27272a",
        primary: {
          DEFAULT: "#f59e0b",
          hover: "#d97706",
        },
        danger: {
          DEFAULT: "#ef4444",
          hover: "#dc2626",
        },
        accent: "#10b981",
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-sm": "2px 2px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-primary": "4px 4px 0px 0px #f59e0b",
        "brutal-danger": "4px 4px 0px 0px #ef4444",
      },
      borderWidth: {
        brutal: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
