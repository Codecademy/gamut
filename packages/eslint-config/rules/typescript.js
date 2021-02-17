/**
 * ESLINT_FIX_ONLY is set by the eslint-fix script to disable slow parsing that isn't necessary for autofixing
 */
const ESLINT_FIX_ONLY = process.env.ESLINT_FIX_ONLY === 'true';

const tsConfig = {
  // ensure that ts eslint parser only runs for the correct files
  files: ['*.tsx', '*.ts'],
  parser: require.resolve('@typescript-eslint/parser'),
  rules: {
    // These rules could be useful, but we haven't gotten around to trying them out
    // Additionally, they're moved into this override object (further nested from the rules
    // key down lower in the file), because as a result of the `extends` command pulling
    // in additional plugins, the base rules settings of turning this rules off were NOT
    // being respected. By moving them into this override definition, they are properly
    // being applied to subsequent plugin imports/extensions. Wild.
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'import/export': 'off',
    'import/no-named-as-default': 'off',
    'no-restricted-globals': 'off',
    'no-undef': 'off',
    'react/forbid-prop-types': 'off',
  },
};

if (!ESLINT_FIX_ONLY) {
  tsConfig.parserOptions = {
    project: './tsconfig.json',
    sourceType: 'module',
  };
  tsConfig.extends = [
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ];
}

module.exports = {
  overrides: [tsConfig],
};
