module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@bundled-es-modules)',
  ],
  // Add the following lines to handle ESM syntax
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
  moduleNameMapper: {
    '^@bundled-es-modules/statuses/index-esm.js$': '<rootDir>/mocks/statusesMock.js',
    // Add more moduleNameMapper entries as needed
  },
  // Other Jest configurations...
};

