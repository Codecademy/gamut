const baseConfig = (packageName: string, overrides: Object) => ({
  displayName: packageName,
  preset: '../../jest.preset.js',
  clearMocks: true,
  coverageDirectory: process.env.CI
    ? `/tmp/test-results/jest/${packageName}`
    : `../../coverage/packages/${packageName}`,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$':
      '<rootDir>/../../script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/../../script/jest/styleMock',
  },
  transformIgnorePatterns: ['jest-runner', '^.+\\.d\\.ts$'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  ...overrides,
});

export default baseConfig;
