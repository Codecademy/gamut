export type AbstractProps = Record<string, unknown>;

export interface BaseTheme {
  [key: string]: unknown;
}

interface BreakpointKeys<T = string> {
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}
export interface BreakpointCache {
  map: BreakpointKeys;
  array: string[];
}

export interface AbstractTheme extends BaseTheme {
  breakpoints?: BreakpointKeys;
}

export type ThemeProps<
  T extends AbstractTheme = AbstractTheme,
  Props extends AbstractProps = {}
> = {
  theme?: T;
} & Props;

export interface MediaQueryArray<T> {
  0?: T;
  1?: T;
  2?: T;
  3?: T;
  4?: T;
  5?: T;
}
export interface MediaQueryMap<T> {
  base?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsiveProp<T> = T | MediaQueryMap<T> | MediaQueryArray<T>;
export interface CSSObject {
  [key: string]: string | number | CSSObject | undefined;
}
