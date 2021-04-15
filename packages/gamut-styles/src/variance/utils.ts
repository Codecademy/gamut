import isPropValid from '@emotion/is-prop-valid';

import { all as allProps } from './config';

const baseConfig = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !Object.keys(allProps).includes(prop),
};

export const styledConfig = Object.assign(
  (additionalProps: string[] = []) => ({
    shouldForwardProp: (prop: string) =>
      baseConfig.shouldForwardProp(prop) && !additionalProps.includes(prop),
  }),
  baseConfig
);
