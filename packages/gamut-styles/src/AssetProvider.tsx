import { webFonts } from './remoteAssets/fonts';

export const createFontLinks = () =>
  webFonts.flatMap(({ filePath, extensions }) =>
    extensions.map((ext) => (
      <link
        key={`${filePath}-${ext}`}
        rel="preload"
        href={`${filePath}.${ext}`}
        crossOrigin="use-credentials"
        as="font"
        type={`font/${ext}`}
      />
    ))
  );

export const AssetProvider = () => {
  return <>{createFontLinks()}</>;
};
