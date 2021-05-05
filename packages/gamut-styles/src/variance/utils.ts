import isPropValid from '@emotion/is-prop-valid';

import { all as allProps } from './config';

const SYSTEM_PROPS = ['mode', 'variant', ...Object.keys(allProps)];

const baseConfig = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !SYSTEM_PROPS.includes(prop),
};

export const styledConfig = Object.assign(
  (additionalProps: string[] = []) => ({
    shouldForwardProp: (prop: string) =>
      baseConfig.shouldForwardProp(prop) && !additionalProps.includes(prop),
  }),
  baseConfig
);

const STRING_OR_NUMBER: Record<string | number, string> = {};
const NUMBER: Record<number, string> = {};
const STRING: Record<string, string> = {};

export const scales = {
  STRING_OR_NUMBER,
  NUMBER,
  STRING,
};
