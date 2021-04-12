export type { editor as Editor } from 'monaco-editor';
export type Monaco = typeof import('monaco-editor');

export type MonacoFile = {
  content?: string;
  name?: string;
};
