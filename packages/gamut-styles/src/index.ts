import '@emotion/react';

import { theme } from './theme';

export * from './GamutProvider';
export * from './ColorMode';
export * from './Background';

export * from './variance/utils';
export * from './variance/props';
export * from './cache';
export * from './variables';
export * from './styles';
export * from './globals';
export * from './utilities';
export * from './props';
export { theme } from './theme';

export type ThemeShape = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeShape {}
}
