import { LanguageId } from '../../libs/services/languageIds';
import { EditorTheme } from '../../libs/theme/editorTheme';
import { EditorFontSize } from '../types';

const hiddenBracketLanguages = new Set<string | undefined>([LanguageId.Html]);

export const autoCloseTokensOption = (autoCloseTokens: boolean | undefined) =>
  autoCloseTokens ? 'always' : 'never';

export const matchBracketsOption = (
  screenReader: boolean | undefined,
  languageId?: string
) =>
  screenReader || hiddenBracketLanguages.has(languageId) ? 'never' : 'near';

export const renderWhitespaceOption = (renderWhitespace: boolean | undefined) =>
  renderWhitespace ? 'all' : 'none';

export const themeOption = (highContrast: boolean | undefined) =>
  highContrast ? EditorTheme.highContrast : EditorTheme.dark;

export const wordWrapOption = (screenReader: boolean | undefined) =>
  screenReader ? 'off' : 'on';

export const fontSizeOption = (fontSize: EditorFontSize | undefined) => {
  switch (fontSize) {
    case 'lg':
      return 16;
    case 'xl':
      return 22;
    default:
      return 14;
  }
};

export const lineHeightOption = (fontSize: EditorFontSize | undefined) => {
  switch (fontSize) {
    case 'lg':
      return 26;
    case 'xl':
      return 30;
    default:
      return 24;
  }
};
