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

export const colorTable = {
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

export const swatchTable = {
  rows: Object.entries(swatches).map(([key, value]) => ({
    key,
    hexes: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ key }: any) => <Code>theme.colors[{key}-WEIGHT]</Code>,
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
  size: 'Fill',
  render: ({ value }: any) => <Box {...{ [prop]: value }}>{text}</Box>,
});

export const fontFamilyTable = {
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

export const fontWeightTable = {
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

export const fontSizeTable = {
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

export const lineHeightTable = {
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
    createExampleColumn({ text: 'Example Text', prop: 'lineHeight' }),
  ],
};

export const spaceTable = {
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

export const boxShadowTable = {
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
          width="2rem"
          height="2rem"
          borderStyle="solid"
          borderColor="grey"
          borderWidth="1px"
        />
      ),
    },
  ],
};

export const breakpointTable = {
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
