import { Box, Column, LayoutGrid, Text } from '@codecademy/gamut';
import { FONT_ASSET_PATH, lxStudio } from '@codecademy/gamut-styles';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';

/**
 * Demo-only family: only Regular + Bold files. No Medium @font-face, so 500/550
 * cannot map to SkillsoftText-Medium (browser uses matching / synthesis per UA).
 */
const skillsoftTextNoMediumFamily = 'SkillsoftTextNoMediumDemo';

const skillsoftTextNoMediumFontFaces = css`
  @font-face {
    font-family: '${skillsoftTextNoMediumFamily}';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('${FONT_ASSET_PATH}/SkillsoftText-Regular.woff2') format('woff2'),
      url('${FONT_ASSET_PATH}/SkillsoftText-Regular.woff') format('woff');
  }
  @font-face {
    font-family: '${skillsoftTextNoMediumFamily}';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('${FONT_ASSET_PATH}/SkillsoftText-Bold.woff2') format('woff2'),
      url('${FONT_ASSET_PATH}/SkillsoftText-Bold.woff') format('woff');
  }
`;

const SyntheticWeightLine = styled.p<{ $weight: number }>`
  font-family: '${skillsoftTextNoMediumFamily}', sans-serif;
  font-size: 22px;
  line-height: 1.5;
  margin: 0 0 16px;
  font-weight: ${({ $weight }) => $weight};
`;

const meta = {
  title: 'Foundations/Theme/Font tests/Skillsoft',
  /** LX Studio so `Typography` injects Skillsoft @font-face rules from `webFonts.lxStudio`. */
  globals: {
    theme: 'lxStudio',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Samples for each @font-face registered for LX Studio (`webFonts.lxStudio` in gamut-styles): Skillsoft Sans (accent) and Skillsoft Text (base) at weights 400, 500, and 700 with matching italics. This file pins the **LX Studio** theme so the correct font files load.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type FontFamilyToken = 'accent' | 'base';

const showcaseRows: {
  label: string;
  /** Under LX Studio, `title` resolves to weight 500 (Medium files). */
  fontWeight: 'base' | 'title' | 700;
  fontStyle?: 'italic';
}[] = [
  { label: 'Regular (400)', fontWeight: 'base' },
  { label: 'Regular italic (400)', fontWeight: 'base', fontStyle: 'italic' },
  { label: 'Medium (500)', fontWeight: 'title' },
  { label: 'Medium italic (500)', fontStyle: 'italic', fontWeight: 'title' },
  { label: 'Bold (700)', fontWeight: 700 },
  { label: 'Bold italic (700)', fontStyle: 'italic', fontWeight: 700 },
];

function describeFontFaceWeight(
  weight: (typeof lxStudio)[number]['weight']
): string {
  if (weight === undefined) return '400';
  if (weight === 'bold') return '700 (bold keyword)';
  return String(weight);
}

function LxStudioFontAssetUrls() {
  return (
    <LayoutGrid gap={24} mb={32}>
      <Column size={12}>
        <Text as="h2" fontSize={22} fontWeight="title" mb={8}>
          Referenced font URLs
        </Text>
        <Text fontFamily="base" fontSize={14} mb={16}>
          From <Text as="code">webFonts.lxStudio</Text> in{' '}
          <Text as="code">@codecademy/gamut-styles</Text> — same paths{' '}
          <Text as="code">Typography</Text> uses in{' '}
          <Text as="code">@font-face</Text> <Text as="code">src</Text>.
        </Text>
      </Column>
      {lxStudio.map((config) => (
        <Fragment
          key={`${config.filePath}-${String(config.weight)}-${String(
            config.style
          )}`}
        >
          <Column size={12}>
            <Text fontFamily="base" fontSize={14} fontWeight="title" mb={8}>
              {config.name} · font-weight{' '}
              {describeFontFaceWeight(config.weight)} · font-style{' '}
              {config.style ?? 'normal'}
            </Text>
            {config.extensions.map((ext) => (
              <Text
                as="code"
                display="block"
                fontFamily="base"
                fontSize={14}
                key={ext}
                mb={4}
              >
                {`${config.filePath}.${ext}`}
              </Text>
            ))}
          </Column>
        </Fragment>
      ))}
    </LayoutGrid>
  );
}

function SkillsoftTextWeightsWithoutMediumFace() {
  return (
    <>
      <Global styles={skillsoftTextNoMediumFontFaces} />
      <Text as="h2" fontSize={22} fontWeight="title" mb={8} mt={16}>
        Skillsoft Text · weights 500 and 550 without Medium @font-face
      </Text>
      <Text fontFamily="base" fontSize={14} mb={16}>
        The rows below use a <Text as="code">font-family</Text> that only
        registers <Text as="code">SkillsoftText-Regular</Text> (400) and{' '}
        <Text as="code">SkillsoftText-Bold</Text> (700). There is no Medium file
        in this family, so <Text as="code">font-weight: 500</Text> and{' '}
        <Text as="code">550</Text> cannot select{' '}
        <Text as="code">SkillsoftText-Medium</Text>— the browser falls back to
        its own weight matching / synthesis (check computed styles in DevTools).
      </Text>
      <SyntheticWeightLine $weight={500}>
        font-weight: 500 — The quick brown fox jumps over the lazy dog.
        0123456789
      </SyntheticWeightLine>
      <SyntheticWeightLine $weight={550}>
        font-weight: 550 — The quick brown fox jumps over the lazy dog.
        0123456789
      </SyntheticWeightLine>
    </>
  );
}

function FontShowcase({ fontFamily }: { fontFamily: FontFamilyToken }) {
  return (
    <LayoutGrid gap={16} mb={48}>
      {showcaseRows.map(({ label, fontWeight, fontStyle }) => (
        <Fragment key={label}>
          <Column size={3}>
            <Text as="code" fontFamily="base" fontSize={14}>
              {label}
            </Text>
          </Column>
          <Column size={9}>
            <Text
              fontFamily={fontFamily}
              fontSize={22}
              fontStyle={fontStyle}
              fontWeight={fontWeight}
            >
              The quick brown fox jumps over the lazy dog. 0123456789
            </Text>
          </Column>
        </Fragment>
      ))}
    </LayoutGrid>
  );
}

export const SkillsoftTypefaces: Story = {
  render: () => (
    <Box>
      <Text as="h2" fontSize={26} fontWeight="title" mb={8}>
        Skillsoft Sans
      </Text>
      <Text fontFamily="base" fontSize={14} mb={24}>
        Theme token: <Text as="code">fontFamily.accent</Text>
      </Text>
      <FontShowcase fontFamily="accent" />
      <Text as="h2" fontSize={26} fontWeight="title" mb={8}>
        Skillsoft Text
      </Text>
      <Text fontFamily="base" fontSize={14} mb={24}>
        Theme token: <Text as="code">fontFamily.base</Text>
      </Text>
      <FontShowcase fontFamily="base" />
      <SkillsoftTextWeightsWithoutMediumFace />
      <LxStudioFontAssetUrls />
    </Box>
  ),
};
