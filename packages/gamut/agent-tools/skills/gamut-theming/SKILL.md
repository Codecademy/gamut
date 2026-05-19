---
name: gamut-theming
description: Gamut themes, GamutProvider, theme.d.ts, CreatingThemes. When invoked, read guidelines/setup.md and repo DESIGN.md first. Not for css/variant/states (see gamut-style-utilities).
---

# Gamut Theming

## Read first

When this skill applies, read before writing code:

- [`guidelines/setup.md`](../../guidelines/setup.md)
- Root `DESIGN.md` in the app repo (product tokens and patterns)

Source: `@codecademy/gamut-styles`

See also: [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) (`css`, `variant`, `states`, `StyleProps`, `useTheme` escape hatch). [`gamut-color-mode`](../gamut-color-mode/SKILL.md) (semantic color, `<ColorMode>`, `<Background>`). [`gamut-system-props`](../gamut-system-props/SKILL.md) (`system.*`, responsive `Box` props).

## Overview

Gamut uses Emotion's theme system. Themes are org-specific token bundles (colors, typography, spacing, etc.). The active theme is set at the app root with `<GamutProvider theme={...}>`; child styled components read tokens through Emotion context.

For authoring component styles (`css`, `variant`, `states`, system props, ColorMode), use the skills linked above and the styleguide [Best practices](../../../../styleguide/src/lib/Meta/Best%20practices.mdx).

## Infer theme from the repo

Do not hardcode a product theme in generic guidance. In an app repo:

1. Read root `DESIGN.md` (installed via `gamut plugin install --theme <name>`) for semantic tokens, fonts, and product patterns.
2. Confirm `<GamutProvider theme={...}>` matches that product (`coreTheme`, `percipioTheme`, `lxStudioTheme`, etc.).
3. Use Storybook Foundations / Theme stories for the active product when verifying hex ↔ semantic mappings.

## Available themes

| Theme     | Used for                                                   |
| --------- | ---------------------------------------------------------- |
| Core      | Codecademy default                                         |
| Admin     | Codecademy admin tools                                     |
| Platform  | Codecademy learning environment / shared platform surfaces |
| LX Studio | Learning Experience Studio                                 |
| Percipio  | Skillsoft Percipio platform                                |

Product-level import names and `theme.d.ts` patterns live in [setup.md](../../guidelines/setup.md).

## Theme vs color mode vs style API

| Concern                                                 | Where to read                                      |
| ------------------------------------------------------- | -------------------------------------------------- |
| Which `theme` object to pass to `GamutProvider`         | This skill + [setup.md](../../guidelines/setup.md) |
| Light / dark semantic colors, `ColorMode`, `Background` | `gamut-color-mode`                                 |
| `css` / `variant` / `states`, `useTheme` for non-CSS JS | `gamut-style-utilities`                            |
| Composed `system.*` props on styled primitives / `Box`  | `gamut-system-props`                               |

## Creating a new theme

See `CreatingThemes.mdx` in the styleguide (`packages/styleguide/src/lib/Foundations/Theme/CreatingThemes.mdx`). Themes are defined in `@codecademy/gamut-styles` and must extend the base theme shape with all required token keys.

## Key principles

- Pick the correct theme export for the product (`coreTheme`, `adminTheme`, `platformTheme`, `lxStudioTheme`, `percipioTheme`, etc.) so tokens and fonts match `DESIGN.md` and design intent.
- Align `theme.d.ts` / `Theme extends …` with the same theme interface you pass to `GamutProvider` (see [setup.md](../../guidelines/setup.md)).
- Components stay portable across themes when they use token and semantic aliases rather than one-off hex; authoring rules live in `gamut-style-utilities` and `gamut-color-mode`.
- `GamutProvider` wires theme, color mode, and logical-properties settings at the root; individual components should not hard-code which org theme is active.
