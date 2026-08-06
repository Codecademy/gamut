// The host imports the ONE complete Gamut stylesheet — it covers the remote's
// variant("danger") even though the host itself only renders variant("primary").
import '../ui/gamut.css';

import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
