const baseConfig = (packageName: string, overrides: any) => {
  const baseCoveragePathIgnorePatterns = [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '/node_modules/',
    '/dist/',
    'packages/gamut-icons/dist/icons/',
    'packages/gamut-patterns/dist/patterns/',
  ];
  const mergedCoveragePathIgnorePatterns = [
    ...baseCoveragePathIgnorePatterns,
    ...(overrides.coveragePathIgnorePatterns || []),
  ];

  return {
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
    testPathIgnorePatterns: ['node_modules', 'dist'],
    ...overrides,
    coveragePathIgnorePatterns: mergedCoveragePathIgnorePatterns,
  };
};

export default baseConfig;
