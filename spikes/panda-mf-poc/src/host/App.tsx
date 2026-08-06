import { lazy, Suspense } from 'react';

import { EngineCard, ThemeMarker, ThemeProvider } from '../ui/engine';
import { Button } from '../ui/gamut';

// Loaded at runtime from the remote's build via Module Federation.
const RemoteWidget = lazy(() => import('remote/Widget'));

/* A theme only the HOST constructs. If this marker shows up inside the federated
 * remote, React context crossed the boundary — which only happens because
 * `@gamut-engine` is a shared singleton in build.mjs. */
const hostTheme = { marker: 'HOST-THEME' } as never;

export default function App() {
  return (
    <ThemeProvider theme={hostTheme}>
      <div style={{ padding: 24, display: 'grid', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="primary">
            Host button — variant=&quot;primary&quot; (static Panda recipe)
          </Button>
          <Suspense fallback={<span>loading remote…</span>}>
            <RemoteWidget />
          </Suspense>
        </div>

        {/* the runtime engine, styled in the host's own build */}
        <EngineCard>
          host EngineCard (runtime injector) — theme marker: <ThemeMarker />
        </EngineCard>
      </div>
    </ThemeProvider>
  );
}
