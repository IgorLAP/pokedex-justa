module.exports = {
  testPathIgnorePatterns: ["/node_modules", "/.vscode"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  // babel-jest transpiling ts in js for testing
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  // library 'identity-obj-proxy' handles non transpillable to js files
  moduleNameMapper: {
    "\\.(scss|css|sass|jpg|png|jpeg)$": "identity-obj-proxy",
    "\\.svg$": "jest-svg-transformer",
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/App.tsx",
    "!src/main.tsx",
    "!src/components/Configuration/*.tsx",
  ],
  coverageReporters: ["lcov", "json"],
};
