import '@emotion/react';

export * from './cache';
export * from './variables';
export * from './utilities';
export * from './theme';

import { theme } from './theme';

export type ThemeShape = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeShape {}
}
