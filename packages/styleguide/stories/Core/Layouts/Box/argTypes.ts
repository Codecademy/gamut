import { keys, parseInt } from 'lodash';
import { spacing } from '@codecademy/gamut-styles/src';
import { Box, patterns } from 'gamut-labs/src';

export const boxTypes = {
  ref: { table: { disable: true } },
  theme: { table: { disable: true } },
  padding: {
    control: { type: 'select', options: keys(spacing).map(parseInt) },
  },
};
