import { css, Global } from '@emotion/react';
import React from 'react';

export const FONT_ASSET_PATH = `https://static-assets.codecademy.com/gamut`;

export const webFonts = [
  {
    filePath: `${FONT_ASSET_PATH}/apercu-regular-pro`,
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
    rel: 'preload',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-italic-pro`,
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
    style: 'italic',
    rel: 'prefetch',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-bold-pro`,
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
    weight: 'bold',
    rel: 'preload',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-bold-italic-pro`,
    extensions: ['woff', 'woff2'],
    name: 'Apercu',
    weight: 'bold',
    style: 'italic',
    rel: 'prefetch',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SuisseIntlMono-Bold-WebS`,
    extensions: ['woff', 'woff2'],
    name: 'Suisse',
    weight: 'bold',
    rel: 'preload',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SuisseIntlMono-Regular-WebS`,
    extensions: ['woff', 'woff2'],
    name: 'Suisse',
    rel: 'prefetch',
  },
];

export const Fonts = () => (
  <Global
    styles={css(
      webFonts.map(
        ({
          name,
          style = 'normal',
          weight = 'normal',
          extensions,
          filePath,
        }) => css`
          @font-face {
            font-display: swap;
            font-family: '${name}';
            font-style: ${style};
            font-weight: ${weight};
            src: ${extensions
              .map((ext) => `url(${filePath}.${ext})`)
              .join(', ')};
          }
        `
      )
    )}
  />
);
