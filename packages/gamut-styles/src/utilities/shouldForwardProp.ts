import isPropValid from '@emotion/is-prop-valid';

import { properties } from '../props';

const allProps = Object.keys(properties).reduce<string[]>(
  (carry, prop: keyof typeof properties) => {
    return [...carry, ...properties[prop].propNames];
  },
  []
);

export const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !allProps.includes(prop);
