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
  rules: {
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-floating-promises': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.test.ts',
        '**/__mocks__/*.ts',
        'jest.setup.ts',
      ],
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
      files: ['**/__tests__/*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 0,
      },
    },
    {
      files: ['**/__mocks__/*.ts'],
      rules: {
        'max-classes-per-file': 0,
        'import/prefer-default-export': 0,
      },
    },
    {
      files: [
        '.eslintrc.js',
        'jest.config.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
  ],
};
