import { BaseTheme } from '../src/types/theme';
import { theme } from './__fixtures__/theme';

type LocalTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends BaseTheme, LocalTheme {}
}
