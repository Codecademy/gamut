import { createElement } from 'react';

import {
  css,
  extractStyles,
  inject,
  styled,
  ThemeProvider,
  useTheme,
} from '../../../panda-styling-poc/src/gamut/engine';

/* One "copy" of Gamut's runtime styling engine, as a self-contained CJS bundle.
 *
 * Built TWICE (copyA.cjs / copyB.cjs) with `react` marked external, so both
 * copies share one React instance while each gets its own module scope for the
 * engine. That is precisely what Module Federation produces when `react` is a
 * shared singleton but `@codecademy/gamut-styles` is NOT — which is the real
 * configuration in front (`sharedDependencies.js` omits gamut and emotion) and
 * platform (shares `@emotion/*` but not `@codecademy/gamut`). */

const cardStyles = css({
  p: 24,
  bg: 'primary',
  color: 'background',
  borderRadius: 'md',
});

export const Card = styled('div')(cardStyles);

/* Reads the theme out of context and renders an identifying marker, so we can see
 * whether a provider in one copy is visible to a component in another. */
export const ThemeProbe = () => {
  const theme = useTheme() as { marker?: string };
  return createElement('span', null, theme?.marker ?? 'DEFAULT-THEME');
};

export { ThemeProvider, cardStyles, css, extractStyles, inject, styled };
