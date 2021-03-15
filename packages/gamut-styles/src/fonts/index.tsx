import { css, Global } from '@emotion/react';
import React from 'react';

const FONT_ASSET_PATH = `https://static-assets.codecademy.com/gamut`;

export const FONTS = [
  {
    filePath: '/apercu-regular-pro',
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
  },
  {
    filePath: '/apercu-italic-pro',
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
    style: 'italic',
  },
  {
    filePath: '/apercu-bold-pro',
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
    weight: 'bold',
  },
  {
    filePath: '/apercu-bold-italic-pro',
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
    weight: 'bold',
    style: 'italic',
  },
  {
    filePath: '/SuisseIntlMono-Bold-WebS',
    extensions: ['woff', 'woff2'],
    name: 'Suisse',
    weight: 'bold',
  },
  {
    filePath: '/SuisseIntlMono-Regular-WebS',
    extensions: ['woff', 'woff2'],
    name: 'Suisse',
  },
];

const fontFaces = css(
  FONTS.map(
    ({ name, style = 'normal', weight = 'normal', extensions, filePath }) => `
    @font-face {
      font-display: swap;
      font-family: '${name}';
      font-style: ${style};
      font-weight: ${weight};
      src: ${extensions
        .map((ext) => `url(${FONT_ASSET_PATH}${filePath}.${ext})`)
        .join(', ')};
    }
  `
  )
);

export const FontGlobals = () => <Global styles={fontFaces} />;

const createLinkProps = (url: string) => ({
  rel: 'preload',
  as: 'font',
  crossOrigin: 'anonymous',
  href: url,
  type: `font/${url.split('.')[1]}`,
});

export const createFontLinks = () => {
  const links: React.ReactNode[] = [];
  FONTS.forEach(({ filePath, extensions }) =>
    extensions.forEach((ext) =>
      links.push(
        <link
          key={`${filePath}-${ext}`}
          {...createLinkProps(`${FONT_ASSET_PATH}/${filePath}.${ext}`)}
        />
      )
    )
  );
  return links;
};
