module.exports = {
  cache: true,
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  rules: {
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'shorthand-property-no-redundant-values': true,
    'value-no-vendor-prefix': true,
    'selector-max-type': [
      0,
      {
        ignore: ['descendant', 'child', 'next-sibling'],
        message:
          'Avoid using element type selectors if possible. If needed, they must be scoped to a class name.',
      },
    ],
    'declaration-block-no-shorthand-property-overrides': null,
    'no-descending-specificity': null,
    'property-no-unknown': null,
    'selector-pseudo-class-no-unknown': null,

    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'block-closing-brace-newline-after': null,
    'comment-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    'font-family-no-missing-generic-family-keyword': null,
    indentation: null,
    'rule-empty-line-before': null,
    'selector-combinator-space-before': null,
    'selector-descendant-combinator-no-non-space': null,
    'value-list-comma-newline-after': null,
  },
};
