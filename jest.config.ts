import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  collectCoverageFrom: [
    '**/*.{js,ts,jsx,tsx}',
    '!**/node_modules/**',
    '!**/components/common/layout/**',
    '!**/constants/**',
    '!**/mocks/**',
    '!**/styles/**',
    '!**/test/**',
    '!**/public/**',
    '!**/*.d.ts', // ignore all type annotation files
    '!**/types/index.ts', // ignore type annotation barrel file
    '!**/.*/**', // ignore all hidden and config files
    '!./*.{js,ts}', // ignore config files at root
    '!**/server/**',
    '!**/utils/trpc.ts',
  ],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
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
