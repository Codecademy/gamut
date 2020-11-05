import '@emotion/react';
import { Theme as GamutTheme } from './theme';

export * from './cache';
export * from './variables';
export * from './utilities';
export * from './system';
export * from './theme';

declare module '@emotion/react' {
  /* eslint-disable-next-line @typescript-eslint/no-empty-interface */
  export interface Theme extends GamutTheme {}
}
