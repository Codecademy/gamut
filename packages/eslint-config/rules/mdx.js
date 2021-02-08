const mdxConfig = {
  plugins: ['unused-imports'],
  files: ['*.mdx'],
  parser: 'eslint-mdx',
  // Add this for MDX specifically since we rely on TS in other
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
};

module.exports = {
  // ensure that ts eslint parser only runs for the correct files
  overrides: [mdxConfig],
};
