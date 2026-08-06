import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import { type ReactNode, createContext, useContext } from 'react';

/* Replaces `declare module '@emotion/react' { interface Theme … }`.
 *
 * Consumers augment `GamutTheme` exactly as they augment Emotion's `Theme`
 * today, so the 19 real augmentation sites (18 in mono, 1 in
 * platform/src/themes/platform.d.ts) change only their module specifier:
 *
 *   declare module '@codecademy/gamut-styles' {
 *     export interface GamutTheme extends PercipioTheme {}
 *   }
 *
 * Improvement over Emotion's version: unaugmented, this resolves to CoreTheme
 * rather than `{}`. Today a consumer who forgets the augmentation silently gets
 * an empty theme type and loses all token autocomplete with no error. */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GamutTheme {}

export type CoreTheme = typeof coreTheme;
export type Theme = keyof GamutTheme extends never ? CoreTheme : GamutTheme;

const ThemeContext = createContext<Theme>(coreTheme as Theme);
ThemeContext.displayName = 'GamutTheme';

/* CSP nonce travels by context rather than inside a cache object, so the `nonce`
 * prop keeps working (front, platform and TI all set one) while
 * `createEmotionCache` disappears entirely. */
const NonceContext = createContext<string | undefined>(undefined);

export const useTheme = (): Theme => useContext(ThemeContext);
export const useNonce = () => useContext(NonceContext);

export const ThemeProvider = ({
  theme,
  nonce,
  children,
}: {
  theme: Theme;
  nonce?: string;
  children?: ReactNode;
}) => (
  <ThemeContext.Provider value={theme}>
    <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
  </ThemeContext.Provider>
);
