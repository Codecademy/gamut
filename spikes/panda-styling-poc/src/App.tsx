import { useState } from 'react';

// Consumer imports EVERYTHING from the Gamut facade — incl. `styled`/`Box`.
import { Anchor, Wrapper } from './authoring-comparison';
import { Background, Box, Button, GamutProvider, styled } from './gamut';

type ThemeName = 'core' | 'admin';
type Mode = 'light' | 'dark';

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

/* Small example PAGE. Run `yarn nx run panda-styling-poc:dev`. Demonstrates:
 *  - Panda RECIPE variants on <Button> (variant × size + disabled)
 *  - `variant()`-style recipe (Anchor `tone`) and `states()`-style booleans (Wrapper)
 *  - ambient COLORMODE (light/dark) via GamutProvider + THEME (core/admin) switching
 *  - STATIC color-mode context via <Background bg="navy"> (its own dark context) */
export const App = () => {
  const [theme, setTheme] = useState<ThemeName>('core');
  const [mode, setMode] = useState<Mode>('light');

  return (
    // `data-panda-theme` selects the theme token set (undefined = default "core")
    <div data-panda-theme={theme === 'core' ? undefined : theme}>
      {/* GamutProvider sets the ambient color mode (light/dark) for the whole app */}
      <GamutProvider mode={mode}>
        <Box
          bg="background"
          color="text"
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
            <Button
              size="small"
              variant="interface"
              onClick={() => setTheme((t) => (t === 'core' ? 'admin' : 'core'))}
            >
              theme: {theme}
            </Button>
            <Button
              size="small"
              variant="interface"
              onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
            >
              colorMode: {mode}
            </Button>
          </Toolbar>

          {/* === RECIPE VARIANTS: variant × size === */}
          <Card>
            {BUTTON_VARIANTS.map((variant) => (
              <Section key={variant} title={`variant="${variant}"`}>
                <Row>
                  {BUTTON_SIZES.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {size}
                    </Button>
                  ))}
                  <Button variant={variant} disabled>
                    disabled
                  </Button>
                </Row>
              </Section>
            ))}
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

          {/* === STATIC color-mode context via <Background> (own dark context) === */}
          <Section title="Static <Background bg='navy'> — own contrast-selected mode">
            <Background bg="navy">
              <Box padding="24" display="flex" gap="8" alignItems="center">
                <Button variant="primary">Primary</Button>
                <Button variant="danger" size="small">
                  Danger
                </Button>
                <Box color="text" padding="8">
                  readable text on navy (semantic `text` resolves to the
                  dark-mode value)
                </Box>
              </Box>
            </Background>
          </Section>
        </Box>
      </GamutProvider>
    </div>
  );
};
