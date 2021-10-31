// DO NOT CHANGE ANYTHING HERE
// This file is part of the Codebytes MVP and only includes basic configuration around theming for the SimpleMonacoEditor component
// We are working on a monaco package in client-modules that has more configuration around themes and languages
// Monaco as a shared package RFC https://www.notion.so/codecademy/Monaco-editor-as-a-shared-package-1f4484db165b4abc8394c3556451ef6a

import type * as monaco from 'monaco-editor';

import * as darkColors from './colorsDark';

const c = (color: string) => color.substr(1);

const theme = ({
  ui,
  syntax,
}: {
  ui: darkColors.UIColors;
  syntax: darkColors.SyntaxColors;
}): monaco.editor.IStandaloneThemeData => ({
  base: 'vs-dark',
  inherit: true,
  rules: [
    // Base
    { token: '', foreground: c(syntax.basic) },
    { token: 'regexp', foreground: c(syntax.regexp) },
    { token: 'annotation', foreground: c(syntax.annotation) },
    { token: 'type', foreground: c(syntax.annotation) },
    { token: 'doctype', foreground: c(syntax.comment) },
    { token: 'delimiter', foreground: c(syntax.decoration) },
    { token: 'invalid', foreground: c(syntax.invalid) },
    { token: 'emphasis', fontStyle: 'italic' },
    { token: 'strong', fontStyle: 'bold' },
    { token: 'variable', foreground: c(syntax.variable) },
    { token: 'variable.predefined', foreground: c(syntax.variable) },
    { token: 'constant', foreground: c(syntax.constant) },
    { token: 'comment', foreground: c(syntax.comment) },
    { token: 'number', foreground: c(syntax.number) },
    { token: 'number.hex', foreground: c(syntax.number) },
    { token: 'keyword.directive', foreground: c(syntax.comment) },
    { token: 'include', foreground: c(syntax.comment) },
    { token: 'key', foreground: c(syntax.property) },
    { token: 'attribute.name', foreground: c(syntax.attribute) },
    { token: 'attribute.name-numeric', foreground: c(syntax.string) },
    { token: 'attribute.value', foreground: c(syntax.property) },
    { token: 'attribute.value.number', foreground: c(syntax.number) },
    { token: 'string', foreground: c(syntax.string) },
    { token: 'string.yaml', foreground: c(syntax.string) },
    { token: 'tag', foreground: c(syntax.tag) },
    { token: 'tag.id.jade', foreground: c(syntax.tag) },
    { token: 'tag.class.jade', foreground: c(syntax.tag) },
    { token: 'metatag', foreground: c(syntax.comment) },
    { token: 'attribute.value.unit', foreground: c(syntax.string) },
    { token: 'keyword', foreground: c(syntax.keyword) },
    { token: 'keyword.flow', foreground: c(syntax.keyword) },
  ],
  colors: {
    'editor.background': ui.background,
    'editor.foreground': ui.text,
    'editorIndentGuide.background': ui.indent.inactive,
    'editorIndentGuide.activeBackground': ui.indent.active,
    'editorWhitespace.foreground': syntax.comment,
  },
});

export const dark = theme(darkColors);
