import { BaseTheme } from '../src/types/theme';

type LocalTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends BaseTheme, LocalTheme {}
}
