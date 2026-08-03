import '../ui/gamut.css';

import { createRoot } from 'react-dom/client';

import Widget from './Widget';

// Standalone render (remote run on its own); in the host, the host's sheet styles it.
createRoot(document.getElementById('root')!).render(<Widget />);
