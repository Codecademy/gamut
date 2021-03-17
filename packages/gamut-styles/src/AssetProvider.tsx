import React from 'react';
import { Helmet } from 'react-helmet';

import { webFonts } from './remoteAssets/fonts';

export const createFontLinks = () => {
  const links: React.ReactNode[] = [];
  webFonts.forEach(({ filePath, extensions }) =>
    extensions.forEach((ext) =>
      links.push(
        <link
          key={`${filePath}-${ext}`}
          rel="preload"
          href={`${filePath}.${ext}`}
          crossOrigin="anonymous"
          as="font"
          type={`font/${ext}`}
        />
      )
    )
  );
  return links;
};

export const AssetProvider = () => {
  return <Helmet>{createFontLinks()}</Helmet>;
};

// required for lazy
export default AssetProvider;
