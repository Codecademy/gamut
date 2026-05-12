import { Box } from '@codecademy/gamut';
import { editorColors } from '@codecademy/gamut-styles';

import { Code, TokenTable } from '~styleguide/blocks';

import { applyCorrectNotation } from '../Foundations/shared/applyCorrectNotation';
import {
  closestThemeColor,
  platformResolvedPalette,
} from './deprecatedColorClosestMatch';

const rows = (Object.keys(editorColors) as (keyof typeof editorColors)[]).map(
  (id) => {
    const legacyHex = editorColors[id];
    const closest = closestThemeColor(legacyHex, platformResolvedPalette);
    return {
      id,
      legacyHex,
      closestKey: closest.key,
      closestHex: closest.hex,
    };
  }
);

type Row = (typeof rows)[number];

/* eslint-disable gamut/no-inline-style -- Swatch uses arbitrary hex values, not Gamut `bg` tokens */
const Swatch = ({ hex }: { hex: string }) => (
  <Box border={1} borderRadius="md" overflow="hidden" width="100%">
    <div
      style={{
        backgroundColor: hex,
        minHeight: '3rem',
        width: '100%',
      }}
    />
  </Box>
);
/* eslint-enable gamut/no-inline-style */

const columns = [
  {
    key: 'legacy',
    name: 'Legacy editorColors',
    size: 'lg' as const,
    render: ({ id, legacyHex }: Row) => (
      <Box
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        gap={8}
      >
        <Swatch hex={legacyHex} />
        <Code>{id}</Code>
      </Box>
    ),
  },
  {
    key: 'closest',
    name: 'Closest theme.colors',
    size: 'xl' as const,
    render: ({ closestHex, closestKey }: Row) => (
      <Box
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        gap={8}
      >
        <Swatch hex={closestHex} />
        <Code>theme.colors{applyCorrectNotation({ id: closestKey })}</Code>
      </Box>
    ),
  },
];

export const EditorColorsThemeComparison = () => (
  <TokenTable bg columns={columns} idKey="id" rows={rows} />
);
