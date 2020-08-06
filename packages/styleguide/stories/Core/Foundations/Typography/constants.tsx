import {
  fontSize,
  fontStack,
  fontWeight,
  lineHeight,
  fontDecoration,
} from '@codecademy/gamut-styles';
import { values, uniq, keys } from 'lodash';

export const headingTypescale = values(fontSize.heading);
export const bodyTypescale = values(fontSize.text);

export const typescale = uniq([...headingTypescale, ...bodyTypescale]);

export const stacks = values(fontStack);
export const stackAlias = keys(fontStack);

export const weights = values(fontWeight);

export const lineHeights = values(lineHeight);

export const decorations = values(fontDecoration);

// export const Controls = {
//   fontSize: {
//     label: 'Font Size',
//     description: 'Modular scale font sizes',
//     defaultValue: typescale[3],
//     control: { type: 'select', options: typescale },
//     table: {
//       defaultValue: { summary: typescale[0] },
//       type: { summary: typescale.join(', ') },
//     },
//   },
//   fontFamily: {
//     label: 'Font Family',
//     description: 'Use based font stacks',
//     defaultValue: stackAlias[0],
//     control: { type: 'select', options: stackAlias },
//     table: {
//       defaultValue: { summary: stackAlias[0] },
//       type: { summary: stackAlias.join(', ') },
//     },
//   },
//   fontWeight: {
//     label: 'Weights',
//     description: 'Aliased font weights',
//     defaultValue: weights[0],
//     control: { type: 'select', options: weights },
//     table: {
//       defaultValue: { summary: weights[0] },
//       type: { summary: weights.join(', ') },
//     },
//   },
//   lineHeight: {
//     label: 'Line Heights',
//     description: 'Line height scales',
//     defaultValue: lineHeights[0],
//     control: {
//       type: 'select',
//       options: lineHeights,
//     },
//     table: {
//       defaultValue: { summary: lineHeights[0] },
//       type: { summary: lineHeights.join(', ') },
//     },
//   },
//   textDecoration: {
//     label: 'Decorations',
//     description: 'Decorations',
//     defaultValue: decorations[0],
//     control: {
//       type: 'select',
//       options: decorations,
//     },
//     table: {
//       defaultValue: { summary: decorations[0] },
//       type: { summary: decorations.join(', ') },
//     },
//   },
//   text: {
//     label: 'Text',
//     description: 'Text to render',
//     defaultValue: 'Hello World',
//     control: {
//       type: 'text',
//     },
//   },
// };
