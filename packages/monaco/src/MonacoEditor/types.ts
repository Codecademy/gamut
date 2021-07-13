export type { editor as Editor } from 'monaco-editor';
export type Monaco = typeof import('monaco-editor');

export type MonacoFile = {
  content?: string;
  name?: string;
};

export type UserInterfaceSettings = {
  highContrast: boolean;
  screenReader: boolean;
  autoCloseTokens: boolean;
  renderWhitespace: boolean;
  editorFontSize: EditorFontSize;
};

export type EditorFontSize = 'reg' | 'lg' | 'xl';
