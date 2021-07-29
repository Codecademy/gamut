import { platformTheme as theme } from '@codecademy/gamut-styles';

import { MonacoThemeColors } from './types';

const colorMode = 'dark';
const { _getColorValue: getColorValue } = theme;

export const CodecademyColors: MonacoThemeColors = {
  syntax: {
    attribute: getColorValue(theme.modes[colorMode]['editor-attribute']),
    annotation: getColorValue(theme.modes[colorMode]['editor-annotation']),
    atom: getColorValue(theme.modes[colorMode]['editor-atom']),
    basic: getColorValue(theme.modes[colorMode]['editor-basic']),
    comment: getColorValue(theme.modes[colorMode]['editor-comment']),
    constant: getColorValue(theme.modes[colorMode]['editor-constant']),
    decoration: getColorValue(theme.modes[colorMode]['editor-decoration']),
    invalid: getColorValue(theme.modes[colorMode]['editor-invalid']),
    key: getColorValue(theme.modes[colorMode]['editor-key']),
    keyword: getColorValue(theme.modes[colorMode]['editor-keyword']),
    number: getColorValue(theme.modes[colorMode]['editor-number']),
    operator: getColorValue(theme.modes[colorMode]['editor-operator']),
    predefined: getColorValue(theme.modes[colorMode]['editor-predefined']),
    property: getColorValue(theme.modes[colorMode]['editor-property']),
    regexp: getColorValue(theme.modes[colorMode]['editor-regexp']),
    string: getColorValue(theme.modes[colorMode]['editor-string']),
    tag: getColorValue(theme.modes[colorMode]['editor-tag']),
    text: getColorValue(theme.modes[colorMode]['editor-text']),
    value: getColorValue(theme.modes[colorMode]['editor-value']),
    variable: getColorValue(theme.modes[colorMode]['editor-variable']),
  },
  ui: {
    background: getColorValue(theme.modes[colorMode]['editor-ui-background']),
    text: getColorValue(theme.modes[colorMode]['editor-ui-text']),
    indentActive: getColorValue(
      theme.modes[colorMode]['editor-ui-indent-active']
    ),
    indentInactive: getColorValue(
      theme.modes[colorMode]['editor-ui-indent-inactive']
    ),
  },
};
