import { ThemeProps } from '@codecademy/variance';
import isPropValid from '@emotion/is-prop-valid';
import type React from 'react';

import { all as allProps } from './config';

const allPropnames = ['mode', 'variant', ...Object.keys(allProps)] as [
  'mode',
  'variant',
  ...[keyof typeof allProps]
];

/**
 * Emotion will not attempt to forward all system props - so this pre filters all possible exceptions to search agains
 * props like `color` and `width`.
 */
const validPropnames = allPropnames.filter(isPropValid);

export type SystemPropNames = (typeof allPropnames)[number];

export type ElementOrProps = keyof React.JSX.IntrinsicElements | ThemeProps;
export type ForwardableProps<El extends ElementOrProps, Additional> = Exclude<
  El extends keyof React.JSX.IntrinsicElements
    ? keyof React.JSX.IntrinsicElements[El]
    : keyof Element,
  Additional | SystemPropNames
>;

export function createStyledOptions<
  El extends ElementOrProps = 'div',
  Additional extends string = never
>(additional: readonly Additional[] = []) {
  // Cache possible valid prop names to prevent searching a larger list.
  const additionalExclusions = additional.filter(isPropValid);
  return {
    shouldForwardProp: (
      prop: PropertyKey
    ): prop is ForwardableProps<El, Additional> =>
      isPropValid(prop as string) &&
      !validPropnames.includes(prop as SystemPropNames) &&
      !additionalExclusions.includes(prop as Additional),
  };
}

/**
 * @description
 * This object can be passed to the second argument of `styled('div', styledOptions)` or be called as a function to filter additional prop names
 * If you are extending a component that already has filtered props - you do not need to provide additional guards if  you are not passing additional props
 * @example
 * import { styledOptions } from '@codecademy/gamut-styles';
 * // default case for divs
 * styled('div', styledOptions)();
 * // elements other than div
 * styled('svg', styledOptions<'svg'>())();
 * // additional non system props to filter
 * styled('div', styledOptions(['data-invalidsomething']))();
 * // Extending existing components
 * styled(Box)()
 *
 */
export const styledOptions = Object.assign(
  createStyledOptions,
  createStyledOptions()
);
