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
    light: {
      background: {
        primary: 'blue-0',
      },
      editor: {
        attribute: 'green-700',
        annotation: 'red-500',
        atom: 'pink-800',
        basic: 'navy-800',
        comment: 'comment-light',
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
          'indent-active': 'indent-active-light',
          'indent-inactive': 'indent-inactive-light',
          'line-number-active': 'line-number-active-light',
          'line-number-inactive': 'line-number-inactive-light',
        },
      },
    },
    dark: {
      editor: {
        attribute: 'green-400',
        annotation: 'red-300',
        atom: 'pink-400',
        basic: 'white',
        comment: 'comment-dark',
        constant: 'orange-500',
        decoration: 'red-300',
        invalid: 'red-300',
        key: 'blue-300',
        keyword: 'purple-300',
        number: 'red-300',
        operator: 'red-300',
        predefined: 'white',
        property: 'red-300',
        regexp: 'green-400',
        string: 'yellow-500',
        tag: 'red-300',
        text: 'orange-500',
        value: 'yellow-500',
        variable: 'green-400',
        ui: {
          background: 'navy-900',
          text: 'white',
          'indent-active': 'indent-active-dark',
          'indent-inactive': 'indent-inactive-dark',
          'line-number-active': 'line-number-active-dark',
          'line-number-inactive': 'line-number-inactive-dark',
        },
      },
    },
  })
  .build();

export type PlatformThemeShape = typeof platformTheme;

export interface PlatformTheme extends PlatformThemeShape {}
