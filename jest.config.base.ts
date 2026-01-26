import type { Config } from 'jest';
import path from 'node:path';

const COVERAGE_PATH_IGNORE_PATTERNS = [
  '<rootDir>/node_modules/',
  '<rootDir>/dist/',
  '/node_modules/',
  '/dist/',
  'packages/gamut-icons/dist/icons/',
  'packages/gamut-patterns/dist/patterns/',
];

const baseConfig = (packageName: string, overrides: Config): Config => {
  const outputDirectory = path.join(__dirname, `coverage/${packageName}`);
  return {
    displayName: packageName,
    preset: '../../jest.preset.js',
    clearMocks: true,
    coverageDirectory: outputDirectory,
    coverageReporters: process.env.CI ? ['clover', 'json', 'lcov', 'text'] : ['html', 'text'],
    reporters: process.env.CI
      ? [
          'default',
          'github-actions',
          ['jest-junit', { addFileAttribute: true, outputDirectory }],
        ]
      : ['default'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$':
        '<rootDir>/../../script/jest/fileMock',
      '\\.(css|scss)$': '<rootDir>/../../script/jest/styleMock',
    },
    testPathIgnorePatterns: ['node_modules', 'dist'],
    ...overrides,
    coveragePathIgnorePatterns: [
      ...COVERAGE_PATH_IGNORE_PATTERNS,
      ...overrides.coveragePathIgnorePatterns ?? [],
    ],
  };
};

export default baseConfig;
