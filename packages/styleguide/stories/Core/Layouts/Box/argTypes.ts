import { keys } from 'lodash';
import { spacing } from '@codecademy/gamut-styles';

export const boxTypes = {
  ref: { table: { disable: true } },
  theme: { table: { disable: true } },
  padding: { control: { type: 'select', options: keys(spacing) } },
};
