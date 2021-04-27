'use strict';

module.exports = {
  root: true,
  extends: ['airbnb-base'],
  parserOptions: {
    sourceType: 'script',
  },
  env: {
    node: true,
  },
  rules: {
    strict: [2, 'global'],
    'prefer-destructuring': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.test.js',
        '**/__mocks__/*.js',
      ],
      extends: ['plugin:jest/all'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        'jest/globals': true,
      },
      rules: {
        'jest/require-top-level-describe': 0,
        'jest/no-hooks': 0,
        'jest/prefer-expect-assertions': 0,
      },
    },
  ],
};
