import { type CSSProperties, useState } from 'react';

// Consumer imports EVERYTHING from the Gamut facade — incl. `styled`/`Box` and
// the two escape hatches (`styledDynamic`, `getColorValue`).
import { Anchor, Wrapper } from './authoring-comparison';
import {
  type ColorModeName,
  type SemanticAlias,
  type ThemeName,
  Background,
  Box,
  ColorMode,
  css,
  CTAButton,
  FillButton,
  GamutProvider,
  getColorValue,
  IconButton,
  StrokeButton,
  styled,
  styledDynamic,
  TextButton,
  token,
} from './gamut';

type Mode = 'light' | 'dark';

// CSP-note demo: a static class whose background reads a CSS var; only the var
// itself is set inline (see below). The colors live in the static stylesheet.
const swatchBox = css({
  bg: 'var(--swatch)',
  color: 'text',
  p: '16',
  minWidth: '[56px]',
  borderRadius: 'md',
  borderWidth: '2',
  borderColor: 'border-primary',
});
const SWATCHES: SemanticAlias[] = [
  'primary',
  'danger',
  'interface',
  'secondary',
];

const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'danger',
  'interface',
] as const;
const BUTTON_SIZES = ['small', 'normal', 'large'] as const;

// consumer-authored styled components using Gamut's `styled` (recipe config)
const Card = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
    p: '24',
    borderRadius: 'lg',
    borderWidth: '2',
    borderColor: 'border-primary',
    bg: 'background',
  },
});

const Toolbar = styled('div', {
  base: { display: 'flex', gap: '8', p: '16', alignItems: 'center' },
});

// ESCAPE HATCH #2 — runtime `styled` for a genuinely dynamic value (bar width),
// with its color resolved in JS via escape hatch #1. Keeps the old
// `styled(Tag)(props => styles)` authoring shape.
const Meter = styledDynamic('div')(
  ({
    $percent,
    $tone,
    $mode,
    $theme,
  }: {
    $percent: number;
    $tone: SemanticAlias;
    $mode: ColorModeName;
    $theme: ThemeName;
  }): CSSProperties => ({
    width: `${$percent}%`,
    height: 12,
    borderRadius: 6,
    background: getColorValue($tone, $mode, $theme),
    transition: 'width 200ms',
  })
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box display="flex" flexDirection="column" gap="8" py="16">
    <Box color="text" fontWeight="title" fontSize="18">
      {title}
    </Box>
    {children}
  </Box>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <Box display="flex" gap="8" alignItems="center">
    {children}
  </Box>
);

// a plain icon component (consumers pass gamut-icons; any {size} component works)
const StarIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6z" />
  </svg>
);

/* Example PAGE — `yarn nx run panda-styling-poc:dev`. Demonstrates variants,
 * theme/colorMode switching, static Background, and the two escape hatches. */
export const App = () => {
  const [theme, setTheme] = useState<ThemeName>('core');
  const [mode, setMode] = useState<Mode>('light');
  const [percent, setPercent] = useState(60);
  const [swatch, setSwatch] = useState<SemanticAlias>('primary');

  return (
    // GamutProvider selects the theme; a single <ColorMode> sets the ambient
    // mode; <Background> handles individual themed surfaces below.
    <GamutProvider theme={theme}>
      <ColorMode mode={mode}>
        <Box
          bg="background"
          color="text"
          fontFamily="base"
          padding="24"
          minHeight="screen"
          display="flex"
          flexDirection="column"
          gap="16"
        >
          <Box color="text" fontWeight="title" fontSize="18">
            Gamut → Panda styling spike
          </Box>

          <Toolbar>
            <FillButton
              size="small"
              variant="interface"
              onClick={() => setTheme((t) => (t === 'core' ? 'admin' : 'core'))}
            >
              theme: {theme}
            </FillButton>
            <FillButton
              size="small"
              variant="interface"
              onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
            >
              colorMode: {mode}
            </FillButton>
          </Toolbar>

          {/* === RECIPE VARIANTS: variant × size === */}
          <Card>
            {BUTTON_VARIANTS.map((variant) => (
              <Section key={variant} title={`variant="${variant}"`}>
                <Row>
                  {BUTTON_SIZES.map((size) => (
                    <FillButton key={size} variant={variant} size={size}>
                      {size}
                    </FillButton>
                  ))}
                  <FillButton variant={variant} disabled>
                    disabled
                  </FillButton>
                </Row>
              </Section>
            ))}
          </Card>

          {/* === BUTTON ATOMS — same external API as Gamut === */}
          <Card>
            <Section title="Button atoms — unchanged consumer API">
              <Row>
                <FillButton variant="primary" icon={StarIcon}>
                  FillButton
                </FillButton>
                <StrokeButton
                  variant="primary"
                  icon={StarIcon}
                  iconPosition="right"
                >
                  StrokeButton
                </StrokeButton>
                <TextButton variant="danger">TextButton</TextButton>
                <CTAButton>CTAButton</CTAButton>
                <IconButton icon={StarIcon} aria-label="Star" tip="Star" />
              </Row>
              <Row>
                {/* href → renders an <a> via ButtonBase, exactly like gamut */}
                <FillButton variant="secondary" href="#">
                  Link (anchor)
                </FillButton>
                <TextButton variant="interface" size="small">
                  small text
                </TextButton>
                <StrokeButton variant="danger" disabled>
                  disabled
                </StrokeButton>
              </Row>
            </Section>
          </Card>

          {/* === variant()-style recipe + states()-style booleans === */}
          <Card>
            <Section title='variant() → recipe: <Anchor tone="…">'>
              <Row>
                <Anchor href="#" tone="interface">
                  interface
                </Anchor>
                <Anchor href="#" tone="danger">
                  danger
                </Anchor>
              </Row>
            </Section>
            <Section title="states() → boolean variants: <Wrapper disabled center>">
              <Row>
                <Wrapper center>centered</Wrapper>
                <Wrapper disabled>disabled</Wrapper>
              </Row>
            </Section>
          </Card>

          {/* === ESCAPE HATCHES === */}
          <Card>
            <Section title="Escape hatch #2 — styledDynamic (dynamic width, prop-driven)">
              <Box display="flex" flexDirection="column" gap="8">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                />
                <Box
                  borderWidth="2"
                  borderColor="border-primary"
                  borderRadius="md"
                  padding="4"
                >
                  <Meter
                    $percent={percent}
                    $tone="primary"
                    $mode={mode}
                    $theme={theme}
                  />
                </Box>
                <Box color="text-disabled" fontSize="14">
                  width={percent}% — a runtime value Panda can't statically
                  extract; applied as inline style.
                </Box>
              </Box>
            </Section>

            <Section title="Escape hatch #1 — getColorValue() into an SVG (the charts case)">
              {/* JS-resolved hex, theme + mode aware — recomputes when you flip the switchers */}
              <svg width="180" height="80" role="img" aria-label="bar chart">
                <rect
                  x="0"
                  y="20"
                  width="40"
                  height="60"
                  fill={getColorValue('primary', mode, theme)}
                />
                <rect
                  x="50"
                  y="40"
                  width="40"
                  height="40"
                  fill={getColorValue('danger', mode, theme)}
                />
                <rect
                  x="100"
                  y="10"
                  width="40"
                  height="70"
                  fill={getColorValue('interface', mode, theme)}
                />
              </svg>
              <Box color="text-disabled" fontSize="14">
                fill={getColorValue('primary', mode, theme)} — a raw hex, not a
                var(); needed by non-CSS consumers.
              </Box>
            </Section>

            <Section title="Themeable dynamic value — token.var() + inline CSS var (CSP-aware)">
              <Row>
                {SWATCHES.map((s) => (
                  <FillButton
                    key={s}
                    size="small"
                    variant="interface"
                    onClick={() => setSwatch(s)}
                  >
                    {s}
                  </FillButton>
                ))}
              </Row>
              {/* `--swatch` points at a TOKEN var, so the box stays theme/mode-aware
                  (flip the switchers — it recolors), unlike getColorValue's raw hex.
                  Only ONE inline custom property is set; the colors live in the static
                  sheet. Strict CSP `style-src` still applies to the inline attr; for a
                  FINITE set, prefer a variant() (className, zero inline style). */}
              <Box
                className={swatchBox}
                style={
                  {
                    '--swatch': token.var(
                      `colors.${swatch}` as Parameters<typeof token.var>[0]
                    ),
                  } as CSSProperties
                }
              >
                bg = token.var(colors.{swatch}) — themeable
              </Box>
            </Section>
          </Card>

          {/* === STATIC color-mode context via <Background> (own dark context) === */}
          <Section title="Static <Background bg='navy-800'> — own contrast-selected mode">
            <Background bg="navy-800">
              <Box padding="24" display="flex" gap="8" alignItems="center">
                <FillButton variant="primary">Primary</FillButton>
                <FillButton variant="danger" size="small">
                  Danger
                </FillButton>
                <Box color="text" padding="8">
                  readable text on navy (semantic `text` resolves to the
                  dark-mode value)
                </Box>
              </Box>
            </Background>
          </Section>
        </Box>
      </ColorMode>
    </GamutProvider>
  );
};
