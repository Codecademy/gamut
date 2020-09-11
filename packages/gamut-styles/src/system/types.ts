import { SerializedStyles } from '@emotion/core';
import { Styles } from 'polished/lib/types/style';
import { PropAlias } from './constants';

/** System Configuration */
export type MediaQueryArray<T> =
  | [T | undefined]
  | [T | undefined, T | undefined]
  | [T | undefined, T | undefined, T | undefined]
  | [T | undefined, T | undefined, T | undefined, T | undefined]
  | [T | undefined, T | undefined, T | undefined, T | undefined, T | undefined];

export type MediaQueryMap<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export type ResponiveProp<T> = MediaQueryArray<T> | MediaQueryMap<T>;

/** Utility  */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type NeverUnknown<T> = T extends string
  ? T
  : T extends number
  ? T
  : T extends unknown
  ? never
  : T;

export type SafeLookup<T> = T extends Readonly<unknown[]> ? T[number] : never;
export type SafeMapKey<T> = T extends Readonly<Record<string, unknown>>
  ? keyof T
  : never;

/** Abstract Configurations  */
export type AnyStyle = SerializedStyles | Styles | string;

export type AbstractTheme = Readonly<Partial<Record<string, ScaleArray>>>;

export type ScaleArray = Readonly<unknown[]>;

export type ScaleMap = Readonly<Record<string, unknown>>;

export type AbstractScales = ScaleArray | ScaleMap | Readonly<string>;

export type AbstractProps = Record<string, unknown>;

export type StyleTemplate<T extends AbstractProps> = (props: T) => AnyStyle;

export type TemplateMap<T extends AbstractProps> = Partial<
  Record<keyof T, StyleTemplate<T>>
>;

export type HandlerConfig<T extends AbstractProps> = {
  propName: keyof T;
  altProps?: (keyof T)[];
  templateFn: StyleTemplate<T>;
};

export type Handler<T extends AbstractProps> = {
  propNames?: (keyof T)[];
  templateFns?: TemplateMap<T>;
} & ((props: T) => AnyStyle);

export type HandlerProps<T extends Handler<AbstractProps>> = Parameters<T>[0];

export type PropTemplateType = 'standard' | 'directional';

export type TransformValue = (value: unknown) => string | number;

export type DirectionalConfig = {
  propName: PropAlias;
  altProps?: Readonly<string[]>;
  type: 'directional';
  scale: AbstractScales;
  computeValue?: TransformValue;
};

export type StandardConfig = {
  propName: PropAlias | Readonly<PropAlias[]>;
  type?: 'standard';
  scale: AbstractScales;
  computeValue?: TransformValue;
};

export type AbstractSystemConfig = StandardConfig | DirectionalConfig;

/** Theme Aware Configurations */

export type ThematicConfig<T extends AbstractTheme> =
  | (StandardConfig & { scale: ScaleArray | ScaleMap | Readonly<keyof T> })
  | (DirectionalConfig & { scale: ScaleArray | ScaleMap | Readonly<keyof T> });

export type PropKey<T extends AbstractSystemConfig> =
  | Extract<T, { propName: string }>['propName']
  | Extract<T, { propName: Readonly<string[]> }>['propName'][number]
  | Extract<T, { altProps: Readonly<string[]> }>['altProps'][number];

export type ThematicScaleValue<
  T extends AbstractTheme,
  K extends ThematicConfig<T>
> =
  | NeverUnknown<SafeLookup<T[Extract<K, { scale: string }>['scale']]>>
  | SafeMapKey<Extract<K, { scale: ScaleMap }>['scale']>
  | Extract<K, { scale: ScaleArray }>['scale'][number];

export type ThematicProps<
  T extends AbstractTheme,
  K extends ThematicConfig<T>
> = {
  [key in PropKey<K>]?:
    | ThematicScaleValue<T, K>
    | ResponiveProp<ThematicScaleValue<T, K>>;
};
