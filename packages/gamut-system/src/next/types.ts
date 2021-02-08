import { AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { DirectionalProperty, Properties } from '../types/properties';

// Configs
export interface BaseConfig<T extends AbstractTheme = never> {
  readonly prop: keyof Properties;
  readonly scale?: T extends never ? never : keyof T;
}

type OnlyStrings<T> = T extends string ? T : never;

type PropKeys<C extends BaseConfig<{}>> = C['prop'] extends DirectionalProperty
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
  C extends Record<string, BaseConfig<T>>
> = {
  [Prop in keyof C as OnlyStrings<PropKeys<C[Prop]>>]?: ResponsiveProp<
    C[Prop]['scale'] extends keyof T ? keyof T[C[Prop]['scale']] : string
  >;
};

/** Styles */

export interface StyleFn<T extends AbstractTheme, C extends BaseConfig<T>> {
  <
    Scale extends C['scale'],
    Value extends Scale extends keyof T ? keyof T[Scale] : string,
    Props extends Record<PropKeys<C>, MediaQuery<Value>> & { theme: T }
  >(
    props: Props
  ): CSSObject;
  config: C;
}
