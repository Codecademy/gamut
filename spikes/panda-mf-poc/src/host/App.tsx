import { lazy, Suspense } from 'react';

import { Button } from '../ui/gamut';

// Loaded at runtime from the remote's build via Module Federation.
const RemoteWidget = lazy(() => import('remote/Widget'));

export default function App() {
  return (
    <div
      style={{ display: 'flex', gap: 12, padding: 24, alignItems: 'center' }}
    >
      <Button variant="primary">
        Host button — variant=&quot;primary&quot;
      </Button>
      <Suspense fallback={<span>loading remote…</span>}>
        <RemoteWidget />
      </Suspense>
    </div>
  );
}
