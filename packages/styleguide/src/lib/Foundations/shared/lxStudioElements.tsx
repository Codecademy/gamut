import { Box } from '@codecademy/gamut';
import {
  Background,
  GamutProvider,
  lxStudioColors,
  lxStudioTheme,
} from '@codecademy/gamut-styles';

import { Code, ColorScale, TokenTable } from '~styleguide/blocks';

import {
  createExampleColumn,
  PATH_COLUMN,
  PROP_COLUMN,
  VALUE_COLUMN,
} from './elements';

export const lxStudioColor = {
  rows: Object.entries(lxStudioColors).map(([id, value]) => ({
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

export const lxStudioLightMode = {
  rows: Object.entries(lxStudioTheme.modes.light).map(([id, value]) => ({
    id,
    hex: value,
  })),
  columns: [
    { ...PROP_COLUMN, size: 'lg' },
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.colors.{id}</Code>,
    },
    {
      key: 'swatch',
      name: 'Swatch',
      size: 'fill',
      render: ({ hex }: any) => (
        <ColorScale
          colors={{
            hex: lxStudioTheme.colors[
              hex as keyof (typeof lxStudioTheme)['colors']
            ],
          }}
        />
      ),
    },
  ],
};

export const lxStudioDarkMode = {
  rows: Object.entries(lxStudioTheme.modes.dark).map(([id, value]) => ({
    id,
    hex: value,
  })),
  columns: [
    { ...PROP_COLUMN, size: 'lg' },
    {
      ...PATH_COLUMN,
      render: ({ id }: any) => <Code>theme.colors.{id}</Code>,
    },
    {
      key: 'swatch',
      name: 'Swatch',
      size: 'fill',
      render: ({ hex }: any) => (
        <ColorScale
          colors={{
            hex: lxStudioTheme.colors[
              hex as keyof (typeof lxStudioTheme)['colors']
            ],
          }}
        />
      ),
    },
  ],
};

export const LXStudioLightModeTable = () => (
  <GamutProvider theme={lxStudioTheme}>
    <Background bg="white">
      <TokenTable bg={false} {...(lxStudioLightMode as any)} />
    </Background>
  </GamutProvider>
);

export const LXStudioDarkModeTable = () => (
  <GamutProvider theme={lxStudioTheme}>
    <Background bg="navy">
      <TokenTable bg={false} {...(lxStudioDarkMode as any)} />
    </Background>
  </GamutProvider>
);

export const lxStudioFontFamily = {
  rows: Object.entries(lxStudioTheme.fontFamily).map(([id, value]) => ({
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

export const lxStudioBorderRadii = {
  rows: Object.entries(lxStudioTheme.borderRadii).map(([id, value]) => ({
    id,
    value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      size: 'xl',
      render: ({ id }: any) => <Code>theme.borderRadii.{id}</Code>,
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
      key: 'example',
      name: 'Example',
      size: 'fill',
      render: ({ value }: any) => (
        <Box
          display="inline-block"
          width="6rem"
          height="4em"
          bg="navy"
          borderRadius={value}
        />
      ),
    },
  ],
};
