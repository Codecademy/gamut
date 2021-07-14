import { createTheme } from '../../../variance/dist';
import { coreTheme } from './core';

export const adminTheme = createTheme(coreTheme)
  .addColorModes('light', {
    light: {
      primary: {
        _: 'blue-500',
        hover: 'blue-300',
      },
    },
    dark: {},
  })
  .build();

export type AdminThemeShape = typeof adminTheme;

export interface AdminTheme extends AdminThemeShape {}
