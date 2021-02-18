import { useBreakpointAtOrAbove } from '../../lib/breakpointHooks';
import { breakpoint, desktopHeight, mobileHeight } from './consts';

export function useGlobalHeaderHeight(): number {
  const isDesktop = useBreakpointAtOrAbove(breakpoint);
  return isDesktop ? desktopHeight : mobileHeight;
}
