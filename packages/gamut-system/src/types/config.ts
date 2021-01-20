import {
  DirectionalProperty,
  Properties,
  Property,
  PropName,
} from './properties';
import { CSSObject } from './system';
import { SafeLookup, SafeMapKey, WeakRecord } from './utils';

/** Theme Shape  */

interface BaseTheme {
  readonly [key: string]: any;
}

export interface AbstractTheme extends BaseTheme {
  breakpoints?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

/** Property Scales */
export type DefaultPropScale<
  Config extends AbstractPropertyConfig
> = Properties[Config['propName']]['defaultScale'];

export type ScaleArray = readonly unknown[];

export interface ScaleMap {
  readonly [key: string]: unknown;
  readonly [key: number]: unknown;
}

export type ScaleAlias = Readonly<string>;

export type AnyScale = ScaleArray | ScaleMap | ScaleAlias;

export type AnyThematicScale<Theme extends AbstractTheme> =
  | ScaleArray
  | ScaleMap
  | Readonly<keyof Theme>;

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

/** Property Configurations */

export interface AbstractPropertyConfig {
  propName: PropName;
  property?: Property;
  dependentProps?: Readonly<string[]>;
  type?: 'standard' | 'directional';
  scale?: AnyScale;
  transformValue?: (value: any) => string | number;
}

export type PropertyConfig<
  Theme extends AbstractTheme
> = AbstractPropertyConfig & {
  scale?: AnyThematicScale<Theme>;
};

/** Responsive Props */

export type MediaQueryArray<Value> = [
  Value?,
  Value?,
  Value?,
  Value?,
  Value?,
  Value?
];

export interface MediaQueryMap<Value> {
  base?: Value;
  xs?: Value;
  sm?: Value;
  md?: Value;
  lg?: Value;
  xl?: Value;
}

export type ResponsiveProp<Value> =
  | Value
  | MediaQueryArray<Value>
  | MediaQueryMap<Value>;

/** Prop Shapes */

export interface AbstractProps {
  [key: string]: unknown;
}

export type ThematicProps<
  Theme extends AbstractTheme,
  Config extends PropertyConfig<Theme>
> = WeakRecord<
  Config['propName'] extends DirectionalProperty
    ? Properties[Config['propName']]['dependentProps'] | Config['propName']
    : Config['propName'],
  ResponsiveProp<ThematicScaleValue<Theme, Config>>
> & { theme?: Theme };

/** Style Functions */

export type StyleTemplate<Props extends AbstractProps> = (
  props: Props
) => CSSObject | undefined;

export interface HandlerMeta<Props extends AbstractProps> {
  propNames: Exclude<keyof Props, 'theme'>[];
  styleTemplates: WeakRecord<keyof Props, StyleTemplate<Props>>;
}

export interface Handler<Props extends AbstractProps>
  extends HandlerMeta<Props> {
  (props: Props): CSSObject;
}
export type HandlerProps<
  HandlerFn extends (props: AbstractProps) => CSSObject
> = Parameters<HandlerFn>[0];
