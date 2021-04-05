import { Theme } from '@emotion/react';
import { intersection } from 'lodash';

import { AbstractPropTransformer } from '../types/config';
import {
  BreakpointCache,
  CSSObject,
  MediaQueryMap,
  ThemeProps,
} from '../types/props';

const BREAKPOINT_KEYS = ['_', 'xs', 'sm', 'md', 'lg', 'xl'];

/**
 * Destructures the themes breakpoints into an ordered structure to traverse
 */
export const parseBreakpoints = ({ breakpoints }: Theme): BreakpointCache => {
  const { xs, sm, md, lg, xl } = breakpoints;
  return {
    map: breakpoints,
    array: [xs, sm, md, lg, xl],
  };
};

export const isMediaArray = (val: unknown): val is (string | number)[] =>
  Array.isArray(val);

export const isMediaMap = (
  val: object
): val is MediaQueryMap<string | number> =>
  intersection(Object.keys(val), BREAKPOINT_KEYS).length > 0;

interface ResponsiveParser<
  Bp extends MediaQueryMap<string | number> | (string | number)[]
> {
  <C extends AbstractPropTransformer>(
    value: Bp,
    props: ThemeProps,
    config: C,
    breakpoints: Bp
  ): CSSObject;
}

export const objectParser: ResponsiveParser<MediaQueryMap<string | number>> = (
  value,
  props,
  config,
  breakpoints
) => {
  const styles: CSSObject = {};
  const { styleFn, prop } = config;
  const { _, ...rest } = value;
  // the keyof 'base' is base styles
  if (_) Object.assign(styles, styleFn(_, prop, props));

  // Map over remaining keys and merge the corresponding breakpoint styles
  // for that property.
  Object.keys(rest).forEach((bp: keyof typeof rest) => {
    const breakpointKey = breakpoints?.[bp];
    if (!breakpointKey) return;
    Object.assign(styles, {
      [breakpointKey]: styleFn(rest[bp], prop, props),
    });
  });

  return styles;
};

export const arrayParser: ResponsiveParser<(string | number)[]> = (
  value,
  props,
  config,
  breakpoints
): CSSObject => {
  const styles: CSSObject = {};
  const { styleFn, prop } = config;
  const [_, ...rest] = value;
  // the first index is base styles
  if (_) Object.assign(styles, styleFn(_, prop, props));

  // Map over each value in the array and merge the corresponding breakpoint styles
  // for that property.
  rest.forEach((val, i) => {
    const breakpointKey = breakpoints[i];
    if (!breakpointKey) return;
    Object.assign(styles, {
      [breakpointKey]: styleFn(val, prop, props),
    });
  });

  return styles;
};
