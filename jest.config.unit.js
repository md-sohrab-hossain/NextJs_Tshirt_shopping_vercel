//* www.thedreaming.org/2020/11/09/jest-for-web-projects/
const { resolve } = require('path');

http: module.exports = {
  rootDir: resolve(__dirname, '.'),
  modulePaths: ['<rootDir>/src'],
  roots: ['<rootDir>/src', '<rootDir>/src/components'],
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
  },
  testRegex: '\\.test\\.[jt]sx?$',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupEnzyme.js', '<rootDir>/node_modules/jest-enzyme/lib/index.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageReporters: ['json', 'text', 'clover', ['lcov', { projectRoot: '/' }], 'text-summary'],
};
