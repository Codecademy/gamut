export const FONT_ASSET_PATH = `https://www.codecademy.com/gamut`;

// woff2 should precede woff so that browsers try woff2 first.

export const webFonts = [
  {
    filePath: `${FONT_ASSET_PATH}/apercu-regular-pro`,
    extensions: ['woff2', 'woff'],
    name: 'Apercu',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-italic-pro`,
    extensions: ['woff2', 'woff'],
    name: 'Apercu',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-bold-pro`,
    extensions: ['woff2', 'woff'],
    name: 'Apercu',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-bold-italic-pro`,
    extensions: ['woff2', 'woff'],
    name: 'Apercu',
    weight: 'bold',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SuisseIntlMono-Bold-WebS`,
    extensions: ['woff2', 'woff'],
    name: 'Suisse',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SuisseIntlMono-Regular-WebS`,
    extensions: ['woff2', 'woff'],
    name: 'Suisse',
  },
];
