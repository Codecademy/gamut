/* The Emotion-free styling engine. Consumers import all of this from
 * `@codecademy/gamut-styles`; nothing here leaks Panda or Emotion, so the
 * engine underneath can be replaced without touching a call site. */

export {
  styled,
  type Interpolation,
  type StyleFn,
  type StyledComponent,
  type StyledOptions,
} from './styled';
export {
  css,
  states,
  system,
  systemPropNames,
  systemProps,
  variant,
} from './props';
export {
  ThemeProvider,
  useNonce,
  useTheme,
  type CoreTheme,
  type GamutTheme,
  type Theme,
} from './theme';
export { extractStyles, inject } from './sheet';
