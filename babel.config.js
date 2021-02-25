module.exports = {
  presets: ["blitz/babel"],
  env: {
    e2etest: {
      plugins: ["istanbul"],
    },
  },
}
