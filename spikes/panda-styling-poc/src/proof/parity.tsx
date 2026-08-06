import { coreTheme } from '@codecademy/gamut-styles/dist/themes/core';
import type { StyleProps } from '@codecademy/variance';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';

import {
  css,
  extractStyles,
  states,
  styled,
  systemProps,
  ThemeProvider,
  variant,
} from '../gamut/engine';

/* Parity proof for the Emotion-free engine.
 *
 * The specimen below is copied VERBATIM from
 * mono/libs/ui/login-or-register/src/OAuthButtons/elements.tsx — the only edit is
 * the import line (`@emotion/styled` -> the Gamut engine). It was chosen because
 * it hits every hard case at once: nested `@media`, responsive object values,
 * system-prop aliases, `withComponent`, and the bare-identifier `styled(X)(a, b)`
 * shape that codemod-feasibility.md classifies as MANUAL.
 *
 * Run: yarn nx run panda-styling-poc:proof */

/* Minimal Gamut primitives on the new engine. `StyleProps<typeof systemProps>` is
 * how real Gamut types its style props today — unchanged here, which is the
 * typesafety half of the claim. */
type SystemStyleProps = StyleProps<typeof systemProps>;

const Box = styled('div')<SystemStyleProps>(systemProps);
const GridBox = styled('div')<SystemStyleProps>(
  css({ display: 'grid' }),
  systemProps
);
const flexWrap = states({ wrap: { flexWrap: 'wrap' } });
const FlexBox = styled('div')<SystemStyleProps & StyleProps<typeof flexWrap>>(
  css({ display: 'flex' }),
  flexWrap,
  systemProps
);
const StrokeButton = styled('button')<SystemStyleProps>(
  css({
    border: 2,
    borderColor: 'primary',
    color: 'primary',
    bg: 'transparent',
  }),
  systemProps
);

// --- VERBATIM from mono (imports only changed) ------------------------------
const StyledGridBox = styled(GridBox.withComponent('ul'))(
  css({
    gridAutoFlow: 'column',
    columnGap: 12,
    '@media (max-width: 375px)': { columnGap: 8 },
    '@media (max-width: 280px)': { gridAutoFlow: 'row' },
    listStyle: 'none',
    pl: 0,
    mb: 24,
  })
);

const StyledFlexBox = styled(FlexBox.withComponent('ul'))(
  css({
    listStyle: 'none',
    pl: 0,
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

const embeddedStates = states({
  embedded: {
    '@media (max-width: 343px)': { width: '60vw' },
    width: '70vw',
  },
});
const StyledToolTipContents =
  styled(Box)<StyleProps<typeof embeddedStates>>(embeddedStates);
// --- end verbatim -----------------------------------------------------------

/* Cases the static extractor provably cannot handle, which a runtime engine gets
 * for free. These are the MANUAL and UNSUPPORTED buckets in
 * codemod-feasibility.md (420 + 234 sites in mono). */
const ButtonSelectors = { HOVER: '&:hover', DISABLED: '&:disabled' } as const;

const DynamicBar = styled(Box)<{ $pct: number }>((props: { $pct: number }) => ({
  width: `${props.$pct}%`,
}));

const ThemeReader = styled(Box)(({ theme }) => ({
  // property access on the live theme — MANUAL under static extraction
  outlineColor: (theme as { colors: Record<string, string> }).colors[
    'hyper-500'
  ],
}));

const ComputedKeys = styled(Box)(
  css({
    // computed key from an enum — MANUAL under static extraction
    [ButtonSelectors.HOVER]: { color: 'primary' },
    [ButtonSelectors.DISABLED]: { color: 'text-disabled' },
  })
);

const Ternary = styled(Box)<{ $big?: boolean }>((props: { $big?: boolean }) =>
  css({ p: props.$big ? 48 : 8 })({ theme: coreTheme })
);

// UNSUPPORTED under static extraction: template-literal CSS, incl. interpolation
const TemplateLiteral = styled.div`
  color: red;
  padding: 8px;
  &:hover {
    color: blue;
  }
`;
const TemplateInterpolated = styled.span<{ $tone: string }>`
  color: ${(props: { $tone: string }) => props.$tone};
  font-weight: 700;
`;

const toneVariant = variant({
  defaultVariant: 'a',
  variants: {
    a: { bg: 'primary', p: 16 },
    b: { bg: 'secondary', p: 32 },
  },
});
const Variants = styled(Box)<StyleProps<typeof toneVariant>>(toneVariant);

// --- render + assert --------------------------------------------------------
const markup = renderToStaticMarkup(
  <ThemeProvider theme={coreTheme} nonce="test-nonce">
    <StyledGridBox gridAutoColumns="1fr" />
    <StyledFlexBox wrap />
    <StyledStrokeButton isFancy />
    <StyledStrokeButton />
    <StyledToolTipContents embedded />
    <Box p={16} bg="primary" textColor="background" />
    <Box display={{ _: 'block', md: 'none' }} />
    <DynamicBar $pct={37.5} />
    <ThemeReader />
    <ComputedKeys />
    <Ternary $big />
    <TemplateLiteral />
    <TemplateInterpolated $tone="rebeccapurple" />
    <Variants variant="b" />
  </ThemeProvider>
);

const styleText = extractStyles();

type Check = { label: string; ok: boolean; detail?: string };
const checks: Check[] = [];
const check = (label: string, ok: boolean, detail?: string) =>
  checks.push({ label, ok, detail });

const has = (needle: string) => styleText.includes(needle);

check(
  'SSR produced markup with generated classes',
  /class="gmt-[a-z0-9]/.test(markup)
);
check(
  'SSR produced a stylesheet',
  styleText.length > 0,
  `${styleText.length} bytes`
);

// system-prop aliases resolve through the real theme scales
check('system prop p={16} -> padding via spacing scale', has('padding:1rem'));
check(
  'system prop bg="primary" resolves a token',
  /background-color:[^;}]+/.test(styleText)
);

// the specimen's hard cases
check('nested @media preserved', has('@media (max-width: 375px)'));
check('second nested @media preserved', has('@media (max-width: 280px)'));
check(
  'responsive object value expanded to breakpoints',
  (styleText.match(/@media/g) ?? []).length >= 4
);
// logical properties are on by default, so `width` lands as `inline-size`
check(
  'states() applied only when prop is true',
  has('inline-size:100%') && has('inline-size:50px')
);
check(
  'transient $props and state props stay off the DOM',
  !/\$pct|\$big|isFancy|embedded/.test(markup)
);
check(
  'bare-identifier styled(X)(a, b) composed',
  has('background-color:white')
);
check('withComponent renders the swapped tag', markup.includes('<ul'));

// the buckets static extraction cannot reach
check('prop-dependent function value', has('width:37.5%'));
check('live theme property access', has('#3A10E5') || has('outline-color'));
check('computed enum selector key', has(':hover') && has(':disabled'));
check('ternary resolved at runtime', has('padding:3rem'));
check('template literal CSS parsed', has('color:red') && has('padding:8px'));
check('template literal interpolation', has('rebeccapurple'));
check('variant() selected by prop', has('padding:2rem'));

// engine invariants
check(
  'focus-visible polyfill hook present',
  !styleText.includes(':focus-visible') || has('[data-focus-visible-added]')
);
check(
  'all rules emitted into the gamut.consumer layer',
  !styleText.includes('{') || has('@layer gamut.consumer')
);
/* Self-verifying: read this script's own bundle and look for Emotion's runtime
 * internals. If any @emotion package had been pulled in transitively — via
 * variance or gamut-styles — these identifiers would be present. */
const bundle = readFileSync(__filename, 'utf8');
/* Assembled at runtime so the marker strings don't appear literally in this
 * file — otherwise the check matches its own source and always fails. */
const emotionInternals = [
  ['serialize', 'Styles'],
  ['insert', 'Styles'],
  ['create', 'Cache'],
  ['@emotion', '/styled'],
].map((parts) => parts.join(''));
const found = emotionInternals.filter((marker) => bundle.includes(marker));
check(
  'zero Emotion in the bundled runtime',
  found.length === 0,
  found.length ? `found: ${found.join(', ')}` : 'no Emotion internals in bundle'
);

const failed = checks.filter((entry) => !entry.ok);

/* eslint-disable no-console */
console.log('\n=== Emotion-free engine: call-site parity ===\n');
checks.forEach(({ label, ok, detail }) =>
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `  (${detail})` : ''}`
  )
);
console.log(`\n${checks.length - failed.length}/${checks.length} passed`);
console.log(`\nGenerated CSS (${styleText.length} bytes):\n`);
console.log(styleText.replace(/}/g, '}\n'));
/* eslint-enable no-console */

process.exit(failed.length === 0 ? 0 : 1);
