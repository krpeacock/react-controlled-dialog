module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Setup files after env
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],

  // Transform files
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },

  // Module file extensions
  moduleFileExtensions: ["js", "jsx", "json"],

  // Test match patterns
  testMatch: [
    "**/__tests__/**/*.(js|jsx)",
    "**/?(*.)+(spec|test).(js|jsx)"
  ]
};
