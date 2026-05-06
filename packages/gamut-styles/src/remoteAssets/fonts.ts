import { FontConfig } from '../utilities/fontUtils';

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

/**
 * LX Studio: Skillsoft Sans (accent) + Skillsoft Text (base).
 * Weights 400 / 500 / 700 + italics; 500 uses Medium files for title/bold tokens.
 */
export const lxStudio: readonly FontConfig[] = [
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftText-Regular`,
    extensions,
    name: 'Skillsoft Text',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftText-RegularItalic`,
    extensions,
    name: 'Skillsoft Text',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftText-Medium`,
    extensions,
    name: 'Skillsoft Text',
    weight: 500,
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftText-MediumItalic`,
    extensions,
    name: 'Skillsoft Text',
    weight: 500,
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftText-Bold`,
    extensions,
    name: 'Skillsoft Text',
    weight: 700,
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftText-BoldItalic`,
    extensions,
    name: 'Skillsoft Text',
    weight: 700,
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftSans-Regular`,
    extensions,
    name: 'Skillsoft Sans',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftSans-RegularItalic`,
    extensions,
    name: 'Skillsoft Sans',
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftSans-Medium`,
    extensions,
    name: 'Skillsoft Sans',
    weight: 500,
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftSans-MediumItalic`,
    extensions,
    name: 'Skillsoft Sans',
    weight: 500,
    style: 'italic',
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftSans-Bold`,
    extensions,
    name: 'Skillsoft Sans',
    weight: 700,
  },
  {
    filePath: `${FONT_ASSET_PATH}/SkillsoftSans-BoldItalic`,
    extensions,
    name: 'Skillsoft Sans',
    weight: 700,
    style: 'italic',
  },
];

export const webFonts = { core, percipio, lxStudio } as const;
