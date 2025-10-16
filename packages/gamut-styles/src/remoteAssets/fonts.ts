import { FontConfig } from '../utils/fontUtils';

export const FONT_ASSET_PATH = `https://www.codecademy.com/gamut`;

// woff2 should precede woff so that browsers try woff2 first.
const extensions = ['woff2', 'woff'];

export const core: readonly FontConfig[] = [
  {
    filePath: `${FONT_ASSET_PATH}/hanken-grotesk-regular`,
    extensions,
    name: 'Hanken Grotesk',
  },
  {
    filePath: `${FONT_ASSET_PATH}/hanken-grotesk-italic`,
    extensions,
    name: 'Hanken Grotesk',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/hanken-grotesk-bold`,
    extensions,
    name: 'Hanken Grotesk',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/hanken-grotesk-bold-italic`,
    extensions,
    name: 'Hanken Grotesk',
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
  // The default weight for bold fonts is 700, Percipio uses 500 for the base bold
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold`,
    extensions,
    name: 'Roboto',
    weight: 'bold',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold`,
    extensions,
    name: 'Roboto',
    weight: 500,
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold-italic`,
    extensions,
    name: 'Roboto',
    weight: 'bold',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/roboto-bold-italic`,
    extensions,
    name: 'Roboto',
    weight: 500,
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
