import { AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { Properties, PropName } from '../types/properties';

// Configs

export type BaseConfig<T extends AbstractTheme> = {
  propName: Readonly<PropName>;
  scale?: Readonly<keyof T>;
  dependentProps?: Readonly<string[]>;
};

export type OnlyStrings<T> = T extends string ? T : never;

export type PropKeys<
  T extends AbstractTheme,
  C extends BaseConfig<T>
> = Readonly<
  | C['propName']
  | Extract<C, { dependentProps: Readonly<string[]> }>['dependentProps'][number]
>;

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
  [Prop in keyof C as OnlyStrings<PropKeys<T, C[Prop]>>]?: Scale<T, C[Prop]>;
} &
  (WithTheme extends true ? ThemeProps<T> : {});

/** Styles */
export interface ThemeProps<T extends AbstractTheme> {
  theme: T;
}

export interface StyleProps<T extends AbstractTheme, C extends BaseConfig<T>> {
  (
    props: {
      [Prop in PropKeys<T, C> as `${OnlyStrings<Prop>}`]?: Scale<T, C>;
    } &
      ThemeProps<T>
  ): CSSObject;
}

export type Scale<
  T extends AbstractTheme,
  Config extends BaseConfig<T>
> = ResponsiveProp<
  Config['scale'] extends keyof T
    ? keyof T[Config['scale']]
    : Properties[Config['propName']]['defaultScale']
>;

export type StyleFn<T extends AbstractTheme, C extends BaseConfig<T>> = {
  styleFn: StyleProps<T, C>;
  propNames: PropKeys<T, C>[];
};

export type ParserFn<
  T extends AbstractTheme,
  C extends BaseConfig<T>
> = StyleProps<T, C> & StyleFn<T, C>;
