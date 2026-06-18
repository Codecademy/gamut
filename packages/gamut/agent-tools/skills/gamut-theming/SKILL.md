---
name: gamut-theming
description: Use this skill when choosing or extending Gamut themes (Core, Admin, Platform, LX Studio, Percipio), wiring GamutProvider and Emotion theme TypeScript augmentation, or following CreatingThemes — not for day-to-day css(), variant(), or states() patterns (see gamut-style-utilities).
---

# Gamut Theming

Source: `@codecademy/gamut-styles`

See also: [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) (`css`, `variant`, `states`, `StyleProps`, `useTheme` escape hatch). [`gamut-color-mode`](../gamut-color-mode/SKILL.md) (semantic color, `<ColorMode>`, `<Background>`). [`gamut-system-props`](../gamut-system-props/SKILL.md) (`system.*`, responsive `Box` props).

## Overview

Gamut uses Emotion's theme system. Themes are org-specific token bundles (colors, typography, spacing, etc.). The active theme is set at the app root with `<GamutProvider theme={...}>`; child styled components read tokens through Emotion context.

For authoring component styles (`css`, `variant`, `states`, system props, ColorMode), use the skills linked above and the styleguide [Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page).

## Install

```sh
yarn add @codecademy/gamut-kit @emotion/react @emotion/styled
```

`gamut-kit` bundles `gamut`, `gamut-icons`, `gamut-illustrations`, `gamut-patterns`, `gamut-styles`, `variance`, and `gamut-tests`.

Full guide: [Meta / Installation](https://gamut.codecademy.com/?path=/docs-meta-installation--page) in Storybook (CSP `nonce` on `GamutProvider`, Jest, Next/Gatsby entry points).

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

## Available themes

| Theme     | Used for                                                   | Import from `@codecademy/gamut-styles` |
| --------- | ---------------------------------------------------------- | -------------------------------------- |
| Core      | Codecademy default                                         | `coreTheme` or `theme` (default)       |
| Admin     | Codecademy admin tools                                     | `adminTheme`                           |
| Platform  | Codecademy learning environment / shared platform surfaces | `platformTheme`                        |
| LX Studio | Learning Experience Studio                                 | `lxStudioTheme`                        |
| Percipio  | Skillsoft Percipio platform                                | `percipioTheme`                        |

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

Use the theme interface that matches your provider:

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

## Theme vs color mode vs style API

| Concern                                                 | Where to read           |
| ------------------------------------------------------- | ----------------------- |
| Which `theme` object to pass to `GamutProvider`         | This skill              |
| Light / dark semantic colors, `ColorMode`, `Background` | `gamut-color-mode`      |
| `css` / `variant` / `states`, `useTheme` for non-CSS JS | `gamut-style-utilities` |
| Composed `system.*` props on styled primitives / `Box`  | `gamut-system-props`    |
| Spacing, breakpoints, page grid                         | `gamut-layout`          |

## Creating a new theme

See [Creating Themes](https://gamut.codecademy.com/?path=/docs-foundations-theme-creating-themes--docs) in Storybook. Themes are defined in `@codecademy/gamut-styles` and must extend the base theme shape with all required token keys.
