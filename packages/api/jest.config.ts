import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],

  testTimeout: 15000,

  // Test match patterns
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // Looks for any files inside __tests__ folders with .js, .jsx, .ts, or .tsx extensions
    "**/?(*.)+(spec|test).[tj]s?(x)", // Also catches any files with .spec.js, .test.js, .spec.ts, or .test.ts
  ],

  // Module file extensions for importing
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  // Setup file or environmental setup can be placed here if needed
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  globalSetup: "<rootDir>/src/jestGlobalSetup.ts",

  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/*.d.ts",
  ],
  coverageDirectory: "<rootDir>/coverage/",

  // Transform property if using Babel or TypeScript within the package
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  preset: "ts-jest",
  // Test environment, if not using JSDOM (the default), specify Node or another environment
  testEnvironment: "node",
};

export default config;
