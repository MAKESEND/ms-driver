import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/./$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
