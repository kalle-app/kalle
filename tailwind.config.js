module.exports = {
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
