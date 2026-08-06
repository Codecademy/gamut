import type { ReactNode } from 'react';

import type { ThemeName } from './color-values';

/* Analog of gamut `GamutProvider` — the PROVIDER role only: it selects the
 * active theme token set (via `data-panda-theme`, the analog of gamut's
 * `theme={coreTheme}` prop). Under Panda (zero-runtime) the rest of gamut's
 * provider job disappears: no `CacheProvider`/`createEmotionCache`, no Emotion
 * `ThemeProvider`, no `<Global>` injection — the static stylesheet is imported
 * once (see src/main.tsx).
 *
 * Color MODE is intentionally NOT set here. As in real Gamut, place a single
 * `<ColorMode mode="…">` inside the provider for the ambient mode, and use
 * `<Background>` for individual themed surfaces. */
export const GamutProvider = ({
  theme = 'core',
  children,
}: {
  theme?: ThemeName;
  children?: ReactNode;
}) => (
  <div data-panda-theme={theme === 'core' ? undefined : theme}>{children}</div>
);
