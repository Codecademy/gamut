import {
  brandColors,
  deprecatedColors,
  editorColors,
  platformColors,
} from '@codecademy/gamut-styles';
import { isString } from 'lodash';
import React from 'react';

import { Code, ColorScale } from '~styleguide/blocks';

type Colors = ColorScale | Record<string, ColorScale | string>;

type ColorScale = Record<string | number, string>;

type HexShape = { id: string; hex: string };

const createColorTable = (prefix: string, colors: Colors) => {
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
        render: ({ id, hex }: HexShape) => {
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
        render: ({ hex }: HexShape) => {
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
