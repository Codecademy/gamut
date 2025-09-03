import { Box } from '@codecademy/gamut';
import {
  Background,
  percipioColors,
  percipioTheme,
} from '@codecademy/gamut-styles';

import { Code, ColorScale, TokenTable } from '~styleguide/blocks';

import { applyCorrectNotation } from './applyCorrectNotation';
import {
  createExampleColumn,
  PATH_COLUMN,
  PROP_COLUMN,
  VALUE_COLUMN,
} from './elements';

export const percipioColor = {
  rows: Object.entries(percipioColors).map(([id, value]) => ({
    id,
    hex: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => (
        <Code>theme.colors{applyCorrectNotation({ id })}</Code>
      ),
    },
    {
      key: 'swatch',
      name: 'Swatch',
      size: 'fill',
      render: ({ hex }: any) => <ColorScale colors={{ hex }} />,
    },
  ],
};

export const percipioLightMode = {
  rows: Object.entries(percipioTheme.modes.light).map(([id, value]) => ({
    id,
    hex: value,
  })),
  columns: [
    { ...PROP_COLUMN, size: 'lg' },
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => (
        <Code>theme.colors{applyCorrectNotation({ id })}</Code>
      ),
    },
    {
      key: 'swatch',
      name: 'Swatch',
      size: 'fill',
      render: ({ hex }: any) => (
        <ColorScale
          colors={{
            hex: percipioTheme.colors[
              hex as keyof (typeof percipioTheme)['colors']
            ],
          }}
        />
      ),
    },
  ],
};

export const PercipioLightModeTable = () => (
  <Background bg="white">
    <TokenTable bg={false} {...(percipioLightMode as any)} />
  </Background>
);

export const percipioFontFamily = {
  rows: Object.entries(percipioTheme.fontFamily).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      size: 'xl',
      render: ({ id }: any) => <Code>theme.fontFamily.{id}</Code>,
    },
    {
      ...VALUE_COLUMN,
      render: ({ value }: any) => (
        <Box maxWidth="24rem">
          <Code>{value.split(',')[0]}</Code>
        </Box>
      ),
      size: 'lg',
    },
    {
      ...createExampleColumn({ text: 'Example Text', prop: 'fontFamily' }),
      size: 'fill',
    },
  ],
};
