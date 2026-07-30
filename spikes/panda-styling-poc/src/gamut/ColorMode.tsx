import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

export type ColorModeName = 'light' | 'dark';

/* Analog of gamut `ColorMode`/`VariableProvider`. Gamut computes per-mode
 * `--color-*` variables with `serializeTokens` and sets them on a wrapper.
 * Panda does the same: the semantic tokens' `_dark` condition is keyed to
 * `[data-color-mode=dark] &`, so setting the attribute flips every color var
 * for the subtree — including NESTED modes. No Emotion, no runtime serialize. */
export const ColorMode = ({
  mode,
  children,
}: {
  mode: ColorModeName;
  children?: ReactNode;
}) => (
  <div
    data-color-mode={mode}
    className={css({ color: 'text', bg: 'background' })}
  >
    {children}
  </div>
);
