import { codecademyHtml } from '../../libs/services/languageIds';
import { EditorTheme } from '../../libs/theme/editorTheme';
import { EditorFontSize } from '../types';

const hiddenBracketLanguages = new Set<string | undefined>([codecademyHtml]);

export const autoCloseTokensOption = (autoCloseTokens: boolean | undefined) =>
  autoCloseTokens ? 'always' : 'never';

export const matchBracketsOption = (
  screenReader: boolean | undefined,
  languageId?: string
) =>
  screenReader || hiddenBracketLanguages.has(languageId) ? 'never' : 'near';

export const renderWhitespaceOption = (renderWhitespace: boolean) =>
  renderWhitespace ? 'all' : 'none';

export const themeOption = (highContrast: boolean) =>
  highContrast ? EditorTheme.highContrast : EditorTheme.dark;

export const wordWrapOption = (screenReader: boolean) =>
  screenReader ? 'off' : 'on';

export const fontSizeOption = (fontSize: EditorFontSize) => {
  switch (fontSize) {
    case 'lg':
      return 16;
    case 'xl':
      return 22;
    default:
      return 14;
  }
};

export const lineHeightOption = (fontSize: EditorFontSize) => {
  switch (fontSize) {
    case 'lg':
      return 26;
    case 'xl':
      return 30;
    default:
      return 24;
  }
};
