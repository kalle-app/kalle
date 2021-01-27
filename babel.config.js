module.exports = {
  presets: ["next/babel"],
  env: {
    e2etest: {
      plugins: ["istanbul"],
    },
  },
}
