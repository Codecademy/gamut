import { createTheme } from '@codecademy/variance';

import { platformPalette } from '../variables';
import { coreTheme } from './core';

export const platformTheme = createTheme(coreTheme)
  .addColors(platformPalette)
  .addColorModes('dark', {
    light: {},
    dark: {},
  })
  .build();
