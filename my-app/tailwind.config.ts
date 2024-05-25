import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E8FB6C",
        input: "#737373",
        ring: "#E8FB6C",
        background: "#151515",
        foreground: "#E8FB6C",
        primary: {
          DEFAULT: "#E8FB6C", // E8FB6C + 151515 + 737373 yellow black grey
          foreground: "#737373",
        },
        secondary: {
          DEFAULT: "#737373",
          foreground: "#737373",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "#737373",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#737373",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "#737373",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "#737373",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "#737373",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config