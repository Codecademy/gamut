import type { StyleProps } from '@codecademy/variance';
import type { ReactNode } from 'react';

import { css, systemProps } from './props';
import { styled } from './styled';

/* The handful of Gamut components the demo needs, built on the new engine.
 * Their public props are unchanged — that's the point. */

export type BoxProps = StyleProps<typeof systemProps>;

/** `<Box p={16} bg="primary" />` — every system prop, same as today. */
export const Box = styled('div')<BoxProps>(systemProps);

export const FlexBox = styled('div')<BoxProps>(
  css({ display: 'flex' }),
  systemProps
);

export const Text = styled('span')<BoxProps>(systemProps);

export type ColorModeName = 'light' | 'dark';

/* `<ColorMode mode="dark">` — sets `data-color-mode`, which REASSIGNS the
 * `--color-*` variables for the subtree. Nested modes therefore resolve from the
 * nearest ancestor, which is what makes light-inside-dark work. */
export const ColorMode = ({
  mode,
  children,
}: {
  mode: ColorModeName;
  children?: ReactNode;
}) => (
  <Box data-color-mode={mode} bg="background" color="text">
    {children}
  </Box>
);

/* Palette tokens that read as "dark", so `<Background>` can pick the mode giving
 * the best contrast with body text — same contract as real Gamut. */
const DARK_SURFACES = new Set([
  'navy',
  'navy-800',
  'hyper',
  'hyper-500',
  'black',
]);

/** `<Background bg="navy" p={16}>` — a fixed-palette surface that sets its own mode. */
export const Background = ({
  bg,
  children,
  ...rest
}: BoxProps & { bg: string; children?: ReactNode }) => (
  <Box
    {...rest}
    bg={bg}
    color="text"
    data-color-mode={DARK_SURFACES.has(bg) ? 'dark' : 'light'}
  >
    {children}
  </Box>
);
