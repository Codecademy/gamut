import { useState } from 'react';
import * as React from 'react';

import useLanguageService from '../libs/languageServices/useLanguageService';
import { SimpleMonacoEditor } from './SimpleMonacoEditor';
import { Editor, Monaco, MonacoFile } from './types';
import { useDeltaDecorations } from './useDeltaDecorations';

export type MonacoEditorProps = {
  className?: string;
  file: MonacoFile;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  file,
  onChange,
}) => {
  // TODO import editor theming and settings hooks

  const [editor, setEditor] = useState<Editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();
  const languageService = useLanguageService(file.name || '', editor, monaco);

  useDeltaDecorations(editor, languageService.registration);

  return (
    <SimpleMonacoEditor
      file={file}
      onChange={onChange}
      options={{}}
      setEditor={setEditor}
      setMonaco={setMonaco}
    />
  );
};
