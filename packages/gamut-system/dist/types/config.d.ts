import { DirectionalProperty, Properties, Property, PropName } from './properties';
import { CSSObject } from './system';
import { SafeLookup, SafeMapKey, WeakRecord } from './utils';
/** Theme Shape  */
declare type BaseTheme = Readonly<{
    readonly [key: string]: any;
}>;
export declare type AbstractTheme = BaseTheme & {
    breakpoints?: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
};
/** Property Scales */
export declare type DefaultPropScale<Config extends AbstractPropertyConfig> = Properties[Config['propName']]['defaultScale'];
export declare type ScaleArray = Readonly<unknown[]>;
export declare type ScaleMap = Readonly<Record<string | number, unknown>>;
export declare type ScaleAlias = Readonly<string>;
export declare type AnyScale = ScaleArray | ScaleMap | ScaleAlias;
export declare type AnyThematicScale<Theme extends AbstractTheme> = ScaleArray | ScaleMap | Readonly<keyof Theme>;
export declare type ThematicScaleValue<Theme extends AbstractTheme, Config extends PropertyConfig<Theme>> = Config['scale'] extends AnyThematicScale<Theme> ? SafeLookup<Theme[Extract<Config, {
    scale: string;
}>['scale']]> | SafeMapKey<Theme[Extract<Config, {
    scale: string;
}>['scale']]> | SafeMapKey<Extract<Config, {
    scale: ScaleMap;
}>['scale']> | Extract<Config, {
    scale: ScaleArray;
}>['scale'][number] : DefaultPropScale<Config>;
/** Property Configurations */
export declare type AbstractPropertyConfig = {
    propName: PropName;
    property?: Property;
    dependentProps?: Readonly<string[]>;
    type?: 'standard' | 'directional';
    scale?: AnyScale;
    transformValue?: (value: any) => string | number;
};
export declare type PropertyConfig<Theme extends AbstractTheme> = AbstractPropertyConfig & {
    scale?: AnyThematicScale<Theme>;
};
/** Responsive Props */
export declare type MediaQueryArray<Value> = [
    Value?,
    Value?,
    Value?,
    Value?,
    Value?,
    Value?
];
export declare type MediaQueryMap<Value> = {
    base?: Value;
    xs?: Value;
    sm?: Value;
    md?: Value;
    lg?: Value;
    xl?: Value;
};
export declare type ResponsiveProp<Value> = Value | MediaQueryArray<Value> | MediaQueryMap<Value>;
/** Prop Shapes */
export declare type AbstractProps = Record<string, unknown>;
export declare type ThematicProps<Theme extends AbstractTheme, Config extends PropertyConfig<Theme>> = WeakRecord<Config['propName'] extends DirectionalProperty ? Properties[Config['propName']]['dependentProps'] | Config['propName'] : Config['propName'], ResponsiveProp<ThematicScaleValue<Theme, Config>>> & {
    theme?: Theme;
};
/** Style Functions */
export declare type StyleTemplate<Props extends AbstractProps> = (props: Props) => CSSObject | undefined;
export declare type HandlerMeta<Props extends AbstractProps> = {
    propNames: Exclude<keyof Props, 'theme'>[];
    styleTemplates: WeakRecord<keyof Props, StyleTemplate<Props>>;
};
export declare type Handler<Props extends AbstractProps> = HandlerMeta<Props> & ((props: Props) => CSSObject);
export declare type HandlerProps<HandlerFn extends (props: AbstractProps) => CSSObject> = Parameters<HandlerFn>[0];
export {};
