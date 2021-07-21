module.exports = {
  preset: "ts-jest", // ts-jest/presets/default-esm
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^types/(.*)$": "<rootDir>/types/$1",
  },
};
