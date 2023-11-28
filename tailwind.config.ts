import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: { 100: "#fff" },
      black: { 100: "#000", 300: "#131316" },
      jade: { 400: "#0EA163" },
      yellow: { 400: "#A77A07" },
      gray: {
        50: "#EFF1F6",
        400: "#56616B",
      },
    },
  },
  plugins: [],
};
export default config;
