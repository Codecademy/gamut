import { CSSObject } from '@emotion/core';

import { SystemBreakpoints } from './breakpoints';
import { Props } from './defaults';
import {
  AbstractProps,
  AbstractScales,
  ScaleArray,
  ScaleMap,
  SystemTheme,
} from './theme';

export type ComputeValue = (value: any) => string | number;

export type PropAlias = keyof Props;

export type ResponsiveProp<Breakpoints extends SystemBreakpoints, Value> =
  | Value
  | Value[] // todo: limit in size
  | Breakpoints;

export type AbstractPropertyConfig<
  BoundPropNames extends string[] = string[]
> = {
  boundProps?: BoundPropNames;
  computeValue?: ComputeValue;
  propName: PropAlias;
  scale?: AbstractScales;
  type?: 'standard' | 'directional';
};

export type PropertyConfig<
  Breakpoints extends SystemBreakpoints = SystemBreakpoints,
  Theme extends SystemTheme<Breakpoints> = SystemTheme<Breakpoints>,
  BoundPropNames extends string[] = string[]
> = AbstractPropertyConfig<BoundPropNames> & {
  scale?: ScaleArray | ScaleMap | Readonly<keyof Theme>;
};

export type ResponsiveProperty<Props extends AbstractProps> = (
  props: Props
) => CSSObject;

export type ResponsivePropertyFactory<
  Props extends AbstractProps
> = ResponsiveProperty<Props> & {
  propNames: (keyof Props)[];
  templates: unknown;
};
