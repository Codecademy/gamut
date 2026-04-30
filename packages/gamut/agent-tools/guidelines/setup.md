# Setup

## Install

```sh
npm install @codecademy/gamut-kit
```

`gamut-kit` bundles `gamut`, `gamut-icons`, `gamut-illustrations`, `gamut-patterns`, `gamut-styles`, `variance`, and `gamut-tests`.

## Required wrapper

Wrap the app root in `<GamutProvider>`. This wires up the theme, color mode, and logical properties for all child components.

```tsx
import { GamutProvider } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';

const App = () => (
  <GamutProvider theme={theme}>
    {/* app content */}
  </GamutProvider>
);
```

## Theme selection

| Product | Theme to import |
|---|---|
| Codecademy public | `coreTheme` (default `theme`) |
| Codecademy admin | `adminTheme` |
| Codecademy platform | `platformTheme` |
| LX Studio | `lxStudioTheme` |
| Percipio | `percipioTheme` |

All themes are exported from `@codecademy/gamut-styles`.

## Font licensing

**Apercu Pro** is licensed for codecademy.com only. Non-Codecademy products must use their theme's approved typeface:
- LX Studio → Hanken Grotesk
- Percipio → Roboto
