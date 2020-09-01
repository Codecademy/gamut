import { SerializedStyles } from '@emotion/core';
import { Styles } from 'polished/lib/types/style';

export type ResponsiveProp<T> = {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export type AnyStyle = SerializedStyles | Styles | string;
