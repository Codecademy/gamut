import { useTheme } from '@emotion/react';

/**
 * Whether Gamut system props map to logical CSS properties (`marginInlineStart`, etc.)
 * vs physical (`marginLeft`, etc.).
 *
 * `GamutProvider` always merges an explicit boolean (default `false`).
 */
export function useLogicalProperties() {
  const theme = useTheme();
  return theme?.useLogicalProperties;
}
