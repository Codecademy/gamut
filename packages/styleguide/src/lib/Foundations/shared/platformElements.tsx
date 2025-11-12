import {
  Background,
  platformEditorColors,
  platformSwatches,
  platformTheme,
  truePlatformColors,
} from '@codecademy/gamut-styles';

import { Code, ColorScale, TokenTable } from '~styleguide/blocks';

import { applyCorrectNotation } from './applyCorrectNotation';
import { PATH_COLUMN, PROP_COLUMN } from './elements';

export const platformSwatch = {
  rows: Object.entries(platformSwatches).map(([id, value]) => ({
    id,
    hexes: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id, hexes }: any) => (
        <Code>
          theme.colors[&apos;{id}-{Object.keys(hexes)[0]}&apos;]
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

export const platformColor = {
  rows: Object.entries(truePlatformColors).map(([id, value]) => ({
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

export const platformEditorColor = {
  rows: Object.entries(platformEditorColors).map(([id, value]) => ({
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
      render: ({ hex }: any) => <ColorScale colors={{ hex }} />,
    },
  ],
};

export const platformLightMode = {
  rows: Object.entries(platformTheme.modes.light).map(([id, value]) => ({
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
            hex: platformTheme.colors[
              hex as keyof (typeof platformTheme)['colors']
            ],
          }}
        />
      ),
    },
  ],
};

export const platformDarkMode = {
  rows: Object.entries(platformTheme.modes.dark).map(([id, value]) => ({
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
            hex: platformTheme.colors[
              hex as keyof (typeof platformTheme)['colors']
            ],
          }}
        />
      ),
    },
  ],
};

export const PlatformLightModeTable = () => (
  <Background bg="white">
    <TokenTable bg={false} {...(platformLightMode as any)} />
  </Background>
);

export const PlatformDarkModeTable = () => (
  <Background bg="navy">
    <TokenTable bg={false} {...(platformDarkMode as any)} />
  </Background>
);
