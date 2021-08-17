import { useEffect } from 'react';

import {
  autoCloseTokensOption,
  fontSizeOption,
  lineHeightOption,
  renderWhitespaceOption,
  wordWrapOption,
} from '../createMonacoOptions/interfaceSettingsOptions';
import { transmitKeyboardEvents } from '../transmitKeyboardEvents';
import { TransmitEditor } from '../transmitKeyboardEvents/resolveMonacoKeyboardEvent';
import { Editor, EditorInterfaceSettings, Monaco } from '../types';

export const useEditorSettings = (
  userInterfaceSettings: EditorInterfaceSettings,
  updateUserInterfaceSettings?: (setting: string) => void,
  editor?: Editor.IStandaloneCodeEditor,
  monaco?: Monaco
) => {
  const {
    editorFontSize,
    screenReader,
    renderWhitespace,
    autoCloseTokens,
  } = userInterfaceSettings;

  useEffect(() => {
    if (!editor || !monaco) {
      return;
    }

    // Sometimes, Monaco thinks it should surface JavaScript syntax complaints,
    // despite us not having JS syntax validation... Very annoying.
    // LX-3761 is a sad history of our valiant efforts to tell it otherwise.
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSyntaxValidation: true,
    });

    // Ignore errors related to import statements. Monaco does not know about
    // all of the files in the workspace so it throws an error whenever import
    // statements are made.
    // TODO: load all the files from the workspace and provide them to Monaco?
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [2307],
    });

    // Provide default typescript compiler options that match our typescript courses' tsconfig.json.
    // This will allow learners to see the correct ts errors in Monaco.
    // TODO: read the tsconfig.json from the workspace and use it if it exists
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      strictNullChecks: true,
      target: monaco.languages.typescript.ScriptTarget.ES2017,
    });

    // TODO add action to toggle screenreader mode on
    // Add an action to toggle "screenreader" mode, which changes the base options
    // the monaco editor is initialized with
    editor.addAction({
      id: 'a11y-screenreader-mode',
      label: 'Toggle Screenreader Mode',
      run: () => {
        if (updateUserInterfaceSettings) {
          updateUserInterfaceSettings('screenReader');
        }
      },
    });

    // Add Cmd+Shift+P as alternate shortcut to open Command Palette
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_P,
      () => {
        editor.trigger('shortcut', 'editor.action.quickCommand', '');
      }
    );

    transmitKeyboardEvents(editor as TransmitEditor, monaco.KeyCode, document);
  }, [updateUserInterfaceSettings, editor, monaco]);

  // We intentionally don't re-initialize Monaco in React land for performance,
  // so we have to imperatively set options updates here
  useEffect(() => {
    editor?.updateOptions({
      wordWrap: wordWrapOption(screenReader),
    });
  }, [editor, screenReader]);

  useEffect(() => {
    editor?.updateOptions({
      renderWhitespace: renderWhitespaceOption(renderWhitespace),
    });
  }, [editor, renderWhitespace]);

  useEffect(() => {
    editor?.updateOptions({
      autoClosingBrackets: autoCloseTokensOption(autoCloseTokens),
      autoClosingQuotes: autoCloseTokensOption(autoCloseTokens),
    });
  }, [editor, autoCloseTokens]);

  useEffect(() => {
    editor?.updateOptions({
      fontSize: fontSizeOption(editorFontSize),
      lineHeight: lineHeightOption(editorFontSize),
    });
  }, [editor, editorFontSize]);
};
