import { Theme } from '@emotion/react';
import * as React from 'react';

import { FontConfig, getFonts } from './utils/fontUtils';

type NamedTheme = Theme & { name?: string };

/*
 * Only preload woff2 fonts, since woff1 are only included as fallbacks.
 */
export const createFontLinks = (fonts: readonly FontConfig[]) =>
  fonts
    .filter((f: FontConfig) => f.extensions.includes('woff2'))
    .map(({ filePath }: FontConfig) => (
      <link
        as="font"
        crossOrigin="anonymous"
        href={`${filePath}.woff2`}
        key={filePath}
        rel="preload"
        type="font/woff2"
      />
    ));

export const AssetProvider: React.FC<{ theme: NamedTheme }> = ({ theme }) => {
  const fonts = getFonts(theme?.name);

  return <>{createFontLinks(fonts)}</>;
};
