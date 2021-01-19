import { swatches, theme, trueColors } from '@codecademy/gamut-styles';
import React from 'react';

import { Box, Code, ColorScale } from '../../../../.storybook/components';

const PROP_COLUMN = {
  key: 'key',
  name: 'Prop',
  size: 'md',
  render: ({ id }: any) => <Code>{id}</Code>,
};

const VALUE_COLUMN = {
  key: 'value',
  name: 'Value',
  size: 'xl',
  render: ({ value }: any) => <Code>{value}</Code>,
};

const PATH_COLUMN = {
  key: 'path',
  name: 'Path',
  size: 'xl',
};

export const color = {
  rows: Object.entries(trueColors).map(([id, value]) => ({
    id,
    hex: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.colors.{id}</Code>,
    },
    {
      key: 'swatch',
      name: 'Swatch',
      size: 'fill',
      render: ({ hex }: any) => <ColorScale colors={{ hex }} />,
    },
  ],
};

export const swatch = {
  rows: Object.entries(swatches).map(([id, value]) => ({
    id,
    hexes: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id, hexes }: any) => (
        <Code>
          theme.colors['{id}-{Object.keys(hexes)[0]}']
        </Code>
      ),
    },
    {
      key: 'swatch',
      name: 'Swatch',
      size: 'fill',
      render: ({ hexes }: { hexes: Record<string, string> }) => (
        <ColorScale colors={hexes} />
      ),
    },
  ],
};

const createExampleColumn = ({
  text,
  prop,
}: {
  text: string;
  prop: string;
}) => ({
  key: 'example',
  name: 'Example',
  size: 'fill',
  render: ({ value }: any) => <Box {...{ [prop]: value }}>{text}</Box>,
});

export const fontFamily = {
  rows: Object.entries(theme.fontFamily).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.fontFamily.{id}</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({ text: 'Example Text', prop: 'fontFamily' }),
  ],
};

export const fontWeight = {
  rows: Object.entries(theme.fontWeight).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.fontWeight.{id}</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({ text: 'Example Text', prop: 'fontWeight' }),
  ],
};

export const fontSize = {
  rows: Object.entries(theme.fontSize).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.fontSize[{id}]</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({ text: 'Example Text', prop: 'fontSize' }),
  ],
};

const longExampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

export const lineHeight = {
  rows: Object.entries(theme.lineHeight).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.lineHeight[{id}]</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({
      text: longExampleText,
      prop: 'lineHeight',
    }),
  ],
};

export const space = {
  rows: Object.entries(theme.spacing).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.spacing[{id}]</Code>,
    },
    VALUE_COLUMN,
    {
      key: 'example',
      name: 'Example',
      size: 'fill',
      render: ({ value }: any) => (
        <Box
          display="inline-block"
          height="1rem"
          width={value}
          backgroundColor={theme.colors['blue-300']}
        />
      ),
    },
  ],
};

export const boxShadow = {
  rows: Object.entries(theme.boxShadows).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.boxShadows[{id}]</Code>,
    },
    {
      ...VALUE_COLUMN,
      size: 'fill',
    },
    {
      key: 'example',
      name: 'Example',
      size: 'md',
      render: ({ value }: any) => (
        <Box
          boxShadow={value}
          width="1.5rem"
          height="1.5rem"
          borderStyle="solid"
          borderColor="grey"
          borderWidth="1px"
          marginBottom="2rem"
        />
      ),
    },
  ],
};

export const breakpoint = {
  rows: Object.entries(theme.breakpoints).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.breakpoints[{id}]</Code>,
    },
    { ...VALUE_COLUMN, size: 'fill' },
  ],
};
