// jest.config.js
export default {
  preset: 'vite-jest',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  testEnvironment: 'jsdom',
}