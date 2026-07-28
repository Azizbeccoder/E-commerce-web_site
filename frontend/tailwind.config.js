/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FDFBF7",
          100: "#F9F5EE",
          200: "#F4EFE7",
          300: "#EDE5D9",
          400: "#E4DACB",
          500: "#D6C9B6",
        },
        ink: {
          DEFAULT: "#2B2621",
          soft: "#6B6259",
          faint: "#9A9086",
          inverse: "#FBF8F3",
        },
        clay: {
          50: "#FBF0EA",
          100: "#F3E0D4",
          200: "#E5BFA8",
          300: "#D0906D",
          400: "#C26B41",
          500: "#B8552F",
          600: "#9E4526",
          700: "#7C351D",
        },
        sage: {
          DEFAULT: "#5B7355",
          50: "#E9EEE6",
          600: "#44583D",
        },
        rust: {
          DEFAULT: "#A8402F",
          50: "#F7E6E1",
          600: "#8B3223",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Karla"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "22px",
        "2xl": "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43,38,33,0.04), 0 8px 24px -12px rgba(43,38,33,0.14)",
        lift: "0 2px 4px rgba(43,38,33,0.04), 0 20px 44px -20px rgba(43,38,33,0.24)",
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        page: "82rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.5s ease both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
