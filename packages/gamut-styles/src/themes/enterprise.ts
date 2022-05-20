import { createTheme } from '@codecademy/variance';

import { enterprisePalette } from '../variables';
import { coreTheme } from './core';

export const enterpriseTheme = createTheme(coreTheme)
  .addColors(enterprisePalette)
  .addColorModes('light', {
    light: {
      primary: {
        _: 'hotPink-400',
        hover: 'hotPink-100',
      },
    },
    dark: {},
  })
  .build();

export type EnterpriseThemeShape = typeof enterpriseTheme;

export interface EnterpriseTheme extends EnterpriseThemeShape {}
