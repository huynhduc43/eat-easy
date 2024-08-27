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
      colors: {
        "my-neutral": {
          0: "#FFFFFF",
          100: "#F6F6F9",
          150: "#EAEAEF",
          200: "#DCDCE4",
          300: "#C0C0CF",
          400: "#A5A5BA",
          500: "#8E8EA9",
          600: "#666687",
          700: "#4A4A6A",
          800: "#32324D",
          900: "#212134",
        },
        "my-primary": {
          100: "#EBEAF2",
          200: "#C4C0D7",
          500: "#8981AE",
          600: "#615793",
          700: "#3A2D78",
        },
        "my-secondary": {
          100: "#FFF7E8",
          200: "#FFE7BB",
          500: "#FFD88E",
          600: "#FFB01D",
          700: "#FFB01D",
          800: "#FAA300",
        },
        "my-tertiary": {
          50: "#FFF2EA",
          100: "#FFD7C0",
          200: "#FFB080",
          600: "#FF9556",
          700: "#FF7B2C",
        },
        "my-success": {
          200: "#B4EFC6",
          500: "#4AD775",
          700: "#24A44B",
        },
        "my-danger": {
          200: "#FCCCCC",
          500: "#F24343",
          700: "#DE0F0F",
        },
      },
    },
  },
  plugins: [],
};
export default config;
