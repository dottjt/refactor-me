module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  // setupFilesAfterEnv: [
  //   '<rootDir>/src/setupTests.js'
  // ],
  testMatch: [
    '<rootDir>/tests/**/*.{spec,api,test}.{js,ts}'
  ],
};