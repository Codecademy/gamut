import { createTheme } from '@codecademy/variance';

import { enterprisePalette } from '../variables';
import { coreTheme } from './core';

export const enterpriseTheme = createTheme(coreTheme)
  .addColors(enterprisePalette)
  .addColorModes('light', {
    light: {
      text: 'enterpriseNavy-400',
      primary: {
        _: 'hotPink-100',
        hover: 'hotPink-400',
      },
      secondary: {
        _: 'enterpriseNavy-400',
        hover: 'enterpriseNavy-100',
      },
      feedback: {
        error: 'enterpriseRed-0',
        success: 'enterpriseGreen-0',
        warning: 'enterpriseYellow-0',
      },
    },
    dark: {},
  })
  .build();

export type EnterpriseThemeShape = typeof enterpriseTheme;

export interface EnterpriseTheme extends EnterpriseThemeShape {}
