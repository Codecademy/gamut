import { Theme } from '@emotion/react';
import * as React from 'react';

import { webFonts } from '../remoteAssets/fonts';

export interface FontConfig {
  filePath: string;
  extensions: readonly string[];
  name: string;
  style?: React.CSSProperties['fontStyle'];
  weight?: React.CSSProperties['fontWeight'];
}

type ThemeName = keyof typeof webFonts;

const isThemeName = (name: string): name is ThemeName => {
  return name in webFonts;
};

export type NamedTheme = Theme & { name?: ThemeName };
/**
 * Retrieves font configurations based on the provided theme name.
 *
 * Returns the appropriate font configuration array for the given theme.
 * If no theme name is provided or the theme name is not recognized,
 * returns the core fonts as a fallback.
 *
 * @param themeName - The name of the theme to get fonts for, or undefined
 * @returns A readonly array of FontConfig objects for the specified theme
 *
 * @example
 * ```ts
 * const fonts = getFonts('percipio'); // Returns percipio theme fonts
 * const coreFonts = getFonts(undefined); // Returns core fonts
 * const invalidFonts = getFonts('invalid'); // Returns core fonts as fallback
 * ```
 */
export const getFonts = (
  themeName: string | undefined
): readonly FontConfig[] => {
  if (!themeName || !isThemeName(themeName)) {
    return webFonts.core;
  }
  return webFonts[themeName];
};
