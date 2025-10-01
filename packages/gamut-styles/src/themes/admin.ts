import { createTheme } from '@codecademy/variance';

import { coreTheme } from './core';

export const adminTheme = createTheme(coreTheme)
  .addColorModes('light', {
    light: {
      primary: {
        _: 'blue-500',
        hover: 'blue-400',
      },
    },
    dark: {
      feedback: {
        success: 'green-400',
      },
    },
  })
  .addName('admin')
  .build();

export type AdminThemeShape = typeof adminTheme;

export interface AdminTheme extends AdminThemeShape {}
