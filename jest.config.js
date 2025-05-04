export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/src/__mocks__/svgMock.js' // Add SVG mock
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js' // Add SVG transform
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Add testing library setup
  testPathIgnorePatterns: ['/node_modules/'],
};