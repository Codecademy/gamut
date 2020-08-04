import { FontSizes, TextSizes } from '@codecademy/gamut/src';
import { fontSize } from '@codecademy/gamut-styles';
import { values, uniq } from 'lodash';

export const headingSizes: FontSizes[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
  'xxs',
];
export const textSizes: TextSizes[] = ['lg', 'md', 'sm'];

export const typescale = uniq([
  ...values(fontSize.heading),
  ...values(fontSize.text),
]);
