import { SerializedStyles } from '@emotion/core';
import { Styles } from 'polished/lib/types/style';
import { PropAlias } from './style/constants';

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
export type AnyStyle = SerializedStyles | Styles | string;

/** Abstract Configurations  */
export type AbstractTheme = Record<string, ScaleShape>;

export type PropTemplateType = 'standard' | 'directional';

export type ScaleShape = Readonly<unknown[]>;

export type Handler<T> = (props: T, noMedia?: boolean) => AnyStyle;

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

export type ThematicScaleValue<
  T extends AbstractTheme,
  K extends ThematicConfig<T>
> =
  | T[Extract<K, { scale: string }>['scale']][number]
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
