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
      interface: {
        _: 'hotPink-100',
        hover: 'hotPink-400',
      },
      feedback: {
        error: 'enterpriseRed-0',
        success: 'enterpriseGreen-0',
        warning: 'enterpriseYellow-0',
      },
    },
    dark: {
      background: {
        _: 'enterpriseNavy-400',
        current: 'navy-800',
        primary: 'navy-900',
        selected: 'navy-700',
        disabled: 'navy-500',
        hover: 'navy-600',
      },
      interface: {
        _: 'hotPink-100',
        hover: 'hotPink-400',
      },
    },
  })
  .build();

export type EnterpriseThemeShape = typeof enterpriseTheme;

export interface EnterpriseTheme extends EnterpriseThemeShape {}
