'use strict';

const path = require('path');

const BASE_EXTENDS = [
  'airbnb-typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
];

const BASE_RULES = {
  '@typescript-eslint/no-misused-promises': 0,
  '@typescript-eslint/no-floating-promises': 0,
  '@typescript-eslint/lines-between-class-members': 0,
  '@typescript-eslint/unbound-method': 0,
};

module.exports = {
  root: true,
  extends: BASE_EXTENDS,
  parserOptions: {
    project: path.resolve('./tsconfig.eslint.json'),
  },
  env: {
    node: true,
  },
  rules: BASE_RULES,
  overrides: [
    {
      files: [
        '**/__tests__/*.test.ts',
        '**/__mocks__/*.ts',
        'jest.*.ts',
      ],
      plugins: ['jest'],
      extends: BASE_EXTENDS.concat('plugin:jest/recommended'),
      env: {
        jest: true,
      },
      rules: BASE_RULES,
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
