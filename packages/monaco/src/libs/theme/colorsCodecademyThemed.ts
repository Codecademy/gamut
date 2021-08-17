import { platformTheme as theme } from '@codecademy/gamut-styles';

import { MonacoThemeColors } from './types';

const colorMode = 'dark';
const getColorValue = (color: keyof typeof theme.modes.dark) =>
  theme._getColorValue(theme.modes[colorMode][color]);

export const codecademyColors: MonacoThemeColors = {
  syntax: {
    attribute: getColorValue('editor-attribute'),
    annotation: getColorValue('editor-annotation'),
    atom: getColorValue('editor-atom'),
    basic: getColorValue('editor-basic'),
    comment: getColorValue('editor-comment'),
    constant: getColorValue('editor-constant'),
    decoration: getColorValue('editor-decoration'),
    invalid: getColorValue('editor-invalid'),
    key: getColorValue('editor-key'),
    keyword: getColorValue('editor-keyword'),
    number: getColorValue('editor-number'),
    operator: getColorValue('editor-operator'),
    predefined: getColorValue('editor-predefined'),
    property: getColorValue('editor-property'),
    regexp: getColorValue('editor-regexp'),
    string: getColorValue('editor-string'),
    tag: getColorValue('editor-tag'),
    text: getColorValue('editor-text'),
    value: getColorValue('editor-value'),
    variable: getColorValue('editor-variable'),
  },
  ui: {
    background: getColorValue('editor-ui-background'),
    text: getColorValue('editor-ui-text'),
    indentActive: getColorValue('editor-ui-indent-active'),
    indentInactive: getColorValue('editor-ui-indent-inactive'),
  },
};
