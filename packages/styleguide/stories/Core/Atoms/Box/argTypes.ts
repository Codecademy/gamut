import { spacing } from '@codecademy/gamut-styles/src';
import { keys, parseInt } from 'lodash';

export const boxTypes = {
  ref: { table: { disable: true } },
  padding: {
    control: { type: 'select', options: keys(spacing).map(parseInt) },
  },
};
