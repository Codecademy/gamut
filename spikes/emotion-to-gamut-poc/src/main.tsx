import { createRoot } from 'react-dom/client';

import { App } from './App';
import { GamutProvider } from './gamut';

/* `GamutProvider` supplies the theme and emits Gamut's CSS variables — same
 * wrapper an app already has today, minus the Emotion cache. */
createRoot(document.getElementById('root')!).render(
  <GamutProvider>
    <App />
  </GamutProvider>
);
