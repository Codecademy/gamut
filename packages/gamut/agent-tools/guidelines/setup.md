# Setup

## Install

```sh
yarn add @codecademy/gamut-kit @emotion/react @emotion/styled
```

`gamut-kit` bundles `gamut`, `gamut-icons`, `gamut-illustrations`, `gamut-patterns`, `gamut-styles`, `variance`, and `gamut-tests`.

Full guide: [Meta / Installation](https://gamut.codecademy.com/?path=/docs-meta-installation--page) in Storybook (CSP `nonce` on `GamutProvider`, Jest, Next/Gatsby entry points). For Emotion + TypeScript, add `theme.d.ts` as in [TypeScript (`theme.d.ts`)](#typescript-themedts) below.

**Product design intent:** After install, use root **`DESIGN.md`** (from `gamut plugin install --theme <name>`) with [`skills/gamut-theming/SKILL.md`](../skills/gamut-theming/SKILL.md) for semantic tokens, fonts, and component patterns for that product. Do not modify or alias `@codecademy/*` packages away from published APIs.

Optionally add a `peerDependencies` block in `package.json` listing `@codecademy/gamut`, `@codecademy/gamut-icons`, `@codecademy/gamut-illustrations`, `@codecademy/gamut-patterns`, `@codecademy/gamut-styles`, `@codecademy/gamut-tests`, and `@codecademy/variance` (e.g. `"*"`) so editors surface those packages — see Meta / Installation for the JSON snippet.

## Required wrapper

Wrap the app root in `<GamutProvider>` from `@codecademy/gamut-styles`. This wires up the theme, color mode, and logical properties for all child components.

At runtime, `GamutProvider` defaults to Core when `theme` is omitted (`theme = coreTheme` in the implementation). For non-Core products and for TypeScript (`theme` is required on `GamutProviderProps`), pass `theme` explicitly using the table below.

```tsx
import { GamutProvider, theme } from '@codecademy/gamut-styles';

const App = () => (
  <GamutProvider theme={theme}>{/* app content */}</GamutProvider>
);
```

## Theme selection

| Product             | Theme to import               |
| ------------------- | ----------------------------- |
| Codecademy public   | `coreTheme` (default `theme`) |
| Codecademy admin    | `adminTheme`                  |
| Codecademy platform | `platformTheme`               |
| LX Studio           | `lxStudioTheme`               |
| Percipio            | `percipioTheme`               |

All themes are exported from `@codecademy/gamut-styles`.

## TypeScript (`theme.d.ts`)

Augment `@emotion/react` so `props.theme` in `styled` / `css` matches the same theme object you pass to `<GamutProvider theme={...}>`. If the types disagree, system props and token autocomplete will not line up with runtime.

Add a root `theme.d.ts` (or merge into your existing global types):

```tsx
// theme.d.ts
import '@emotion/react';

import type { CoreTheme } from '@codecademy/gamut-styles';

declare module '@emotion/react' {
  export interface Theme extends CoreTheme {}
}
```

Use the theme interface that matches your provider — same row as the [theme selection](#theme-selection) table:

| `GamutProvider` `theme` prop | Import for `Theme extends …` |
| ---------------------------- | ---------------------------- |
| `theme` or `coreTheme`       | `CoreTheme`                  |
| `adminTheme`                 | `AdminTheme`                 |
| `platformTheme`              | `PlatformTheme`              |
| `lxStudioTheme`              | `LxStudioTheme`              |
| `percipioTheme`              | `PercipioTheme`              |

Example when the app uses Percipio:

```tsx
// theme.d.ts
import '@emotion/react';

import type { PercipioTheme } from '@codecademy/gamut-styles';

declare module '@emotion/react' {
  export interface Theme extends PercipioTheme {}
}
```

See Emotion’s [TypeScript / define a theme](https://emotion.sh/docs/typescript#define-a-theme) for details.
