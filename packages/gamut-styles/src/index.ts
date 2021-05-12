import '@emotion/react';

import { CoreTheme } from './themes';

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
export { coreTheme as theme } from './themes';

declare module '@emotion/react' {
  export interface Theme extends CoreTheme {}
}
