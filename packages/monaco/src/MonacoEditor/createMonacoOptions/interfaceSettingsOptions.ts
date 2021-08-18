import { EditorFontSize } from '../types';

export const autoCloseTokensOption = (autoCloseTokens?: boolean) =>
  autoCloseTokens ? 'always' : 'never';

export const matchBracketsOption = (screenReader?: boolean) =>
  screenReader ? 'never' : 'near';

export const renderWhitespaceOption = (renderWhitespace?: boolean) =>
  renderWhitespace ? 'all' : 'none';

export const wordWrapOption = (screenReader?: boolean) =>
  screenReader ? 'off' : 'on';

export const fontSizeOption = (fontSize?: EditorFontSize) => {
  switch (fontSize) {
    case 'lg':
      return 16;
    case 'xl':
      return 22;
    default:
      return 14;
  }
};

export const lineHeightOption = (fontSize?: EditorFontSize) => {
  switch (fontSize) {
    case 'lg':
      return 26;
    case 'xl':
      return 30;
    default:
      return 24;
  }
};
