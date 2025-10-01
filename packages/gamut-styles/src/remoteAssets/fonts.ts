import { FontConfig } from '../utils/fontUtils';

export const FONT_ASSET_PATH = `https://www.codecademy.com/gamut`;

// woff2 should precede woff so that browsers try woff2 first.
const extensions = ['woff2', 'woff'];

export const core: readonly FontConfig[] = [
  {
    filePath: `${FONT_ASSET_PATH}/apercu-regular-pro`,
    extensions,
    name: 'Apercu',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-italic-pro`,
    extensions,
    name: 'Apercu',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-bold-pro`,
    extensions,
    name: 'Apercu',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/apercu-bold-italic-pro`,
    extensions,
    name: 'Apercu',
    weight: 'bold',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SuisseIntlMono-Bold-WebS`,
    extensions,
    name: 'Suisse',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SuisseIntlMono-Regular-WebS`,
    extensions,
    name: 'Suisse',
  },
];

export const percipio: readonly FontConfig[] = [
  {
    filePath: `${FONT_ASSET_PATH}/roboto-regular`,
    extensions,
    name: 'Roboto',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-italic`,
    extensions,
    name: 'Roboto',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold`,
    extensions,
    name: 'Roboto',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold-italic`,
    extensions,
    name: 'Roboto',
    weight: 'bold',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-mono-regular`,
    extensions,
    name: 'Roboto Mono',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-mono-bold`,
    extensions,
    name: 'Roboto Mono',
    weight: 'bold',
  },
];

export const webFonts = { core, percipio } as const;
