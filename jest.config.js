module.exports = {
  preset: "blitz",
  coverageDirectory: ".coverage",
  collectCoverageFrom: [
    "*/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!cypress/**",
    "!db/**",
    "!test/**",
    "!coverage/**",
    "!.*/**",
  ],
}
