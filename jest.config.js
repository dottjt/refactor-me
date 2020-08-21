module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src'
  ],
  // setupFilesAfterEnv: [
  //   '<rootDir>/src/setupTests.js'
  // ],
  testMatch: [
    '<rootDir>/src/**/*.{spec,api,test}.{js,ts}'
  ],
};