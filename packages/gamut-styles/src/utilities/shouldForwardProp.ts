import isPropValid from '@emotion/is-prop-valid';

import { systemProps } from '../props/config';

const allSystemProps = Object.keys(systemProps);

export const shouldForwardProp = (prop: string) =>
  isPropValid(prop) && !allSystemProps.includes(prop);
