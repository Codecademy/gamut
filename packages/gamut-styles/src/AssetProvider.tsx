import { webFonts } from './remoteAssets/fonts';

/*
 * Only preload woff2 fonts, since woff1 are only included as fallbacks.
 */
export const createFontLinks = () =>
  webFonts
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

export const AssetProvider = () => {
  return <>{createFontLinks()}</>;
};
