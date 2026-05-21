# Gamut Styles

Design tokens, Emotion themes, and system props for the Gamut design system.

`@codecademy/gamut-styles` is the styling layer behind Gamut components. Wrap your app in `GamutProvider` to supply a theme; import tokens, system props, and helpers from the package entry (`src/index.ts`).

**`variables/`** — Raw tokens (colors, spacing, typography, breakpoints, etc.) used to build themes.

**`themes/`** — Composed Emotion themes. `coreTheme` (exported as `theme`) is the default; `platform`, `admin`, `lxStudio`, and `percipio` extend it for other contexts.

**`variance/`** — System props and CSS-in-JS helpers for styled components.

Also exports color-mode utilities (`ColorMode`, `Background`), global styles, Emotion cache setup, and assorted styling helpers under `globals/`, `cache/`, `styles/`, and `utilities/`.

```tsx
import { GamutProvider, theme } from '@codecademy/gamut-styles';

<GamutProvider theme={theme}>{/* app */}</GamutProvider>;
```
