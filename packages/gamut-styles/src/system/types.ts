import { Props } from './types/properties';
import { CSSObject } from '@emotion/core';

/** System Configuration */
export type MediaQueryArray<Value> = [Value?, Value?, Value?, Value?, Value?];

export type MediaQueryMap<Value> = {
  xs?: Value;
  sm?: Value;
  md?: Value;
  lg?: Value;
  xl?: Value;
};

export type ResponsiveProp<Value> =
  | Value
  | MediaQueryArray<Value>
  | MediaQueryMap<Value>;

/** Utility  */
export type UnionToIntersection<Union> = (
  Union extends any ? (k: Union) => void : never
) extends (k: infer Intersection) => void
  ? Intersection
  : never;

export type NeverUnknown<Value> = Value extends string
  ? Value
  : Value extends number
  ? Value
  : Value extends unknown
  ? never
  : Value;

export type SafeLookup<MaybeArray> = MaybeArray extends Readonly<unknown[]>
  ? MaybeArray[number]
  : never;
export type SafeMapKey<MaybeMap> = MaybeMap extends Readonly<
  Record<string, unknown>
>
  ? keyof MaybeMap
  : never;

/** Abstract Configurations  */
export type PropAlias = Readonly<keyof Props>;

export type AbstractTheme = Readonly<Partial<Record<string, ScaleArray>>>;

export type ScaleArray = Readonly<unknown[]>;

export type ScaleMap = Readonly<Record<string | number, unknown>>;

export type AbstractScales = ScaleArray | ScaleMap | Readonly<string>;

export type AbstractProps = Record<string, unknown>;

export type StyleTemplate<Props extends AbstractProps> = (
  props: Props
) => CSSObject | undefined;

export type TemplateMap<Props extends AbstractProps> = Partial<
  Record<keyof Props, StyleTemplate<Props>>
>;

export type HandlerConfig<Props extends AbstractProps> = {
  propName: keyof Props;
  altProps?: Readonly<(keyof Props)[]>;
  templateFn: StyleTemplate<Props>;
};

export type Handler<Props extends AbstractProps> = {
  propNames?: (keyof Props)[];
  templateFns?: TemplateMap<Props>;
} & ((props: Props) => CSSObject);

export type HandlerProps<HandlerFn extends Handler<AbstractProps>> = Parameters<
  HandlerFn
>[0];

export type PropTemplateType = 'standard' | 'directional';

export type TransformValue = (value: any) => string | number;

export type AbstractSystemConfig = {
  propName: PropAlias;
  altProps?: Readonly<string[]>;
  type?: 'standard' | 'directional';
  scale?: AbstractScales;
  computeValue?: TransformValue;
};
/** Theme Aware Configurations */

export type ThematicConfig<
  Theme extends AbstractTheme
> = AbstractSystemConfig & {
  scale?: ScaleArray | ScaleMap | Readonly<keyof Theme>;
};

export type PropKey<Config extends AbstractSystemConfig> =
  | Config['propName']
  | Extract<Config, { altProps: Readonly<string[]> }>['altProps'][number];

export type GetAltProps<Config extends AbstractSystemConfig> = Extract<
  Props[Config['propName']],
  { altProps: string }
>['altProps'];

type SafeCSSType<PropName extends PropAlias> = Extract<
  Readonly<Props[PropName]['defaultValue']>,
  Readonly<string>
>;

/** Standard CSS Property Types */
export type DefaultPropScale<
  Config extends AbstractSystemConfig
> = Config['propName'] extends PropAlias[]
  ? SafeCSSType<Config['propName'][number]>
  : Config['propName'] extends PropAlias
  ? SafeCSSType<Config['propName']>
  : never;

export type ThematicScaleValue<
  Theme extends AbstractTheme,
  Config extends ThematicConfig<Theme>
> = Config['scale'] extends AbstractScales
  ?
      | NeverUnknown<
          SafeLookup<Theme[Extract<Config, { scale: string }>['scale']]>
        >
      | SafeMapKey<Extract<Config, { scale: ScaleMap }>['scale']>
      | Extract<Config, { scale: ScaleArray }>['scale'][number]
  : DefaultPropScale<Config>;

export type ThematicProps<
  Theme extends AbstractTheme,
  Config extends ThematicConfig<Theme>
> = {
  [key in Config['propName']]?: ResponsiveProp<
    ThematicScaleValue<Theme, Extract<Config, { propName: key }>>
  >;
};
