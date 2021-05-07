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
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: false }],
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
        '@typescript-eslint/unbound-method': 0,
      },
    },
    {
      files: [
        '.eslintrc.js',
        'jest.config.js',
      ],
      extends: [
        'eslint:recommended',
      ],
      parser: 'esprima',
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
  ],
};
