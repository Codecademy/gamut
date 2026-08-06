import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import { type ReactNode, createContext, useContext } from 'react';

/* Replaces Emotion's `ThemeProvider` + the
 * `declare module '@emotion/react' { interface Theme … }` augmentation. */

export type CoreTheme = typeof coreTheme;

const ThemeContext = createContext<CoreTheme>(coreTheme);
ThemeContext.displayName = 'GamutTheme';

export const useTheme = () => useContext(ThemeContext);

/** Stand-in for `GamutProvider`. Supplies the theme and Gamut's CSS variables. */
export const GamutProvider = ({
  theme = coreTheme,
  children,
}: {
  theme?: CoreTheme;
  children?: ReactNode;
}) => (
  <ThemeContext.Provider value={theme}>
    <Variables theme={theme} />
    {children}
  </ThemeContext.Provider>
);

/* Emits `--color-*` for every semantic alias in each mode. Colour mode then works
 * by REASSIGNING these variables on a wrapper, which is how nested modes resolve
 * from the nearest ancestor. (Selector-based conditions can't do that: an element
 * inside light-inside-dark matches both, and source order wins over proximity.) */
const Variables = ({ theme }: { theme: CoreTheme }) => {
  const { modes, colors } = theme as unknown as {
    modes: Record<'light' | 'dark', Record<string, string>>;
    colors: Record<string, string>;
  };

  const block = (mode: 'light' | 'dark') =>
    Object.entries(modes[mode])
      .map(([alias, token]) => `--color-${alias}:${colors[token] ?? token};`)
      .join('');

  return (
    <style
      data-gamut-variables=""
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: [
          `:root,[data-color-mode=light]{${block('light')}}`,
          `[data-color-mode=dark]{${block('dark')}}`,
        ].join(''),
      }}
    />
  );
};
