import type { StyleProps } from '@codecademy/variance';
import { useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
 * THE ONLY LINE THAT CHANGES IN A MIGRATION:
 *
 *   - import styled from '@emotion/styled';
 *   + import { styled } from '@codecademy/gamut-styles';
 *
 * `css`, `states`, `variant`, `styledOptions`, `Box`, `ColorMode`, `Background`
 * were already imported from Gamut, so those import lines don't move at all.
 * ──────────────────────────────────────────────────────────────────────────── */
import {
  allRules,
  Background,
  Box,
  ColorMode,
  css,
  FlexBox,
  GamutProvider,
  Global,
  states,
  StrokeButton,
  styled,
  styledOptions,
  keyframes,
  Text,
  themes,
  variant,
} from './gamut';

/* ════════════════════════════════════════════════════════════════════════════
 * 1. variant() — copied VERBATIM from
 *    mono/libs/ui/brand/src/AppBar/AppBarSection.tsx
 * ══════════════════════════════════════════════════════════════════════════ */

const positionVariants = variant({
  prop: 'position',
  base: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    zIndex: 1,
  },
  variants: {
    left: { flex: 1 },
    right: { flex: 1, justifyContent: 'flex-end' },
    center: { flex: 2, justifyContent: 'center', textAlign: 'center' },
  },
});

interface AppBarSectionProps extends StyleProps<typeof positionVariants> {
  children?: React.ReactNode;
}

const StyledSection = styled(
  'div',
  styledOptions
)<AppBarSectionProps>(positionVariants);

/* ════════════════════════════════════════════════════════════════════════════
 * 2. css() + states() + the composed shape + withComponent — copied VERBATIM
 *    from mono/libs/ui/login-or-register/src/OAuthButtons/elements.tsx
 * ══════════════════════════════════════════════════════════════════════════ */

const StyledGridBox = styled(Box.withComponent('ul'))(
  css({
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: 12,
    '@media (max-width: 375px)': { columnGap: 8 },
    '@media (max-width: 280px)': { gridAutoFlow: 'row' },
    listStyle: 'none',
    pl: 0,
    mb: 24,
  })
);

const StrokeButtonBaseStyles = css({
  '@media (max-width: 385px)': { px: 4 },
  px: 16,
  py: 4,
  mb: 8,
  mr: 8,
  height: { _: 43, xs: 53 },
  width: { _: 50, xs: 65 },
  backgroundColor: 'white',
});

const StrokeButtonStateStyles = states({
  isFancy: {
    p: 0,
    height: { _: 48, xs: 48 },
    width: { _: '100%', xs: '100%' },
  },
});

const StyledStrokeButton = styled(StrokeButton)<
  StyleProps<typeof StrokeButtonStateStyles>
>(StrokeButtonBaseStyles, StrokeButtonStateStyles);

/* ════════════════════════════════════════════════════════════════════════════
 * 3. styled.tag`…` template literals — mono has 234 of these
 * ══════════════════════════════════════════════════════════════════════════ */

// withComponent again — same styles, different element
const Pre = Box.withComponent('pre');

const Pill = styled.span<{ $tone: string }>`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 14px;
  color: white;
  background: ${(props: { $tone: string }) => props.$tone};
`;

/* ════════════════════════════════════════════════════════════════════════════
 * 6. The last two Emotion APIs: <Global> and keyframes()
 * ══════════════════════════════════════════════════════════════════════════ */

// replaces Emotion's `keyframes` (5 references in packages/*)
const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
});

const Pulsing = styled(Box)(
  css({ animation: `${pulse} 1.4s ease-in-out infinite` } as never)
);

/* ════════════════════════════════════════════════════════════════════════════
 * The page
 * ══════════════════════════════════════════════════════════════════════════ */

const Section = ({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children?: React.ReactNode;
}) => (
  <Box mb={48}>
    <Text display="block" fontSize={22} fontWeight="title" mb={4}>
      {title}
    </Text>
    <Text display="block" fontSize={14} textColor="text-secondary" mb={16}>
      {note}
    </Text>
    {children}
  </Box>
);

export const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [themeName, setThemeName] = useState('core');

  return (
    <GamutProvider theme={themes[themeName]}>
      {/* replaces Emotion's <Global> (10 references in packages/*) */}
      <Global
        styles={{
          body: { margin: 0 },
          '*, *::before, *::after': { boxSizing: 'border-box' },
        }}
      />
      <ColorMode mode={mode}>
      <Box p={32} minHeight="100vh" fontFamily="base">
        <FlexBox alignItems="center" justifyContent="space-between" mb={32}>
          <Text fontSize={26} fontWeight="title">
            Emotion → Gamut: same API, one import changed
          </Text>
          <FlexBox columnGap={8} alignItems="center">
            {Object.keys(themes).map((name) => (
              <StrokeButton
                key={name}
                variant={name === themeName ? 'primary' : 'danger'}
                size="small"
                onClick={() => setThemeName(name)}
              >
                {name}
              </StrokeButton>
            ))}
            <StrokeButton
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              {mode} mode
            </StrokeButton>
          </FlexBox>
        </FlexBox>

        <Section
          title="1. variant()"
          note="Verbatim from mono AppBarSection.tsx — variant({ prop, base, variants }) + StyleProps + styledOptions."
        >
          <Box border={1} borderColor="border-primary" borderRadius="md" p={8}>
            <StyledSection position="left">left</StyledSection>
            <StyledSection position="center">center</StyledSection>
            <StyledSection position="right">right</StyledSection>
          </Box>
        </Section>

        <Section
          title="2. css() + states(), composed"
          note="THE PROOF: StrokeButton's own CSS is 100% Panda static output. The consumer then extends it with the unchanged styled(X)(css(…), states(…)) API — verbatim from mono OAuthButtons/elements.tsx, incl. nested @media and responsive { _, xs } values."
        >
          <StyledGridBox>
            <li>
              <StyledStrokeButton>normal</StyledStrokeButton>
            </li>
            <li>
              <StyledStrokeButton isFancy>isFancy</StyledStrokeButton>
            </li>
          </StyledGridBox>
        </Section>

        <Section
          title="3. System props"
          note="<Box p={16} bg=… /> — resolved through the real Gamut prop config and spacing/colour scales."
        >
          <FlexBox columnGap={12}>
            <Box p={16} bg="primary" textColor="background" borderRadius="md">
              p=16 bg=primary
            </Box>
            <Box p={16} bg="secondary" textColor="background" borderRadius="md">
              bg=secondary
            </Box>
            <Box
              px={24}
              py={8}
              border={2}
              borderColor="primary"
              borderRadius="md"
            >
              px=24 py=8
            </Box>
          </FlexBox>
        </Section>

        <Section
          title="4. ColorMode + Background"
          note="Background sets a fixed palette colour AND picks the mode with better contrast — so nested light-inside-dark still resolves correctly."
        >
          <FlexBox columnGap={16}>
            <Background bg="navy" p={16} borderRadius="md">
              <Text>navy surface → dark mode</Text>
              <Background bg="white" p={12} mt={12} borderRadius="md">
                <Text>nested white surface → back to light</Text>
              </Background>
            </Background>
            <ColorMode mode="dark">
              <Box p={16} borderRadius="md">
                <Text>explicit ColorMode dark</Text>
              </Box>
            </ColorMode>
          </FlexBox>
        </Section>

        <Section
          title="5. styled.tag`…` template literals"
          note="Including ${props => …} interpolation, which a static extractor cannot evaluate."
        >
          <FlexBox columnGap={8}>
            <Pill $tone="rebeccapurple">purple</Pill>
            <Pill $tone="teal">teal</Pill>
          </FlexBox>
        </Section>

        <Section
          title="6. <Global> and keyframes()"
          note="The last two Emotion APIs Gamut still used. Both fall out of the same serializer — they just skip the class-scoping step. body{margin:0} and box-sizing are applied globally by <Global>; the box below animates via a generated @keyframes name."
        >
          <Pulsing
            p={16}
            bg="primary"
            textColor="background"
            borderRadius="md"
            display="inline-block"
          >
            keyframes() → {pulse}
          </Pulsing>
        </Section>

        <Section
          title="Generated CSS"
          note={`${
            allRules().length
          } rules, all produced at runtime by src/gamut/sheet.ts. No Emotion anywhere.`}
        >
          <Pre
            p={16}
            bg="background-selected"
            borderRadius="md"
            fontSize={14}
            overflow="auto"
            maxHeight="300px"
          >
            {allRules()
              .map(([, text]) => text)
              .join('\n')}
          </Pre>
        </Section>
        </Box>
      </ColorMode>
    </GamutProvider>
  );
};
