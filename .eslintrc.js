'use strict';

module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
  },
  rules: {
    'prefer-destructuring': 0,
  },
};
