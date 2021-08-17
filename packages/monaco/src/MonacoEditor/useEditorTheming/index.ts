import { useEffect, useState } from 'react';

import { Monaco } from '../../libs/languageServices/types';
import { codecademyTheme, darkTheme } from '../../libs/theme';
import { EditorTheme } from '../../libs/theme/editorTheme';
import { Editor, EditorInterfaceSettings } from '../types';

export enum MonacoThemeType {
  // 'static' here refers to the legacy LE monaco theme, which is a set mapping
  // of colors, whereas 'dynamic' refers to a mapping that will change based on
  // the learner's settings. E.g., dark mode vs light mode.
  static = 'static',
  dynamic = 'dynamic',
}

export const useEditorTheming = (
  interfaceSettings?: EditorInterfaceSettings,
  updateEditorInterfaceSettings?: (setting: string) => void,
  editor?: Editor.IStandaloneCodeEditor,
  monaco?: Monaco,
  themeType: MonacoThemeType = MonacoThemeType.static
) => {
  const [, setThemeDefined] = useState(false);

  useEffect(() => {
    if (!monaco) {
      return;
    }

    if (interfaceSettings?.highContrast) {
      monaco.editor.setTheme(EditorTheme.highContrast);
      return;
    }

    setThemeDefined((themeDefined) => {
      if (!themeDefined) {
        monaco.editor.defineTheme(
          EditorTheme.dark,
          themeType === MonacoThemeType.static ? darkTheme : codecademyTheme
        );
      }

      monaco.editor.setTheme(EditorTheme.dark);
      return true;
    });
  }, [interfaceSettings?.highContrast, monaco, themeType]);

  // We're overriding the monaco native toggleHighContrast action here.
  // The original toggleHighContrastAction can be obtained by
  // using editor.getAction('editor.action.toggleHighContrast').
  useEffect(() => {
    editor?.addAction({
      id: 'editor.action.toggleHighContrast',
      label: 'Toggle High Contrast Theme',
      run: () => {
        if (updateEditorInterfaceSettings) {
          updateEditorInterfaceSettings('highContrast');
        }
      },
    });
  }, [updateEditorInterfaceSettings, editor]);
};
