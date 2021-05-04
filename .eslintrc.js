'use strict';

module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json'
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
        '**/__tests__/*.ts',
        '**/__mocks__/*.ts',
      ],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/all',
      ],
      parserOptions: {
        project: './tsconfig.json'
      },
      env: {
        'jest/globals': true,
      },
      rules: {
        'jest/require-top-level-describe': 0,
        'jest/no-hooks': 0,
        'jest/prefer-expect-assertions': 0,
        'jest/no-disabled-tests': 0,
      },
    },
  ],
};
