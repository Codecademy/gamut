import { useTheme } from '@emotion/react';

/**
 * Whether Gamut system props emit logical CSS properties (`marginInlineStart`, etc.)
 * vs physical (`marginLeft`, etc.). Matches `@codecademy/variance` when the theme
 * omits the field: `theme.useLogicalProperties ?? true`.
 *
 * `GamutProvider` always merges an explicit boolean (default `false`).
 */
export function useLogicalProperties(): boolean {
  const theme = useTheme();
  return theme.useLogicalProperties ?? true;
}
