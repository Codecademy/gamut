import { createTheme } from '@codecademy/variance';

import { coreTheme } from './core';

export const platformTheme = createTheme(coreTheme)
  .addColors({
    navy: {
      300: '#585C6D',
      600: '#232940',
      800: '#10162F',
      900: '#0B0F21',
    },
    lightBeige: '#FFFBF8',
    gold: '#8A7300',
    orange: {
      800: '#D14900',
    },
    pink: {
      800: '#CA00D1',
    },
    teal: '#027E97',
    paleRed: '#E85D7F',
    purple: '#AEE938',
  })
  .build();
