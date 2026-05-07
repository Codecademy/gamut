import { create } from 'storybook/theming';
import {
  theme as gamutTheme,
  trueColors,
  coreSwatches,
} from '@codecademy/gamut-styles/src';

import logo from '../assets/logo.svg';

const isLocalhost = globalThis.location?.toString().includes('localhost');

/**
 * Storybook docs chrome (`parameters.docs.theme`) uses `fontBase` for MDX canvas
 * typography. It must match the toolbar-selected Gamut theme’s `fontFamily.base`
 * (see DocsContainer); otherwise e.g. LX Studio shows Skillsoft Text on `body`
 * from Reboot but Apercu inside addon-docs div rules.
 */
export function createGamutDocsTheme(
  fontBase: string = gamutTheme.fontFamily.base
) {
  return create({
    base: 'light',
    brandTitle: isLocalhost ? 'Gamut Local' : 'Gamut',
    brandImage: logo,
    brandUrl: '/',
    fontBase,

    //
    colorPrimary: trueColors.hyper,
    colorSecondary: trueColors.navy,

    // UI
    appBg: trueColors.white,
    appContentBg: isLocalhost ? trueColors.beige : trueColors.paleBlue,
    appBorderColor: trueColors.navy,
    appBorderRadius: 4,

    // Text colors
    textColor: trueColors.navy,
    textInverseColor: trueColors.white,
    textMutedColor: coreSwatches.gray[800],

    // Toolbar default and active colors
    barTextColor: coreSwatches.gray[600],
    barSelectedColor: trueColors.navy,
    barBg: trueColors.white,

    // Form colors
    inputBg: trueColors.white,
    inputBorder: trueColors.navy,
    inputTextColor: trueColors.navy,
    inputBorderRadius: 2,
  });
}

export default createGamutDocsTheme();
