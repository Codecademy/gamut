import { EngineCard, ThemeMarker } from '../ui/engine';
import { Button } from '../ui/gamut';

/* Exposed via Module Federation.
 *
 * STATIC half: uses variant="danger" — a variant the HOST never renders itself.
 * It stays styled because the host imports Gamut's COMPLETE static stylesheet
 * (staticCss emits every variant).
 *
 * RUNTIME half: renders an `EngineCard` (rules injected at runtime) plus the
 * host's theme marker. The remote never constructs a theme, so if the marker
 * reads HOST-THEME then React context crossed the boundary — which is only true
 * because `@gamut-engine` is a shared singleton. Unshared, this silently prints
 * DEFAULT-THEME, the failure mode src/federation/verify.cjs reproduces. */
export default function Widget() {
  return (
    <>
      <Button variant="danger">
        Remote widget — variant=&quot;danger&quot;
      </Button>
      <EngineCard>
        remote EngineCard (runtime injector) — theme marker: <ThemeMarker />
      </EngineCard>
    </>
  );
}
