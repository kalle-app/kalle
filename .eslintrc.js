module.exports = {
  env: {
    es2020: true,
  },
  extends: [
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/babel",
  ],
  plugins: ["jsx-a11y"],
  rules: {
    "import/no-anonymous-default-export": "error",
    "import/no-webpack-loader-syntax": "off",
    "react/react-in-jsx-scope": "off", // React is always in scope with Blitz
    "jsx-a11y/anchor-is-valid": "off", //Doesn't play well with Blitz/Next <Link> usage
    "jsx-a11y/no-onchange": "warn",
  },
  overrides: [
    {
      files: ["*.test.[jt]s", "*.spec.[jt]s"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
  ],
}
