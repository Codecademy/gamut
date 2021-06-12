import isPropValid from '@emotion/is-prop-valid';

import { ThemeProps } from '../../../variance/dist';
import { all as allProps } from './config';

const SYSTEM_PROPS = ['mode', 'variant', ...Object.keys(allProps)] as [
  'mode',
  'variant',
  ...[keyof typeof allProps]
];

type SystemProps = typeof SYSTEM_PROPS[number];
export type FilteredProps<T = never> = T | SystemProps;

const shouldForward = <T extends string>(
  prop: T
): prop is Exclude<T, FilteredProps> =>
  isPropValid(prop) &&
  !SYSTEM_PROPS.includes(prop as typeof SYSTEM_PROPS[number]);

export function createStyledOptions<
  Element extends keyof JSX.IntrinsicElements | ThemeProps = 'div',
  Additional extends string = never
>(additional: ReadonlyArray<Additional> = []) {
  return {
    shouldForwardProp: (
      prop: PropertyKey
    ): prop is Exclude<
      Element extends keyof JSX.IntrinsicElements
        ? keyof JSX.IntrinsicElements[Element]
        : keyof Element,
      FilteredProps<Additional>
    > => shouldForward(prop as string) && !additional.includes(prop as any),
  };
}

export const styledOptions = Object.assign(
  createStyledOptions,
  createStyledOptions()
);
