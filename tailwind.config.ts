import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        palm: "#0E7C66",
        coral: "#F97352",
        sun: "#F7C948",
        ink: "#17202A"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
