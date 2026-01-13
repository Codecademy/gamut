import { Theme } from '@emotion/react';

import {
  DirectionalProperty,
  PropertyMode,
} from '../getPropertyMode/getPropertyMode';
import { DefaultCSSPropertyValue, PropertyTypes } from './properties';
import {
  AbstractProps,
  CSSObject,
  CSSPropMap,
  CSSProps,
  ResponsiveProp,
  ThemeProps,
} from './props';
import { AllUnionKeys, Key, KeyFromUnion } from './utils';

export type MapScale = Record<string | number, string | number>;
export type ArrayScale = readonly (string | number)[] & { length: 0 };

export type PropertyValue = keyof PropertyTypes | DirectionalProperty;

export interface BaseProperty {
  property: PropertyValue;
  properties?: readonly PropertyValue[];
}

export interface Prop extends BaseProperty {
  scale?: keyof Theme | MapScale | ArrayScale;
  transform?: (
    val: string | number,
    prop?: string,
    props?: AbstractProps
  ) => string | number | CSSObject;
  /** Hook to resolve directional properties (physical/logical) based on theme setting */
  resolveProperty?: (useLogicalProperties: boolean) => PropertyMode;
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

export type PropertyValues<
  Property extends keyof PropertyTypes,
  All extends boolean = false
> = Exclude<
  PropertyTypes<All extends true ? DefaultCSSPropertyValue : never>[Property],
  All extends true ? never : object | any[]
>;

// Extract the actual property key from a PropertyValue (handles DirectionalProperty)
type ResolvePropertyKey<P extends PropertyValue> = P extends DirectionalProperty
  ? P['physical'] | P['logical']
  : P;

export type ScaleValue<Config extends Prop> =
  Config['scale'] extends keyof Theme
    ? keyof Theme[Config['scale']] | PropertyValues<ResolvePropertyKey<Config['property']>>
    : Config['scale'] extends MapScale
    ? keyof Config['scale'] | PropertyValues<ResolvePropertyKey<Config['property']>>
    : Config['scale'] extends ArrayScale
    ? Config['scale'][number] | PropertyValues<ResolvePropertyKey<Config['property']>>
    : PropertyValues<ResolvePropertyKey<Config['property']>, true>;

export type Scale<Config extends Prop> = ResponsiveProp<
  ScaleValue<Config> | ((theme: Theme) => ScaleValue<Config>)
>;

export interface TransformFn<P extends string, Config extends Prop> {
  (
    value: Scale<Config> | Scale<Config>,
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
export interface Parser<
  Config extends Record<string, AbstractPropTransformer>
> {
  (props: ParserProps<Config>): CSSObject;
  propNames: (keyof Config)[];
  config: Config;
}

export type Compose<Args extends AbstractParser[]> = {
  [K in AllUnionKeys<Args[number]['config']>]: KeyFromUnion<
    Args[number]['config'],
    K
  >;
};
export interface Variant<P extends AbstractParser> {
  <
    Keys extends keyof Props,
    Base extends AbstractProps,
    Props extends Record<Keys, AbstractProps>,
    PropKey extends Readonly<string> = 'variant'
  >(options: {
    prop?: PropKey;
    defaultVariant?: keyof Props;
    base?: CSSProps<Base, SystemProps<P>>;
    variants: CSSPropMap<Props, SystemProps<P>>;
  }): (props: VariantProps<PropKey, Keys | false> & ThemeProps) => CSSObject;
}

export interface States<P extends AbstractParser> {
  <Props extends Record<string, AbstractProps>>(
    states: CSSPropMap<Props, SystemProps<P>>
  ): (props: Partial<Record<keyof Props, boolean>> & ThemeProps) => CSSObject;
}

export interface CSS<P extends AbstractParser> {
  <Props extends AbstractProps>(config: CSSProps<Props, SystemProps<P>>): (
    props: ThemeProps
  ) => CSSObject;
}

export type ParserProps<
  Config extends Record<string, AbstractPropTransformer>
> = ThemeProps<{
  [P in keyof Config]?: Parameters<Config[P]['styleFn']>[2][Config[P]['prop']];
}>;

export type SystemProps<P extends AbstractParser> = {
  [K in keyof Omit<Parameters<P>[0], 'theme'>]: Omit<
    Parameters<P>[0],
    'theme'
  >[K];
};

export type VariantProps<T extends string, V> = {
  [Key in T]?: V;
};
