import { adminTheme } from '@codecademy/gamut-styles/dist/themes/admin';
import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import { platformTheme } from '@codecademy/gamut-styles/dist/themes/platform';
import { type ReactNode, createContext, useContext } from 'react';

/* Replaces Emotion's `ThemeProvider` + the
 * `declare module '@emotion/react' { interface Theme … }` augmentation. */

export type CoreTheme = typeof coreTheme;

/** The Gamut themes this PoC maps. Same palette; different semantic aliases. */
export const themes = {
  core: coreTheme,
  admin: adminTheme,
  platform: platformTheme,
} as unknown as Record<string, CoreTheme>;

const ThemeContext = createContext<CoreTheme>(coreTheme);
ThemeContext.displayName = 'GamutTheme';

export const useTheme = () => useContext(ThemeContext);

/* Stand-in for `GamutProvider`. Supplies the theme object only — the CSS variables
 * it references are emitted at BUILD time by Panda (see panda.config.ts), so
 * there's no `<Variables>` component shipping them as JS.
 *
 * This is what Gamut's theme values actually look like:
 *   coreTheme.colors.primary === 'var(--color-primary)'
 * `variance` just emits that reference; Panda defines it. */
export const GamutProvider = ({
  theme = coreTheme,
  children,
}: {
  theme?: CoreTheme;
  children?: ReactNode;
}) => (
  <ThemeContext.Provider value={theme}>
    {/* `data-theme` selects which alias block applies; `display: contents` means
        this wrapper adds the hook without affecting layout. Switching themes is
        an attribute flip — only variable assignments change. */}
    <div data-theme={theme.name} style={{ display: 'contents' }}>
      {children}
    </div>
  </ThemeContext.Provider>
);
