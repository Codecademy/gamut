// DO NOT CHANGE ANYTHING HERE
// This file is part of the Codebytes MVP and only includes basic configuration around theming for the SimpleMonacoEditor component
// We are working on a monaco package in client-modules that has more configuration around themes and languages
// Monaco as a shared package RFC https://www.notion.so/codecademy/Monaco-editor-as-a-shared-package-1f4484db165b4abc8394c3556451ef6a

import { colors, editorColors } from '@codecademy/gamut-styles';

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

export const syntax = {
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
};

export const ui = {
  background: '#211E2F',
  text: darkTheme.white,
  indent: {
    active: '#393b41',
    inactive: '#494b51',
  },
};

export type SyntaxColors = typeof syntax;

export type UIColors = typeof ui;
