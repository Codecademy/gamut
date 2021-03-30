export type AbstractProps = Record<string, unknown>;

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

export interface AbstractTheme {
  breakpoints: BreakpointKeys;
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
  _?: T;
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

/** These are currently unused but will be used for pseudo selector support in the near future */
export type Chained = `&` | `>` | '~' | '+';

export type SelectorLiterals =
  | `[${string}]`
  | `&:${string}`
  | `${Chained} ${string}`
  | `${string} ${Chained} ${string}`;

export type Selectors<T> = T extends SelectorLiterals ? T : never;

export type SelectorMap<
  Config extends AbstractProps,
  SelectorKeys extends Selectors<keyof Config>,
  Props extends AbstractProps
> = {
  [K in keyof Config]: K extends SelectorKeys
    ? Props
    : K extends keyof Props
    ? Props[K]
    : never;
};
