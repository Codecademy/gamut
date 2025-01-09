import { webFonts } from './remoteAssets/fonts';

/*
 * Only preload woff2 fonts, since woff1 are only included as fallbacks.
 */
export const createFontLinks = () =>
  webFonts
    .filter((f) => f.extensions.includes('woff2'))
    .map(({ filePath }) => (
      <link
        key={filePath}
        rel="preload"
        href={`${filePath}.woff2`}
        crossOrigin="anonymous"
        as="font"
        type="font/woff2"
      />
    ));

export const AssetProvider = () => {
  return <>{createFontLinks()}</>;
};
