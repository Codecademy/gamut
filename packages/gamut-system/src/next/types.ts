import { AbstractProps, AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { DirectionalProperty, Properties } from '../types/properties';

// Configs
export interface BaseConfig<T extends AbstractTheme = never> {
  readonly prop: keyof Properties;
  readonly scale?: T extends never ? never : keyof T;
  readonly dependentProps?: Readonly<
    Properties[DirectionalProperty]['dependentProps'][]
  >;
}

type OnlyStrings<T> = T extends string ? T : never;

export type PropKeys<
  C extends BaseConfig<{}>
> = C['prop'] extends DirectionalProperty
  ? C['prop'] | Properties[C['prop']]['dependentProps']
  : C['prop'];

// Props

export interface MediaQuery<T> {
  0?: T;
  1?: T;
  2?: T;
  3?: T;
  4?: T;
  5?: T;
}

export interface MediaQueryMap<T> extends MediaQuery<T> {
  base?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsiveProp<T> = T | MediaQueryMap<T>;

export type AllProps<
  T extends AbstractTheme,
  C extends Record<string, BaseConfig<T>>,
  WithTheme extends boolean = false
> = {
  [Prop in keyof C as OnlyStrings<PropKeys<C[Prop]>>]?: ResponsiveProp<
    C[Prop]['scale'] extends keyof T ? keyof T[C[Prop]['scale']] : string
  >;
} &
  (WithTheme extends true ? ThemeProps<T> : {});

/** Styles */
interface ThemeProps<T extends AbstractTheme> {
  theme: T;
}

interface AbstractThemeProps<T extends AbstractTheme> extends ThemeProps<T> {
  [key: string]: unknown;
}

export interface StyleFn<
  T extends AbstractTheme,
  C extends BaseConfig<T>,
  FnProps = AllProps<T, { [P in C['prop']]: C }, true>
> extends BaseConfig<T> {
  styleFn: <T extends AbstractThemeProps<T>>(props: T) => CSSObject;
  propNames: PropKeys<C>[];
}
