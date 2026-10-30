import { Box, BoxProps } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

/**
 * HeroContainer
 *
 * A flex-column wrapper around Gamut's `Box`, used for the Teams landing
 * page hero section. Layout, spacing, and color are expressed as themed
 * system props (via `css`) rather than raw CSS declarations, so they stay
 * in sync with the design system's spacing scale and color tokens.
 */
export const HeroContainer = styled(Box)<BoxProps>(
  css({
    display: 'flex',
    flexDirection: 'column',
    p: 16,
    mt: 24,
    color: 'white',
  })
);

export type { BoxProps as HeroContainerProps } from '@codecademy/gamut';
