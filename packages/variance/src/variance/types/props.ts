export type AbstractProps = Record<string, unknown>;

export type BaseTheme = Readonly<{
  readonly [key: string]: any;
}>;

export interface AbstractTheme extends BaseTheme {
  breakpoints?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface ThemeProps<T extends AbstractProps> {
  theme?: T;
}

export interface CSSObject {
  [key: string]: string | number | undefined;
}

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
