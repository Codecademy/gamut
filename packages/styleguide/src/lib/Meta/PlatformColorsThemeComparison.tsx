import { Box, Text } from '@codecademy/gamut';
import { platformColors } from '@codecademy/gamut-styles';

import { Code, TokenTable } from '~styleguide/blocks';

import { applyCorrectNotation } from '../Foundations/shared/applyCorrectNotation';
import {
  closestThemeColor,
  platformResolvedPalette,
} from './deprecatedColorClosestMatch';

/** Legacy `platformColors` entries still referenced from Monaco theming. */
const MONO_USED_LEGACY_IDS = [
  'purple-500',
  'purple-600',
  'purple-800',
  'purple-900',
] as const;

const monoUsedSet = new Set<string>(MONO_USED_LEGACY_IDS);

const legacyRows = Object.entries(platformColors).flatMap(([family, weights]) =>
  Object.entries(weights).map(([weight, legacyHex]) => ({
    id: `${family}-${weight}`,
    legacyHex,
  }))
);

const rowsAll = legacyRows
  .map(({ id, legacyHex }) => {
    const closest = closestThemeColor(legacyHex, platformResolvedPalette);
    return {
      id,
      legacyHex,
      closestKey: closest.key,
      closestHex: closest.hex,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const rowsUsed = MONO_USED_LEGACY_IDS.map((id) =>
  rowsAll.find((r) => r.id === id)
).filter((r): r is (typeof rowsAll)[number] => r != null);

const rowsUnused = rowsAll
  .filter((r) => !monoUsedSet.has(r.id))
  .sort((a, b) => a.id.localeCompare(b.id));

type Row = (typeof rowsAll)[number];

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
    name: 'Legacy platformColors',
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

export const PlatformColorsThemeComparison = () => (
  <Box display="flex" flexDirection="column" gap={48}>
    <Box display="flex" flexDirection="column" gap={16}>
      <Text as="h3">Used in Monaco</Text>
      <Text textColor="text" variant="p-base">
        Only <Code>purple[500]</Code>, <Code>purple[600]</Code>,{' '}
        <Code>purple[800]</Code>, and <Code>purple[900]</Code> from deprecated{' '}
        <Code>platformColors.purple</Code> are still wired into the Monaco
        editor theme. Each row is the legacy swatch id (
        <Code>family-weight</Code>) with the closest opaque{' '}
        <Code>theme.colors</Code> match (ΔE_OK in OK color space).
      </Text>
      <TokenTable bg columns={columns} idKey="id" rows={rowsUsed} />
    </Box>

    <Box display="flex" flexDirection="column" gap={16}>
      <Text as="h3">Not used in Monaco</Text>
      <Text textColor="text" variant="p-base">
        The remaining deprecated <Code>platformColors</Code> mint ramp and
        purple stops (for example <Code>purple-200</Code>) are not referenced by
        the Monaco configuration. They may still exist for legacy SCSS or other
        callers—this table is only documenting that Monaco does not consume
        them.
      </Text>
      <TokenTable bg columns={columns} idKey="id" rows={rowsUnused} />
    </Box>
  </Box>
);
