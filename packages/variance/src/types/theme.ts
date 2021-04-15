export interface Breakpoints<T = string> {
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}

export interface BaseTheme {
  breakpoints: Breakpoints;
}

export interface AbstractTheme extends BaseTheme {
  readonly [key: string]: any;
}

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
