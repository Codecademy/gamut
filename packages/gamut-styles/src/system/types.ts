import { SerializedStyles } from '@emotion/core';
import { Styles } from 'polished/lib/types/style';

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

export type SystemProp<T extends string, K> = Partial<
  Record<T, K | ResponsiveProp<K>>
>;

export type AnyStyle = SerializedStyles | Styles | string;
