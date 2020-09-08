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

export type PropTemplateType = 'standard' | 'directional';

export type PropKey<T extends AbstractSystemConfig> =
  | Extract<T, { propName: string }>['propName']
  | Extract<T, { propName: Readonly<string[]> }>['propName'][number]
  | Extract<T, { altProps: Readonly<string[]> }>['altProps'][number];

export type ScaleShape = Readonly<unknown[]>;

export type DirectionalConfig = {
  propName: PropAlias;
  altProps?: Readonly<string[]>;
  type: 'directional';
  scale: ScaleShape;
  computeValue: (value: ScaleShape[number]) => string | number;
};

export type StandardConfig = {
  propName: PropAlias | Readonly<PropAlias[]>;
  type: 'standard';
  scale: ScaleShape;
  computeValue: (value: ScaleShape[number]) => string | number;
};

export type AbstractSystemConfig = StandardConfig | DirectionalConfig;

export type SystemProps<T extends AbstractSystemConfig> = Partial<
  Record<
    PropKey<T>,
    OptionalResponiveProp<T['scale'][number]> | T['scale'][number]
  >
>;

/** Utility  */
export type AnyStyle = SerializedStyles | Styles | string;
