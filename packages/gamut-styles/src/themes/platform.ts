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
        'ui-background': 'navy-900',
        'ui-text': 'white',
        'ui-indent-active': 'gray-900',
        'ui-indent-inactive': 'gray-800',
        'ui-line-number': 'gray-600',
      },
    },
  })
  .build();

export type PlatformThemeShape = typeof platformTheme;

export interface PlatformTheme extends PlatformThemeShape {}
