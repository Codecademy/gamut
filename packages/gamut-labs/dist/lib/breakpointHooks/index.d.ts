export declare type Breakpoint = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare type BreakpointMinWidths = Record<Breakpoint, number>;
export declare const breakpoints: BreakpointMinWidths;
/**
 * useBreakpoint will provide the current breakpoint to a React component.
 *
 * If you think you need this, make sure to think twice.  It is really nice
 * to allow your styles layer to concern itself about the appearance of a
 * component at different screen sizes, and not have to maintain two different
 * components that could drift from eachother.  That being said, sometimes
 * The content, layout, and/or functionality of a mobile page/component can
 * be so different that it is non-performant or difficult to maintain the
 * changes in only styles.  For those cases where it is actually easier to maintain
 * two components or a programatic distinction of the breakpoint, this helper
 * exists.
 *
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */
export declare const useBreakpoint: () => keyof typeof breakpoints;
/**
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */
export declare function useBreakpointAtOrAbove(breakpoint: Breakpoint): boolean;
/**
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */
export declare function useBreakpointAt(breakpoint: Breakpoint): boolean;
/**
 * @deprecated
 * Use Box, LayoutGrid, or other responsive Gamut components instead.
 * JavaScript-time screen size checks are notorious for worsening page performance.
 * @see https://web.dev/cls
 */
export declare function useBreakpointAtOrBelow(breakpoint: Breakpoint): boolean;
