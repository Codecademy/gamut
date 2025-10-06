import { Theme } from '@emotion/react';
import * as React from 'react';

import { webFonts } from './remoteAssets/fonts';
import { coreTheme } from './themes';
import { FontConfig, getFonts } from './utils/fontUtils';

/*
 * Only preload woff2 fonts, since woff1 are only included as fallbacks.
 */
export const createFontLinks = (fonts?: readonly FontConfig[]) => {
  const currentFonts = fonts ?? webFonts.core;

  if (!Array.isArray(currentFonts)) {
    return [];
  }

  return currentFonts
    .filter(
      (f) =>
        f?.extensions &&
        Array.isArray(f.extensions) &&
        f.extensions.includes('woff2') &&
        f.filePath &&
        f.filePath.trim() !== ''
    )
    .map(({ filePath }) => (
      <link
        as="font"
        crossOrigin="anonymous"
        href={`${filePath}.woff2`}
        key={filePath}
        rel="preload"
        type="font/woff2"
      />
    ));
};

export const AssetProvider: React.FC<{ theme?: Theme }> = ({ theme }) => {
  try {
    const defaultTheme = theme ?? coreTheme;
    const themeName = defaultTheme?.name || 'core';
    const fonts = getFonts(themeName);

    return <>{createFontLinks(fonts)}</>;
  } catch (error) {
    // Handle font loading errors gracefully
    // eslint-disable-next-line no-console
    console.warn('Font loading failed:', error);
    return null;
  }
};
