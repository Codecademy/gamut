import { SerializedStyles } from '@emotion/core';
import { Styles } from 'polished/lib/types/style';
import { PropAlias } from './constants';

/** System Configuration */
export type ResponsiveProp<T> = {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export type OptionalResponiveProp<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

/** Utility  */
export type NeverUnknown<T> = T extends string
  ? T
  : T extends number
  ? T
  : T extends unknown
  ? never
  : T;

/** Abstract Configurations  */
export type AnyStyle = SerializedStyles | Styles | string;

export type AbstractTheme = Readonly<Partial<Record<string, ScaleShape>>>;

export type PropTemplateType = 'standard' | 'directional';

export type ScaleShape = Readonly<unknown[]>;

export type StyleTemplate<T> = (props: T) => AnyStyle;

export type Handler<T extends Record<string, unknown>> = {
  propNames?: (keyof T)[];
  templateFns?: Record<keyof T, StyleTemplate<T>>;
} & ((props: T, noMedia?: boolean) => AnyStyle);

export type HandlerProps<
  T extends Handler<Record<string, unknown>>
> = Parameters<T>[0];

export type DirectionalConfig = {
  propName: PropAlias;
  altProps?: Readonly<string[]>;
  type: 'directional';
  scale: ScaleShape | Readonly<string>;
  computeValue: (value: ScaleShape[number]) => string | number;
};

export type StandardConfig = {
  propName: PropAlias | Readonly<PropAlias[]>;
  type: 'standard';
  scale: ScaleShape | Readonly<string>;
  computeValue: (value: ScaleShape[number]) => string | number;
};

export type AbstractSystemConfig = StandardConfig | DirectionalConfig;

/** Theme Aware Configurations */

export type ThematicConfig<T extends AbstractTheme> =
  | (StandardConfig & { scale: ScaleShape | Readonly<keyof T> })
  | (DirectionalConfig & { scale: ScaleShape | Readonly<keyof T> });

export type PropKey<T extends AbstractSystemConfig> =
  | Extract<T, { propName: string }>['propName']
  | Extract<T, { propName: Readonly<string[]> }>['propName'][number]
  | Extract<T, { altProps: Readonly<string[]> }>['altProps'][number];

export type SafeLookup<T> = T extends ScaleShape ? T[number] : never;

export type ThematicScaleValue<
  T extends AbstractTheme,
  K extends ThematicConfig<T>
> =
  | NeverUnknown<SafeLookup<T[Extract<K, { scale: string }>['scale']]>>
  | Extract<K, { scale: ScaleShape }>['scale'][number];

export type ThematicProps<
  T extends AbstractTheme,
  K extends ThematicConfig<T>
> = Partial<
  Record<
    PropKey<K>,
    ThematicScaleValue<T, K> | OptionalResponiveProp<ThematicScaleValue<T, K>>
  >
>;
