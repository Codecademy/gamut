import { Theme } from '@emotion/react';

import { AbstractParser, Scale } from './config';
import { CSSPropertyTypes } from './properties';

export type AbstractProps = ThemeProps<Record<string, unknown>>;

interface BreakpointKeys<T = string> {
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}
export interface BreakpointCache {
  map: BreakpointKeys;
  array: string[];
}

export type ThemeProps<Props = {}> = Props & {
  theme?: Theme;
};

export interface MediaQueryArray<T> {
  0?: T;
  1?: T;
  2?: T;
  3?: T;
  4?: T;
  5?: T;
}
export interface MediaQueryMap<T> {
  _?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsiveProp<T> = T | MediaQueryMap<T> | MediaQueryArray<T>;

export interface CSSObject {
  [key: string]: string | number | CSSObject | undefined;
}

export type CSSPropMap<Props, System> = {
  [K in keyof Props]?: CSSProps<Props[K], System>;
};

export type CSSProps<Props, System> = {
  [K in keyof Props]?: K extends keyof System
    ? System[K]
    : K extends keyof CSSPropertyTypes
    ? CSSPropertyTypes[K]
    : Omit<CSSPropertyTypes, keyof System> & Omit<System, 'theme'>;
};

export type StyleProps<
  T extends (args: AbstractProps) => CSSObject
> = Parameters<T>[0];

export type ScaleValue<
  P extends AbstractParser,
  Prop extends keyof P['config']
> = Scale<P['config'][Prop]>;
