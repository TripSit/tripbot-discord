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
  overrides: [
    {
      files: [
        '**/__tests__/*.test.ts',
        '**/__mocks__/*.ts',
      ],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/all',
      ],
      env: {
        'jest/globals': true,
      },
      rules: {
        'jest/require-top-level-describe': 0,
        'jest/no-hooks': 0,
      },
    },
  ],
};
