import { createTheme } from '@codecademy/variance';

import { platformPalette } from '../variables';
import { coreTheme } from './core';

/**
 * @description This is an extended theme for the learning environment with an expanded set of tokens
 * That are not needed for the rest of the application.
 */

export const platformTheme = createTheme(coreTheme)
  .addColors(platformPalette)
  .addColorModes('dark', {
    light: {},
    dark: {},
  })
  .build();

export type PlatformThemeShape = typeof platformTheme;

export interface PlatformTheme extends PlatformThemeShape {}
