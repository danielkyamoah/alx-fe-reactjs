module.exports = {

  testEnvironment: 'jsdom',


  clearMocks: true,


  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],


  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};