import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  collectCoverageFrom: [
    '**/*.{js,ts,jsx,tsx}',
    '!**/node_modules/**',
    '!**/constants/**',
    '!**/mocks/**',
    '!**/styles/**',
    '!**/test/**',
    '!**/public/**',
    '!**/*.d.ts',
    '!**/types/index.ts',
    '!**/.*/**',
    '!./*.{js,ts}',
  ],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: -20,
    },
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/./$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup-tests.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
