'use strict';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFileAfterEnv: ['./jest.setup.ts'],
};
