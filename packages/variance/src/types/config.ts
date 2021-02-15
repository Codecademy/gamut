import { PropertyTypes } from './properties';
import {
  AbstractProps,
  AbstractTheme,
  CSSObject,
  ResponsiveProp,
  SelectorMap,
  ThemeProps,
} from './props';
import { Key } from './utils';

export interface BaseProperty {
  property: keyof PropertyTypes;
  properties?: (keyof PropertyTypes)[];
}

export interface Prop<T extends AbstractTheme> extends BaseProperty {
  scale?: keyof T;
  transform?: (
    val: unknown,
    prop?: string,
    props?: AbstractProps
  ) => string | number;
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
    ? keyof T[Config['scale']]
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
    Props extends Record<string, AbstractProps>,
    Keys extends keyof Props,
    PropKey extends Readonly<string> = 'variant'
  >(
    variants: {
      [P in Keys]: SelectorMap<Props[P], Parameters<Parser>[0]>;
    },
    options?: {
      prop?: PropKey;
      defaultVariant?: Keys;
    }
  ): <FinalProps extends ThemeProps<T, { [X in PropKey]?: Key<Keys> }>>(
    props: FinalProps
  ) => CSSObject;
}
export interface CSS<T extends AbstractTheme, P extends AbstractParser<T>> {
  <Props extends AbstractProps>(config: SelectorMap<Props, Parameters<P>[0]>): <
    FinalProps extends ThemeProps<T>
  >(
    props: FinalProps
  ) => CSSObject;
}
