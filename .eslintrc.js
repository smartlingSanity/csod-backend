module.exports = {
  extends: ["airbnb", "plugin:react-hooks/recommended"],
  rules: {
    "no-underscore-dangle": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": "off",
    "import/no-unresolved": [2, { "ignore": ["^(all|part):"] }]
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
};
