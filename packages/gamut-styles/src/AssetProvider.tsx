import { Theme } from '@emotion/react';
import * as React from 'react';

import { webFonts } from './remoteAssets/fonts';

/*
 * Only preload woff2 fonts, since woff1 are only included as fallbacks.
 */
export const createFontLinks = (
  fonts: typeof webFonts.core | typeof webFonts.percipio
) =>
  fonts
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

export const AssetProvider: React.FC<{ theme: Theme }> = ({ theme }) => {
  // Determine which fonts to use based on theme name
  const fonts =
    !theme?.name || !(theme.name in webFonts)
      ? webFonts.core
      : webFonts[theme.name as keyof typeof webFonts];

  return <>{createFontLinks(fonts)}</>;
};
