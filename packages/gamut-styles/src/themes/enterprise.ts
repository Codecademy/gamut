import { createTheme } from '@codecademy/variance';

import { enterprisePalette } from '../variables';
import { coreTheme } from './core';

export const enterpriseTheme = createTheme(coreTheme)
  .addColors(enterprisePalette)
  .addColorModes('light', {
    light: {
      text: {
        _: 'gray-900',
        accent: 'blue',
        disabled: 'gray-500',
        secondary: 'gray-500',
      },

      background: {
        _: 'white',
        contrast: 'white',
        current: 'white',
        primary: 'beige',
        selected: 'blue-50',
        disabled: 'gray-100',
        hover: 'gray-200',
      },
      primary: {
        _: 'blue',
        hover: 'blue-400',
        inverse: 'white',
      },
      secondary: {
        _: 'gray-900',
        hover: 'gray-800',
      },
      interface: {
        _: 'blue',
        hover: 'blue-400',
      },
      danger: {
        _: 'red',
        hover: 'red-600',
      },
    },
    dark: {
      text: {
        _: 'white',
        accent: 'blue',
        disabled: 'gray-100',
        secondary: 'gray-200',
      },
      background: {
        _: 'gray-900',
        current: 'gray-800',
        primary: 'gray-900',
        selected: 'gray-700',
        disabled: 'gray-500',
        hover: 'gray-600',
      },
      primary: {
        _: 'skyBlue',
        hover: 'skyBlue-100',
        inverse: 'blue',
      },
      secondary: {
        _: 'white',
        hover: 'blue-50',
      },
      interface: {
        _: 'white',
        hover: 'blue-50',
      },
    },
  })
  .build();

export type EnterpriseThemeShape = typeof enterpriseTheme;

export interface EnterpriseTheme extends EnterpriseThemeShape {}
