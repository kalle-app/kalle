module.exports = {
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["arial", "ui-sans-serif", "system-ui", "sans-serif"],
      serif: ["palatino", "ui-serif", "Georgia", "serif"],
    },
    minWidth: {
      24: "6rem",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
