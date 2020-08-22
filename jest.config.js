module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupTests.ts'
  ],
  testMatch: [
    '<rootDir>/tests/**/*.{spec,api,test}.{js,ts}'
  ],
};