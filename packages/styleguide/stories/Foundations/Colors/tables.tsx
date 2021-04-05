import {
  brandColors,
  deprecatedColors,
  editorColors,
  interactiveColors,
  platformColors,
  swatches,
  trueColors,
} from '@codecademy/gamut-styles';
import { isString } from 'lodash';
import React from 'react';

import { Code, ColorScale } from '../../../.storybook/components';

export const excludedColors = ['black', 'white', 'beige', 'royalBlue'];

const createColorTable = (prefix: string, colors: any) => {
  return {
    rows: Object.entries(colors).map(([id, value]) => ({
      id,
      hex: value,
    })),
    columns: [
      {
        key: 'id',
        name: 'Variable',
        size: 'xl',
        render: ({ id, hex }: any) => {
          const name = isString(hex)
            ? `$${prefix}-${id}`
            : `$${prefix}-${id}-#{WEIGHT}`;
          return <Code>{name}</Code>;
        },
      },
      {
        key: 'swatch',
        name: 'Swatch',
        size: 'fill',
        render: ({ hex }: any) => {
          const colors = isString(hex) ? { hex } : hex;
          return <ColorScale colors={colors} />;
        },
      },
    ],
  };
};

export const brand = createColorTable('brand', brandColors);
export const editor = createColorTable('color-editor', editorColors);
export const platform = createColorTable('platform', platformColors);
export const deprecated = createColorTable('color', deprecatedColors);
export const interactive = createColorTable(
  'color-interactive',
  interactiveColors
);
export const standard = createColorTable('color', trueColors);
export const swatch = createColorTable('color', swatches);
