let ignorePatterns = ['./**/*.d.ts'];

if (process.env.NODE_ENV !== 'test') {
  ignorePatterns = [
    ...ignorePatterns,
    '**/*.(test|spec).ts{,.snap}',
    '**/*.(test|spec).tsx',
    '**/tests',
    '**/__tests__',
    '**/__mocks__',
    '**/__fixtures',
  ];
}

module.exports = {
  ignore: ignorePatterns,
};
