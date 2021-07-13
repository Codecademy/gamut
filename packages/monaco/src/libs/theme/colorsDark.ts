import { colors, editorColors } from '@codecademy/gamut-styles';

import { MonacoThemeColors } from './types';

const darkTheme = {
  blue: editorColors.blue,
  deepPurple: editorColors.deepPurple,
  gray: editorColors.gray,
  green: editorColors.green,
  orange: editorColors.orange,
  purple: editorColors.purple,
  red: editorColors.red,
  white: colors.white,
  yellow: editorColors.yellow,
};

export const darkColors: MonacoThemeColors = {
  syntax: {
    attribute: darkTheme.green,
    annotation: darkTheme.red,
    atom: darkTheme.deepPurple,
    basic: darkTheme.white,
    comment: darkTheme.gray,
    constant: darkTheme.orange,
    decoration: darkTheme.red,
    invalid: darkTheme.red,
    key: darkTheme.blue,
    keyword: darkTheme.purple,
    number: darkTheme.red,
    operator: darkTheme.red,
    predefined: darkTheme.white,
    property: darkTheme.red,
    regexp: darkTheme.green,
    string: darkTheme.yellow,
    tag: darkTheme.red,
    text: darkTheme.orange,
    value: darkTheme.yellow,
    variable: darkTheme.green,
  },

  ui: {
    background: '#211E2F',
    text: darkTheme.white,
    indentActive: '#393b41',
    indentInactive: '#494b51',
  },
};
