import { Theme } from '@emotion/react';

import { PropertyTypes } from './properties';
import {
  AbstractProps,
  CSSObject,
  ResponsiveProp,
  SelectorMap,
  SelectorProps,
  ThemeProps,
} from './props';
import { Key } from './utils';

export type LiteralScale = Record<string | number, string | number>;

export interface BaseProperty {
  property: keyof PropertyTypes;
  properties?: readonly (keyof PropertyTypes)[];
}

export interface Prop extends BaseProperty {
  scale?: keyof Theme | LiteralScale;
  transform?: (
    val: string | number,
    prop?: string,
    props?: AbstractProps
  ) => string | number | CSSObject;
}

export interface AbstractPropTransformer extends Prop {
  prop: string;
  styleFn: (value: unknown, prop: string, props: AbstractProps) => CSSObject;
}

export interface AbstractParser {
  (props: AbstractProps): CSSObject;
  propNames: string[];
  config: Record<string, AbstractPropTransformer>;
}

type PropertyValues<
  Property extends keyof PropertyTypes,
  All extends boolean = false
> = Exclude<PropertyTypes[Property], All extends true ? never : object | any[]>;

export type Scale<Config extends Prop> = ResponsiveProp<
  Config['scale'] extends keyof Theme
    ? keyof Theme[Config['scale']] | PropertyValues<Config['property']>
    : Config['scale'] extends LiteralScale
    ? keyof Config['scale'] | PropertyValues<Config['property']>
    : PropertyValues<Config['property'], true>
>;

export interface TransformFn<P extends string, Config extends Prop> {
  (
    value: Scale<Config>,
    prop: P,
    props: ThemeProps<{ [K in P]?: Scale<Config> }>
  ): CSSObject;
}

export interface PropTransformer<P extends string, C extends Prop>
  extends AbstractPropTransformer,
    Prop {
  prop: P;
  styleFn: TransformFn<P, C>;
}

export type TransformerMap<Config extends Record<string, Prop>> = {
  [P in Key<keyof Config>]: PropTransformer<Key<P>, Config[P]>;
};

export type ParserProps<
  Config extends Record<string, AbstractPropTransformer>
> = ThemeProps<
  {
    [P in keyof Config]?: Parameters<
      Config[P]['styleFn']
    >[2][Config[P]['prop']];
  }
>;

export interface Parser<
  Config extends Record<string, AbstractPropTransformer>
> {
  (props: ParserProps<Config>): CSSObject;
  propNames: (keyof Config)[];
  config: Config;
}

export type SystemProps<P extends AbstractParser> = Omit<
  Parameters<P>[0],
  'theme'
>;

export interface Variant<P extends AbstractParser> {
  <
    Keys extends keyof Props,
    Props extends Record<Keys, AbstractProps>,
    PropKey extends Readonly<string> = 'variant'
  >(options: {
    prop?: PropKey;
    defaultVariant?: keyof Props;
    variants: SelectorMap<Props, SystemProps<P>>;
  }): (props: ThemeProps<Partial<Record<PropKey, Keys>>>) => CSSObject;
}

export interface CSS<P extends AbstractParser> {
  <Props extends AbstractProps>(config: SelectorProps<Props, SystemProps<P>>): (
    props: ThemeProps
  ) => CSSObject;
}
