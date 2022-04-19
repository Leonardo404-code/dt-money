module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    "import/prefer-default-export": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    quotes: 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
  },
};
