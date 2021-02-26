import { useTheme } from '@emotion/react';

export function useHeaderHeight(): number {
  const { elements } = useTheme();
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      elements.headerHeight
    ),
    10
  );
}
