const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["arial", "ui-sans-serif", "system-ui", "sans-serif"],
        ...defaultTheme.fontFamily.sans,
        serif: ["palatino", "ui-serif", "Georgia", "serif"],
        ...defaultTheme.fontFamily.serif,
      },
      minWidth: {
        24: "6rem",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
