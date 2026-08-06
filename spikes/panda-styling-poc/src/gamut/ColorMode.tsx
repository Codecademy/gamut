import type { ReactNode } from 'react';

import { Box } from './Box';

export type ColorModeName = 'light' | 'dark';

/* Analog of gamut `ColorMode`/`VariableProvider`. Authored with system-style
 * PROPS on `Box` (bg/color) — no className. Setting `data-color-mode` flips the
 * semantic tokens' `_dark` condition for the subtree, incl. nested modes. */
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
