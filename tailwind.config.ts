import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EAF1EC",
          100: "#C8DCCF",
          500: "#2A6450",
          600: "#1C4E3F",
          700: "#0E3B2E",
          800: "#082A20",
        },
        forest: {
          50: "#EAF1EC",
          100: "#C8DCCF",
          200: "#9FC1AC",
          300: "#6FA286",
          400: "#458169",
          500: "#2A6450",
          600: "#1C4E3F",
          700: "#0E3B2E",
          800: "#082A20",
          900: "#041A14",
        },
        gold: {
          50: "#FBF6E7",
          100: "#F3E8C2",
          200: "#E9D696",
          300: "#DEC16A",
          400: "#D0AC4A",
          500: "#C9A961",
          600: "#A88947",
          700: "#856B35",
          800: "#5F4B23",
          900: "#3B2E14",
        },
        cream: {
          50: "#FDFBF5",
          100: "#F8F3E8",
          200: "#F0E9D6",
          300: "#E5DCC0",
          400: "#D8CDA8",
        },
        ink: {
          900: "#14100A",
          800: "#231C12",
          700: "#3A3021",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans:    ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono:    ["ui-monospace", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(.22,1,.36,1) both",
        "fade-in": "fadeIn 1.2s cubic-bezier(.22,1,.36,1) both",
        "scale-in": "scaleIn 1s cubic-bezier(.22,1,.36,1) both",
        "shimmer": "shimmer 3s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
