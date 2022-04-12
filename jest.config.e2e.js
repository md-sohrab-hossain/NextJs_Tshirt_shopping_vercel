module.exports = {
  preset: 'jest-puppeteer',
  roots: ['<rootDir>'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  testRegex: '\\.e2e-test\\.[js]sx?$',
  globals: {
    URL: 'http://localhost:3000',
  },
  testTimeout: 50000,
  verbose: true,
};
