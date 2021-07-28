import { useTheme } from '@emotion/react';

export function useColorModes() {
  const { mode, modes, _getColorValue: getColorValue } = useTheme() || {};
  return [mode, modes?.[mode], modes, getColorValue] as const;
}
