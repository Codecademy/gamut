import { useState } from 'react';

// Consumer imports EVERYTHING from the Gamut facade — incl. `styled`/`css`.
import {
  Background,
  Button,
  ColorMode,
  css,
  GamutProvider,
  styled,
} from './gamut';

type ThemeName = 'core' | 'admin';
type Mode = 'light' | 'dark';

// A consumer-authored component using Gamut's `styled` (an inline recipe).
const Card = styled('div', {
  base: {
    display: 'flex',
    gap: '8',
    p: '24',
    borderRadius: 'lg',
    borderWidth: '2',
    borderColor: 'border-primary',
    bg: 'background',
  },
});

/* Mirrors gamut's Storybook globalTypes switchers (theme + colorMode).
 * Runtime switching = flip `data-panda-theme` + `data-color-mode`. No re-render
 * of styles, no theme object swap — the CSS cascade re-resolves the variables. */
export const App = () => {
  const [theme, setTheme] = useState<ThemeName>('core');
  const [mode, setMode] = useState<Mode>('light');

  return (
    // `data-panda-theme` selects the theme token set (undefined = default "core")
    <div data-panda-theme={theme === 'core' ? undefined : theme}>
      <GamutProvider mode={mode}>
        <Background bg="background">
          <div className={css({ display: 'flex', gap: '8', p: '16' })}>
            <button
              onClick={() => setTheme((t) => (t === 'core' ? 'admin' : 'core'))}
            >
              theme: {theme}
            </button>
            <button
              onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
            >
              colorMode: {mode}
            </button>
          </div>

          <Card>
            <Button variant="primary">Primary</Button>
            <Button variant="danger" size="small">
              Danger
            </Button>
            <Button variant="interface" size="large">
              Interface
            </Button>
          </Card>

          {/* Nested ColorMode: this subtree is forced dark regardless of global mode */}
          <ColorMode mode="dark">
            <Card>
              <Button variant="primary">Primary (nested dark)</Button>
              <span className={css({ color: 'text' })}>always-dark text</span>
            </Card>
          </ColorMode>
        </Background>
      </GamutProvider>
    </div>
  );
};
