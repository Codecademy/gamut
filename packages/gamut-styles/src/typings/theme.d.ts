import '@emotion/react';
import { CoreTheme } from '../themes';

declare module '@emotion/react' {
  export interface Theme extends CoreTheme {}
}
