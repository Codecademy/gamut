import { PropertyTypes } from './properties';
import {
  AbstractProps,
  AbstractTheme,
  CSSObject,
  ResponsiveProp,
  SelectorMap,
  Selectors,
  ThemeProps,
} from './props';
import { Key } from './utils';

export type LiteralScale = Record<string | number, string | number>;

export interface BaseProperty {
  property: keyof PropertyTypes;
  properties?: (keyof PropertyTypes)[];
}

export interface Prop<T extends AbstractTheme> extends BaseProperty {
  scale?: keyof T | LiteralScale;
  transform?: (
    val: string | number,
    prop?: string,
    props?: AbstractProps
  ) => string | number | CSSObject;
}

export interface AbstractPropTransformer<T extends AbstractTheme>
  extends Prop<T> {
  prop: string;
  styleFn: (value: unknown, prop: string, props: AbstractProps) => CSSObject;
}

export interface AbstractParser<T extends AbstractTheme> {
  (props: AbstractProps): CSSObject;
  propNames: string[];
  config: Record<string, AbstractPropTransformer<T>>;
}

export type Scale<
  T extends AbstractTheme,
  Config extends Prop<T>
> = ResponsiveProp<
  Config['scale'] extends keyof T
    ?
        | keyof T[Config['scale']]
        | Exclude<PropertyTypes[Config['property']], object | any[]>
    : Config['scale'] extends LiteralScale
    ?
        | keyof Config['scale']
        | Exclude<PropertyTypes[Config['property']], object | any[]>
    : PropertyTypes[Config['property']]
>;

export interface TransformFn<
  T extends AbstractTheme,
  P extends string,
  Config extends Prop<T>
> {
  (
    value: Scale<T, Config>,
    prop: P,
    props: ThemeProps<T, { [K in P]?: Scale<T, Config> }>
  ): CSSObject;
}

export interface PropTransformer<
  T extends AbstractTheme,
  P extends string,
  C extends Prop<T>
> extends AbstractPropTransformer<T>,
    Prop<T> {
  prop: P;
  styleFn: TransformFn<T, P, C>;
}

export type TransformerMap<
  T extends AbstractTheme,
  Config extends Record<string, Prop<T>>
> = {
  [P in Key<keyof Config>]: PropTransformer<T, Key<P>, Config[P]>;
};

export type ParserProps<
  T extends AbstractTheme,
  Config extends Record<string, AbstractPropTransformer<T>>
> = ThemeProps<
  T,
  {
    [P in keyof Config]?: Parameters<
      Config[P]['styleFn']
    >[2][Config[P]['prop']];
  }
>;

export interface Parser<
  T extends AbstractTheme,
  Config extends Record<string, AbstractPropTransformer<T>>
> {
  (props: ParserProps<T, Config>): CSSObject;
  propNames: (keyof Config)[];
  config: Config;
}

export interface Variant<
  T extends AbstractTheme,
  Parser extends AbstractParser<T>
> {
  <
    Props extends AbstractProps,
    X extends Selectors<keyof Props>,
    Keys extends string,
    PropKey extends Readonly<string> = 'variant'
  >(
    variants: {
      [P in Keys]: Parameters<Parser>[0] &
        SelectorMap<Props, X, Parameters<Parser>[0]>;
    },
    options?: {
      prop?: PropKey;
      defaultVariant?: Keys;
    }
  ): (props: Record<PropKey, Keys> & { theme?: T }) => CSSObject;
}
export interface CSS<T extends AbstractTheme, P extends AbstractParser<T>> {
  <Props extends AbstractProps, X extends Selectors<keyof Props>>(
    config: Parameters<P>[0] & SelectorMap<Props, X, Parameters<P>[0]>
  ): (props: ThemeProps<T>) => CSSObject;
}
