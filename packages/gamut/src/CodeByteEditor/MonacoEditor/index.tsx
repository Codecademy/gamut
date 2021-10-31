// DO NOT CHANGE ANYTHING HERE
// This component is part of the Codebytes MVP and only includes basic configuration around theming
// We are working on a monaco package in client-modules that has more configuration around themes and languages
// Monaco as a shared package RFC https://www.notion.so/codecademy/Monaco-editor-as-a-shared-package-1f4484db165b4abc8394c3556451ef6a

import loadable from '@loadable/component';
import React, { useCallback, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import ResizeObserver from 'react-resize-observer';

import { dark } from './theme';
import { Monaco } from './types';

const ReactMonacoEditor = loadable(() => import('react-monaco-editor'));

export type SimpleMonacoEditorProps = {
  value: string;
  language: string;
  onChange?: (value: string) => void;
};

export const SimpleMonacoEditor: React.FC<SimpleMonacoEditorProps> = ({
  value,
  language,
  onChange,
}) => {
  const editorRef = useRef<MonacoEditor>(null);
  const editorWillMount = useCallback((monaco: Monaco) => {
    monaco.editor.defineTheme('dark', dark);
    monaco.editor.setTheme('dark');
  }, []);
  return (
    <>
      <ResizeObserver
        onResize={({ height, width }) => {
          editorRef.current?.editor?.layout({
            height,
            width,
          });
        }}
      />
      <ReactMonacoEditor
        ref={editorRef}
        editorWillMount={editorWillMount}
        onChange={onChange}
        options={{ minimap: { enabled: false } }}
        theme="dark"
        value={value}
        language={language}
      />
    </>
  );
};
