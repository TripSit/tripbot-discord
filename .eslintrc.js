'use strict';

const path = require('path');

module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: path.resolve('./tsconfig.json'),
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      plugins: ['jest'],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ['./.eslintrc.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
  ],
};
