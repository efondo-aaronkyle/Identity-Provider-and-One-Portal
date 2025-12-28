import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Segoe UI",
          "Tahoma",
          "Geneva",
          "Verdana",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        pup: {
          "primary": "#8B0000",
          "primary-focus": "#660000",
          "secondary": "#FFD700",
          "accent": "#FFD700",
          "base-100": "#ffffff",
          "base-content": "#333333",
        },
      },
    ],
  },
};