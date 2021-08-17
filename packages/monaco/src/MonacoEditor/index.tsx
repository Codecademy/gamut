import React, { useState } from 'react';

import useLanguageService from '../libs/languageServices/useLanguageService';
import { LanguageId } from '../libs/services/languageIds';
import { createMonacoOptions } from './createMonacoOptions';
import { SimpleMonacoEditor } from './SimpleMonacoEditor';
import { Editor, EditorInterfaceSettings, Monaco, MonacoFile } from './types';
import { useDeltaDecorations } from './useDeltaDecorations';
import { useEditorSettings } from './useEditorSettings';
import { MonacoThemeType, useEditorTheming } from './useEditorTheming';

export type MonacoEditorProps = {
  className?: string;
  file: MonacoFile;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  theme?: MonacoThemeType;
  editorInterfaceSettings?: EditorInterfaceSettings;
  updateEditorInterfaceSettings?: (setting: string) => void;
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  className,
  file,
  onChange,
  readOnly,
  theme = MonacoThemeType.static,
  editorInterfaceSettings,
  updateEditorInterfaceSettings,
}) => {
  const [editor, setEditor] = useState<Editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();
  const languageService = useLanguageService(file.name || '', editor, monaco);

  useDeltaDecorations(editor, languageService.registration);
  useEditorTheming(
    editorInterfaceSettings,
    updateEditorInterfaceSettings,
    editor,
    monaco,
    theme
  );
  useEditorSettings(
    editorInterfaceSettings,
    updateEditorInterfaceSettings,
    editor,
    monaco
  );

  return (
    <SimpleMonacoEditor
      file={file}
      languageId={languageService.id || LanguageId.Default}
      onChange={onChange}
      options={{
        ...createMonacoOptions(
          className,
          editorInterfaceSettings,
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
