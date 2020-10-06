import { Props } from './properties';
import { CSSObject } from '@emotion/core';
/** System Configuration */
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
/** Utility  */
export declare type UnionToIntersection<Union> = (Union extends any ? (k: Union) => void : never) extends (k: infer Intersection) => void ? Intersection : never;
export declare type NeverUnknown<Value> = Value extends string ? Value : Value extends number ? Value : Value extends unknown ? never : Value;
export declare type SafeLookup<MaybeArray> = MaybeArray extends Readonly<unknown[]> ? MaybeArray[number] : never;
export declare type SafeMapKey<MaybeMap> = MaybeMap extends Readonly<Record<string, unknown>> ? keyof MaybeMap : never;
/** Abstract Configurations  */
export declare type PropAlias = Readonly<keyof Props>;
declare type BaseTheme = Readonly<Partial<Record<string, ScaleArray | ScaleMap>>>;
export declare type AbstractTheme = BaseTheme & {
    breakpoints?: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
};
export declare type ScaleArray = Readonly<unknown[]>;
export declare type ScaleMap = Readonly<Record<string | number, unknown>>;
export declare type AbstractScales = ScaleArray | ScaleMap | Readonly<string>;
export declare type AbstractProps = Record<string, unknown>;
export declare type StyleTemplate<Props extends AbstractProps> = (props: Props) => CSSObject | undefined;
export declare type TemplateMap<Props extends AbstractProps> = Partial<Record<keyof Props, StyleTemplate<Props>>>;
export declare type Handler<Props extends AbstractProps> = {
    propNames: (keyof Props)[];
    templateFns: TemplateMap<Props>;
} & ((props: Props) => CSSObject);
export declare type HandlerProps<HandlerFn extends Handler<AbstractProps>> = Parameters<HandlerFn>[0];
export declare type PropTemplateType = 'standard' | 'directional';
export declare type TransformValue = (value: any) => string | number;
export declare type AbstractPropertyConfig = {
    propName: PropAlias;
    altProps?: Readonly<string[]>;
    type?: 'standard' | 'directional';
    scale?: AbstractScales;
    computeValue?: TransformValue;
};
/** Theme Aware Configurations */
export declare type PropertyConfig<Theme extends AbstractTheme> = AbstractPropertyConfig & {
    scale?: ScaleArray | ScaleMap | Readonly<keyof Theme>;
};
export declare type PropKey<Config extends AbstractPropertyConfig> = Config['propName'] | Extract<Config, {
    altProps: Readonly<string[]>;
}>['altProps'][number];
export declare type GetAltProps<Config extends AbstractPropertyConfig> = Extract<Props[Config['propName']], {
    altProps: string;
}>['altProps'];
/** Standard CSS Property Types */
export declare type DefaultPropScale<Config extends AbstractPropertyConfig> = Config['propName'] extends PropAlias[] ? Props[Config['propName'][number]]['defaultValue'] : Config['propName'] extends PropAlias ? Props[Config['propName']]['defaultValue'] : never;
export declare type ThematicScaleValue<Theme extends AbstractTheme, Config extends PropertyConfig<Theme>> = Config['scale'] extends AbstractScales ? NeverUnknown<SafeLookup<Theme[Extract<Config, {
    scale: string;
}>['scale']]>> | NeverUnknown<SafeMapKey<Theme[Extract<Config, {
    scale: string;
}>['scale']]>> | SafeMapKey<Extract<Config, {
    scale: ScaleMap;
}>['scale']> | Extract<Config, {
    scale: ScaleArray;
}>['scale'][number] : DefaultPropScale<Config>;
export declare type ThematicProps<Theme extends AbstractTheme, Config extends PropertyConfig<Theme>> = {
    [key in Config['propName']]?: ResponsiveProp<ThematicScaleValue<Theme, Extract<Config, {
        propName: key;
    }>>>;
};
export {};
