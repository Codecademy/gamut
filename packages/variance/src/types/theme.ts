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

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
