import React from 'react';
import { Helmet } from 'react-helmet';

import { webFonts } from './remoteAssets/fonts';

export const createFontLinks = () =>
  webFonts.flatMap(({ filePath, extensions }) =>
    extensions.map((ext) => (
      <link
        key={`${filePath}-${ext}`}
        rel="preload"
        href={`${filePath}.${ext}`}
        crossOrigin="anonymous"
        as="font"
        type={`font/${ext}`}
      />
    ))
  );

export const AssetProvider = () => {
  return <Helmet>{createFontLinks()}</Helmet>;
};
