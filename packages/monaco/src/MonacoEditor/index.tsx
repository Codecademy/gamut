import React, { useState } from 'react';

import useLanguageService from '../libs/languageServices/useLanguageService';
import { SimpleMonacoEditor } from './SimpleMonacoEditor';
import { Editor, Monaco, MonacoFile, UserInterfaceSettings } from './types';
import { useDeltaDecorations } from './useDeltaDecorations';
import { MonacoThemeType, useEditorTheming } from './useEditorTheming';

export type MonacoEditorProps = {
  className?: string;
  file: MonacoFile;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  theme?: MonacoThemeType;
  userInterfaceSettings?: UserInterfaceSettings;
};

export const defaultUserInterfaceSettings: UserInterfaceSettings = {
  autoCloseTokens: true,
  editorFontSize: 'reg',
  highContrast: false,
  renderWhitespace: false,
  screenReader: false,
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  file,
  onChange,
  theme = MonacoThemeType.static,
  userInterfaceSettings,
}) => {
  // TODO import editor settings hook
  const [editor, setEditor] = useState<Editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();
  const languageService = useLanguageService(file.name || '', editor, monaco);

  useDeltaDecorations(editor, languageService.registration);
  useEditorTheming(
    userInterfaceSettings || defaultUserInterfaceSettings,
    editor,
    monaco,
    theme
  );

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
