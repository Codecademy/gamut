import cx from 'classnames';
import type { editor } from 'monaco-editor';

import { UserInterfaceSettings } from '../types';
import {
  autoCloseTokensOption,
  fontSizeOption,
  lineHeightOption,
  matchBracketsOption,
  renderWhitespaceOption,
  themeOption,
  wordWrapOption,
} from './interfaceSettingsOptions';
import styles from './styles.module.scss';

export const createMonacoOptions = (
  className: string | undefined,
  interfaceSettings: UserInterfaceSettings,
  languageId?: string
): editor.IStandaloneEditorConstructionOptions => {
  return {
    acceptSuggestionOnCommitCharacter: false,
    acceptSuggestionOnEnter: 'off',
    autoClosingBrackets: autoCloseTokensOption(
      interfaceSettings.autoCloseTokens
    ),
    autoClosingQuotes: autoCloseTokensOption(interfaceSettings.autoCloseTokens),
    codeLens: false,
    colorDecorators: false,
    contextmenu: false,
    detectIndentation: false,
    extraEditorClassName: cx(styles.editor, className),
    find: {
      addExtraSpaceOnTop: false,
    },
    fontFamily:
      "Monaco, Menlo, 'Ubuntu Mono', 'Droid Sans Mono', Consolas, monospace",
    fontSize: fontSizeOption(interfaceSettings.editorFontSize),
    glyphMargin: true,
    highlightActiveIndentGuide: false,
    lightbulb: {
      enabled: false,
    },
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    lineHeight: lineHeightOption(interfaceSettings.editorFontSize),
    matchBrackets: matchBracketsOption(
      interfaceSettings.screenReader,
      languageId
    ),
    minimap: {
      enabled: false,
    },
    occurrencesHighlight: false,
    quickSuggestions: false,
    renderIndentGuides: false,
    renderLineHighlight: 'none',
    renderWhitespace: renderWhitespaceOption(
      interfaceSettings.renderWhitespace
    ),
    scrollbar: {
      verticalScrollbarSize: 6,
    },
    scrollBeyondLastLine: false,
    selectionHighlight: false,
    showFoldingControls: 'always',
    showUnused: false,
    suggest: {
      showClasses: false,
      showColors: false,
      showConstants: false,
      showConstructors: false,
      showEnumMembers: false,
      showEnums: false,
      showEvents: false,
      showFields: false,
      showFiles: false,
      showFolders: false,
      showFunctions: false,
      showIcons: false,
      showInterfaces: false,
      showKeywords: false,
      showMethods: false,
      showModules: false,
      showOperators: false,
      showProperties: false,
      showReferences: false,
      showSnippets: false,
      showStructs: false,
      showTypeParameters: false,
      showUnits: false,
      showValues: false,
      showVariables: false,
      showWords: false,
    },
    tabSize: 2,
    theme: themeOption(interfaceSettings.highContrast),
    wordBasedSuggestions: false,
    wordWrap: wordWrapOption(interfaceSettings.screenReader),
  };
};
