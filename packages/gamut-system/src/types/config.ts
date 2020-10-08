import { DirectionalProperties, Props } from './properties';
import { CSSObject } from '@emotion/core';
import { SafeLookup, SafeMapKey, WeakRecord } from './utils';

/** System Configuration */
export type MediaQueryArray<Value> = [
  Value?,
  Value?,
  Value?,
  Value?,
  Value?,
  Value?
];

export type MediaQueryMap<Value> = {
  base?: Value;
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

/** Abstract Configurations  */
export type PropAlias = Readonly<keyof Props>;

type BaseTheme = Readonly<WeakRecord<string, ScaleArray | ScaleMap>>;

export type AbstractTheme = BaseTheme & {
  breakpoints?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

export type AbstractProps = Record<string, unknown>;

export type StyleTemplate<Props extends AbstractProps> = (
  props: Props
) => CSSObject | undefined;

export type HandlerMeta<Props extends AbstractProps> = {
  propNames: Exclude<keyof Props, 'theme'>[];
  styleTemplates: WeakRecord<keyof Props, StyleTemplate<Props>>;
};

export type Handler<Props extends AbstractProps> = HandlerMeta<Props> &
  ((props: Props) => CSSObject);

export type HandlerProps<HandlerFn extends Handler<AbstractProps>> = Parameters<
  HandlerFn
>[0];

export type PropTemplateType = 'standard' | 'directional';

export type TransformValue = (value: any) => string | number;

/** Property Scales */

export type ScaleArray = Readonly<unknown[]>;

export type ScaleMap = Readonly<Record<string | number, unknown>>;

export type ScaleAlias = Readonly<string>;

export type AnyScale = ScaleArray | ScaleMap | ScaleAlias;
export type AnyThematicScale<Theme extends AbstractTheme> =
  | ScaleArray
  | ScaleMap
  | Readonly<keyof Theme>;

/**  */
export type AbstractPropertyConfig = {
  propName: PropAlias;
  dependentProps?: Readonly<string[]>;
  type?: 'standard' | 'directional';
  scale?: AnyScale;
  computeValue?: TransformValue;
};

export type PropertyConfig<
  Theme extends AbstractTheme
> = AbstractPropertyConfig & {
  scale?: AnyThematicScale<Theme>;
};

export type PropKey<Config extends AbstractPropertyConfig> =
  | Config['propName']
  | Extract<
      Config,
      { dependentProps: Readonly<string[]> }
    >['dependentProps'][number];

/** Standard CSS Property Types */
export type DefaultPropScale<
  Config extends AbstractPropertyConfig
> = Props[Config['propName']]['defaultValue'];

export type ThematicScaleValue<
  Theme extends AbstractTheme,
  Config extends PropertyConfig<Theme>
> = Config['scale'] extends AnyThematicScale<Theme>
  ?
      | SafeLookup<Theme[Extract<Config, { scale: string }>['scale']]>
      | SafeMapKey<Theme[Extract<Config, { scale: string }>['scale']]>
      | SafeMapKey<Extract<Config, { scale: ScaleMap }>['scale']>
      | Extract<Config, { scale: ScaleArray }>['scale'][number]
  : DefaultPropScale<Config>;

export type ThematicProps<
  Theme extends AbstractTheme,
  Config extends PropertyConfig<Theme>
> = WeakRecord<
  Config['propName'] extends DirectionalProperties
    ? Props[Config['propName']]['dependentProps'] | Config['propName']
    : Config['propName'],
  ResponsiveProp<ThematicScaleValue<Theme, Config>>
>;
