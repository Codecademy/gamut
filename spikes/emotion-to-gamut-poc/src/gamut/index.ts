/* Stands in for `@codecademy/gamut-styles`.
 *
 * Everything a consumer needs comes from here — including `styled`, which today
 * comes from `@emotion/styled`. That single import move is the entire migration:
 *
 *   - import styled from '@emotion/styled';
 *   + import { styled } from '@codecademy/gamut-styles';
 *
 * Nothing else about a call site changes. Nothing here imports Emotion. */

export { styled } from './styled';
export type { StyleFn, StyledComponent, StyledOptions } from './styled';

export { css, states, styledOptions, systemProps, variant } from './props';

export { GamutProvider, themes, useTheme } from './theme';
export type { CoreTheme } from './theme';

export {
  Background,
  Box,
  ColorMode,
  FlexBox,
  StrokeButton,
  Text,
} from './components';
export type {
  BoxProps,
  ColorModeName,
  StrokeButtonProps,
} from './components';

// used by the demo page to display the CSS the engine generated
export { allRules } from './sheet';
