module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
