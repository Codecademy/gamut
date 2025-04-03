import { adminTheme, Background } from '@codecademy/gamut-styles';

import { Code, ColorScale, TokenTable } from '~styleguide/blocks';

import { applyCorrectNotation } from './applyCorrectNotation';
import { PATH_COLUMN, PROP_COLUMN } from './elements';

export const adminLightMode = {
  rows: Object.entries(adminTheme.modes.light).map(([id, value]) => ({
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
            hex: adminTheme.colors[hex as keyof (typeof adminTheme)['colors']],
          }}
        />
      ),
    },
  ],
};

export const adminDarkMode = {
  rows: Object.entries(adminTheme.modes.dark).map(([id, value]) => ({
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
            hex: adminTheme.colors[hex as keyof (typeof adminTheme)['colors']],
          }}
        />
      ),
    },
  ],
};

export const AdminLightModeTable = () => (
  <Background bg="white">
    <TokenTable bg={false} {...(adminLightMode as any)} />
  </Background>
);

export const AdminDarkModeTable = () => (
  <Background bg="navy">
    <TokenTable bg={false} {...(adminDarkMode as any)} />
  </Background>
);
