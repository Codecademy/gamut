import { Theme } from '@emotion/react';

import { PropertyTypes } from './properties';

export type AbstractProps = Record<string, unknown>;

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

export type SelectorMap<Props, System> = {
  [K in keyof Props]?: SelectorProps<Props[K], System>;
};

export type SelectorProps<Props, System> = {
  [K in keyof Props]?: K extends keyof System
    ? System[K]
    : K extends keyof PropertyTypes
    ? PropertyTypes[K]
    : Omit<PropertyTypes, keyof System> & Omit<System, 'theme'>;
};
