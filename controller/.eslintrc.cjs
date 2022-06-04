module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  parser: '@babel/eslint-parser',
  rules: {
    'import/extensions': 0,
    'import/no-cycle': 0,
  },
};
