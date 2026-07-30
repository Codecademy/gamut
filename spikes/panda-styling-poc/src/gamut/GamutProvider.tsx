import type { ReactNode } from 'react';

import { type ColorModeName, ColorMode } from './ColorMode';

/* Analog of gamut `GamutProvider` — but under Panda (zero-runtime) it sheds most
 * of its Emotion responsibilities:
 *   - ❌ No <CacheProvider> / createEmotionCache — nothing injects styles at runtime.
 *   - ❌ No Emotion <ThemeProvider> — tokens are global CSS vars from the static sheet.
 *   - ❌ No <Global> Reboot/Variables/Typography injection — that CSS ships statically.
 * What remains is optional: set the initial color mode. Consumers import the
 * static stylesheet ONCE (see src/main.tsx) instead of wiring a cache/provider.
 *
 * NOTE ON CSP NONCE: gamut passes a `nonce` to the Emotion cache for CSP. With a
 * static stylesheet there is no injected <style> to nonce, so this concern
 * largely disappears (a real gap only if runtime-dynamic inline styles remain). */
export const GamutProvider = ({
  mode = 'light',
  children,
}: {
  mode?: ColorModeName;
  children?: ReactNode;
}) => <ColorMode mode={mode}>{children}</ColorMode>;
