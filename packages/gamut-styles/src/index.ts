import '@emotion/react';

import { theme } from './themes';

export * from './GamutProvider';
export * from './ColorMode';
export * from './Background';
export * from './variance';
export * from './cache';
export * from './variables';
export * from './styles';
export * from './globals';
export * from './utilities';
export * from './props';
export * from './themes';

export type ThemeShape = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeShape {}
}
