import { Anchor, Box } from '@codecademy/gamut';
import {
  Background,
  coreSwatches,
  platformSwatches,
  theme,
  trueColors,
} from '@codecademy/gamut-styles';
// eslint-disable-next-line gamut/import-paths
import * as ALL_PROPS from '@codecademy/gamut-styles/src/variance/config';
import kebabCase from 'lodash/kebabCase';

// CASS - fix
import { Code, ColorScale, LinkTo, TokenTable } from '~styleguide/blocks';

const PROP_COLUMN = {
  key: 'key',
  name: 'Prop',
  size: 'md',
  render: ({ id }: any) => <Code>{id}</Code>,
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
  size: 'xl',
};

export const lightMode = {
  rows: Object.entries(theme.modes.light).map(([id, value]) => ({
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
            hex: theme.colors[hex as keyof (typeof theme)['colors']],
          }}
        />
      ),
    },
  ],
};

export const darkMode = {
  rows: Object.entries(theme.modes.dark).map(([id, value]) => ({
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
          colors={{ hex: theme.colors[hex as keyof (typeof theme)['colors']] }}
        />
      ),
    },
  ],
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

const { navy, white, ...solidSwatches } = coreSwatches;
const rgbaSwatches = { navy, white };

export const swatch = {
  rows: Object.entries(solidSwatches).map(([id, value]) => ({
    id,
    hexes: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id, hexes }: any) => {
        return (
          <Code>
            theme.colors[`{id}-{Object.keys(hexes)[0]}`]
          </Code>
        );
      },
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

export const rgbaSwatch = {
  rows: Object.entries(rgbaSwatches).map(([id, value]) => ({
    id,
    hexes: value,
  })),
  columns: [
    PROP_COLUMN,
    {
      ...PATH_COLUMN,
      render: ({ id, hexes }: any) => {
        return (
          <Code>
            theme.colors[`{id}-{Object.keys(hexes)[0]}`]
          </Code>
        );
      },
    },
    {
      key: 'swatch',
      name: 'Swatch',
      size: 'fill',
      render: ({
        id,
        hexes,
      }: {
        id: string;
        hexes: Record<string, string>;
      }) => {
        const {
          100: first,
          200: second,
          300: third,
          400: fourth,
          ...rest
        } = hexes;

        const firstHexes = { 100: first, 200: second, 300: third, 400: fourth };

        return (
          <Background
            bg={id === 'white' ? 'navy' : 'white'}
            p={4}
            borderRadius="md"
          >
            <ColorScale colors={firstHexes} />
            <ColorScale colors={rest} />
          </Background>
        );
      },
    },
  ],
};

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
          theme.colors[`{id}-{Object.keys(hexes)[0]}`]
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
  render: ({ value }: any) => (
    <Box fontSize={20} {...{ [prop]: value }}>
      {text}
    </Box>
  ),
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
    { ...VALUE_COLUMN, size: 'lg' },
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
    { ...VALUE_COLUMN, size: 'lg' },
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
        <Box display="inline-block" width={value} height={value} bg="navy" />
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

export const borderRadii = {
  rows: Object.entries(theme.borderRadii).map(([id, value]) => ({
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

export const LightModeTable = () => (
  <Background bg="white">
    <TokenTable bg={false} {...(lightMode as any)} />
  </Background>
);

export const DarkModeTable = () => (
  <Background bg="navy">
    <TokenTable bg={false} {...(darkMode as any)} />
  </Background>
);
/* eslint-disable gamut/import-paths */

const PROPERTIES_COLUMN = {
  key: 'properties',
  name: 'Properties',
  size: 'xl',
  render: ({
    property,
    properties = [property],
  }: {
    property: string;
    properties: string[];
  }) =>
    properties.map((property) => (
      <Anchor
        href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`}
        target="_blank"
        rel=""
      >
        <Code key={property}>{kebabCase(property)}</Code>
      </Anchor>
    )),
};

const SCALE_COLUMN = {
  key: 'scale',
  name: 'Scale',
  size: 'lg',
  render: ({ scale }: { scale: string }) => (
    <LinkTo id={`foundations-theme--${kebabCase(scale)}`}>{scale}</LinkTo>
  ),
};

const TRANSFORM_COLUMN = {
  key: 'transform',
  name: 'Transform',
  size: 'fill',
  render: ({ transform }: any) => transform && <Code>{transform?.name}</Code>,
};

export const defaultColumns = [
  PROP_COLUMN,
  PROPERTIES_COLUMN,
  SCALE_COLUMN,
  TRANSFORM_COLUMN,
];

export const getPropRows = (key: keyof typeof ALL_PROPS) =>
  Object.entries(ALL_PROPS[key]).map(([prop, config]) => ({
    id: prop,
    ...config,
  }));
