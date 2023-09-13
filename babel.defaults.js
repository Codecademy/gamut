let ignorePatterns = [];

if (process.env.NODE_ENV !== 'test') {
  ignorePatterns = [
    ...ignorePatterns,
    '**/*.(test|spec).ts{,.snap}',
    '**/*.(test|spec).tsx',
    '**/tests/**/*',
    '**/__tests__/**/*',
    '**/__mocks__/**/*',
    '**/__fixtures__/**/*',
    './**/*.d.ts',
  ];
}

module.exports = {
  ignore: ignorePatterns,
};
