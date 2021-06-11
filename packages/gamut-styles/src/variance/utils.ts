import isPropValid from '@emotion/is-prop-valid';

import { all as allProps } from './config';

const SYSTEM_PROPS = ['mode', 'variant', ...Object.keys(allProps)] as [
  'mode',
  'variant',
  ...[keyof typeof allProps]
];

type AllProps = typeof SYSTEM_PROPS[number];

const shouldForward = <T extends string>(
  prop: T
): prop is Exclude<T, AllProps> =>
  isPropValid(prop) &&
  !SYSTEM_PROPS.includes(prop as typeof SYSTEM_PROPS[number]);

export const styledOptions = Object.assign(
  <Additional extends string>(
    additionalProps: ReadonlyArray<Additional> = []
  ) => ({
    shouldForwardProp: <T extends string>(
      prop: T
    ): prop is Exclude<T, AllProps | Additional> =>
      shouldForward<T>(prop) && !additionalProps.includes(prop as any),
  }),
  {
    shouldForwardProp: shouldForward,
  }
);
