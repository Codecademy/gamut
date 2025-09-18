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

  return currentFonts
    .filter((f) => f.extensions.includes('woff2'))
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
  const defaultTheme = theme ?? coreTheme;
  const fonts = getFonts(defaultTheme?.name);

  return <>{createFontLinks(fonts)}</>;
};
