import { theme } from './__fixtures__/theme';

type LocalTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends LocalTheme {}
}
