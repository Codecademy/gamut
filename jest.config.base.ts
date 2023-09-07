const baseConfig = (packageName: string, overrides: Object) => ({
  displayName: packageName,
  preset: '../../jest.preset.js',
  clearMocks: true,
  coverageDirectory: process.env.CI
    ? `/tmp/test-results/jest/${packageName}`
    : `../../coverage/packages/${packageName}`,
  reporters: process.env.CI
    ? ['default', ['jest-junit', { outputName: `${packageName}-report.xml` }]]
    : ['default'],
  coverageReporters: ['json', 'text', 'clover'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$':
      '<rootDir>/../../script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/../../script/jest/styleMock',
  },
  transformIgnorePatterns: ['jest-runner'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  ...overrides,
});

export default baseConfig;
