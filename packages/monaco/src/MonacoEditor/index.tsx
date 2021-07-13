import React, { useState } from 'react';

import useLanguageService from '../libs/languageServices/useLanguageService';
import { codecademyDefault } from '../libs/services/languageIds';
import { createMonacoOptions } from './createMonacoOptions';
import { SimpleMonacoEditor } from './SimpleMonacoEditor';
import { Editor, Monaco, MonacoFile, UserInterfaceSettings } from './types';
import { useDeltaDecorations } from './useDeltaDecorations';
import { useEditorSettings } from './useEditorSettings';
import { MonacoThemeType, useEditorTheming } from './useEditorTheming';

export type MonacoEditorProps = {
  className?: string;
  file: MonacoFile;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  theme?: MonacoThemeType;
  userInterfaceSettings?: UserInterfaceSettings;
  updateUserInterfaceSettings?: (setting: string) => void;
};

export const defaultEditorInterfaceSettings: UserInterfaceSettings = {
  autoCloseTokens: true,
  editorFontSize: 'reg',
  highContrast: false,
  renderWhitespace: false,
  screenReader: false,
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  className,
  file,
  onChange,
  readOnly,
  theme = MonacoThemeType.static,
  userInterfaceSettings,
  updateUserInterfaceSettings,
}) => {
  const [editor, setEditor] = useState<Editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();
  const languageService = useLanguageService(file.name || '', editor, monaco);

  useDeltaDecorations(editor, languageService.registration);
  useEditorTheming(
    userInterfaceSettings || defaultEditorInterfaceSettings,
    updateUserInterfaceSettings,
    editor,
    monaco,
    theme
  );
  useEditorSettings(
    userInterfaceSettings || defaultEditorInterfaceSettings,
    updateUserInterfaceSettings,
    editor,
    monaco
  );

  return (
    <SimpleMonacoEditor
      file={file}
      languageId={languageService.id || codecademyDefault}
      onChange={onChange}
      options={{
        ...createMonacoOptions(
          className,
          userInterfaceSettings || defaultEditorInterfaceSettings,
          languageService.id
        ),
        readOnly,
        ariaLabel: file.name,
      }}
      setEditor={setEditor}
      setMonaco={setMonaco}
    />
  );
};
