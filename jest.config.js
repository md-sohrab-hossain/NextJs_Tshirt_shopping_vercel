module.exports = {
  preset: "jest-puppeteer",
  roots: ["<rootDir>"],
  moduleDirectories: ["src", "node_modules"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  transformIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  testMatch: ["**/tests/**/*.[jt]s?(x)?", "**/?(*.)+(e2e).[jt]s?(x)?"],
  globals: {
    URL: "http://localhost:3000",
  },
  testTimeout: 50000,
  verbose: true,
};
