import * as React from 'react';

import { webFonts } from '../remoteAssets/fonts';

// Define types for font objects using CSS properties
export interface FontConfig {
  filePath: string;
  extensions: readonly string[];
  name: string;
  style?: React.CSSProperties['fontStyle'];
  weight?: React.CSSProperties['fontWeight'];
}

// Define the webFonts type structure
type ThemeName = keyof typeof webFonts;

// Type guard to check if a string is a valid theme name
const isThemeName = (name: string): name is ThemeName => {
  return name in webFonts;
};

// Get fonts based on theme name with type safety
export const getFonts = (
  themeName: string | undefined
): readonly FontConfig[] => {
  if (!themeName || !isThemeName(themeName)) {
    return webFonts.core;
  }
  return webFonts[themeName];
};
