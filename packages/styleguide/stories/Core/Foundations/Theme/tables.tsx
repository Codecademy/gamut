import { swatches, theme, trueColors } from '@codecademy/gamut-styles';
import React from 'react';

import { Box, Code, ColorScale } from '../../../../.storybook/components';

const PROP_COLUMN = {
  key: 'key',
  name: 'Prop',
  size: 'md',
  render: ({ key }: any) => <Code>{key}</Code>,
};

const VALUE_COLUMN = {
  key: 'value',
  name: 'Value',
  size: 'lg',
  render: ({ value }: any) => <Code>{value}</Code>,
};

const PATH_COLUMN = {
  key: 'path',
  name: 'Path',
  size: 'lg',
};

export const color = {
  rows: Object.entries(trueColors).map(([key, value]) => ({
    key,
    hex: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.colors.{key}</Code>,
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
  rows: Object.entries(swatches).map(([key, value]) => ({
    key,
    hexes: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.colors['{key}-WEIGHT']</Code>,
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
  rows: Object.entries(theme.fontFamily).map(([key, value]) => ({
    key,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.fontFamily.{key}</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({ text: 'Example Text', prop: 'fontFamily' }),
  ],
};

export const fontWeight = {
  rows: Object.entries(theme.fontWeight).map(([key, value]) => ({
    key,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.fontWeight.{key}</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({ text: 'Example Text', prop: 'fontWeight' }),
  ],
};

export const fontSize = {
  rows: Object.entries(theme.fontSize).map(([key, value]) => ({
    key,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.fontSize[{key}]</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({ text: 'Example Text', prop: 'fontSize' }),
  ],
};

const longExampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

export const lineHeight = {
  rows: Object.entries(theme.lineHeight).map(([key, value]) => ({
    key,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.lineHeight[{key}]</Code>,
    },
    VALUE_COLUMN,
    createExampleColumn({
      text: longExampleText,
      prop: 'lineHeight',
    }),
  ],
};

export const space = {
  rows: Object.entries(theme.spacing).map(([key, value]) => ({
    key,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.spacing[{key}]</Code>,
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
  rows: Object.entries(theme.boxShadows).map(([key, value]) => ({
    key,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.boxShadows[{key}]</Code>,
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
  rows: Object.entries(theme.breakpoints).map(([key, value]) => ({
    key,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.breakpoints[{key}]</Code>,
    },
    { ...VALUE_COLUMN, size: 'fill' },
  ],
};
