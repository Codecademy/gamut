import type { StyleProps } from '@codecademy/variance';
import { type ComponentPropsWithoutRef, type ReactNode, forwardRef } from 'react';
import { strokeButton } from 'styled-system/recipes';

import { css, systemProps } from './props';
import { injectGlobal } from './sheet';
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

/* ── A Gamut component backed ENTIRELY by Panda ──────────────────────────────
 * Its CSS is static, generated at build time from the recipe in panda.config.ts.
 * Zero runtime style work: this just picks class names.
 *
 * `className` is merged in so a consumer can still extend it with the unchanged
 * `styled(StrokeButton)(css(…), states(…))` API — see App.tsx section 2. That
 * combination is the whole proof: Panda underneath, API untouched on top. */
export type StrokeButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'danger';
  size?: 'small' | 'normal';
};

export const StrokeButton = forwardRef<HTMLButtonElement, StrokeButtonProps>(
  ({ variant, size, className, ...rest }, ref) => (
    <button
      ref={ref}
      className={[strokeButton({ variant, size }), className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
);
StrokeButton.displayName = 'StrokeButton';

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

/* Replaces Emotion's `<Global styles={…} />`. Same call shape, minus the
 * `css` tagged template — a plain style object, which is what Gamut's own
 * globals (Reboot, Typography, Variables) already author. */
export const Global = ({ styles }: { styles: Record<string, unknown> }) => {
  injectGlobal(styles as never);
  return null;
};
