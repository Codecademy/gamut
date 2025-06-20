import { createTheme } from '@codecademy/variance';

import { platformPalette } from '../variables';
import { coreTheme } from './core';

// KENNY: main branch to update color tokens for core + platform themes

/**
 * @description This is an extended theme for the learning environment with an expanded set of tokens
 * That are not needed for the rest of the application.
 */

export const platformTheme = createTheme(coreTheme)
  .addColors(platformPalette)
  .addColorModes('dark', {
    light: {
      editor: {
        attribute: 'green-700',
        annotation: 'red-500',
        atom: 'pink-800',
        basic: 'navy-800',
        comment: 'navy-300',
        constant: 'orange-800',
        decoration: 'red-500',
        invalid: 'red-500',
        key: 'teal-500',
        keyword: 'blue-500',
        number: 'red-500',
        operator: 'red-500',
        predefined: 'navy-800',
        property: 'red-500',
        regexp: 'green-700',
        string: 'gold-800',
        tag: 'red-500',
        text: 'orange-800',
        value: 'gold-800',
        variable: 'green-700',
        ui: {
          background: 'white',
          text: 'navy-800',
          'indent-active': 'navy-900',
          'indent-inactive': 'navy-600',
          'line-number': 'navy-300',
        },
      },
    },
    dark: {
      editor: {
        attribute: 'green-400',
        annotation: 'red-0',
        atom: 'pink-400',
        basic: 'white',
        comment: 'gray-600',
        constant: 'orange-500',
        decoration: 'red-0',
        invalid: 'red-0',
        key: 'blue-300',
        keyword: 'purple-300',
        number: 'red-0',
        operator: 'red-0',
        predefined: 'white',
        property: 'red-0',
        regexp: 'green-400',
        string: 'yellow-500',
        tag: 'red-0',
        text: 'orange-500',
        value: 'yellow-500',
        variable: 'green-400',
        ui: {
          background: 'navy-900',
          text: 'white',
          'indent-active': 'gray-900',
          'indent-inactive': 'gray-800',
          'line-number': 'gray-600',
        },
      },
    },
  })
  .build();

export type PlatformThemeShape = typeof platformTheme;

export interface PlatformTheme extends PlatformThemeShape {}
