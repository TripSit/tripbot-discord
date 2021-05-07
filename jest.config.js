'use strict';

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.tsx?$',
  moduleFileExtensions: ['ts', 'js', 'json'],
};
