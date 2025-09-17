import { FontConfig } from '../utils/fontUtils';

export const FONT_ASSET_PATH = `https://www.codecademy.com/gamut`;

// woff2 should precede woff so that browsers try woff2 first.
export const core: readonly FontConfig[] = [
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

export const percipio: readonly FontConfig[] = [
  {
    filePath: `${FONT_ASSET_PATH}/roboto-regular`,
    extensions: ['woff2', 'woff'],
    name: 'Roboto',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-italic`,
    extensions: ['woff2', 'woff'],
    name: 'Roboto',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold`,
    extensions: ['woff2', 'woff'],
    name: 'Roboto',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold-italic`,
    extensions: ['woff2', 'woff'],
    name: 'Roboto',
    weight: 'bold',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-mono-regular`,
    extensions: ['woff2', 'woff'],
    name: 'Roboto Mono',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-mono-bold`,
    extensions: ['woff2', 'woff'],
    name: 'Roboto Mono',
    weight: 'bold',
  },
];

export const webFonts = { core, percipio } as const;
