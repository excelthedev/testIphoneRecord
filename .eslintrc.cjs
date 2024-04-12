module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "react-app"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: { "react/react-in-jsx-scope": "off", "react/jsx-uses-react": "off", 'no-unused-vars': 'error', // Error for unused variables
    'no-extra-semi': 'error', // Error for extra semicolons
    'no-trailing-spaces': 'error',  },
  ignorePatterns: [
    "**/index.css",
  ],
};
