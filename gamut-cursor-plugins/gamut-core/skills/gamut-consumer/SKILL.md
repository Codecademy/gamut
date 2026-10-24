---
name: gamut-consumer
description: >-
  Builds and refactors UI using @codecademy/gamut and @codecademy/gamut-styles:
  system props, semantic tokens, css/variant/states, eslint-plugin-gamut, and
  Storybook documentation links. Use when implementing screens in apps that depend
  on Gamut—not when authoring the Gamut library itself. For ColorMode/Background
  depth use codecademy-gamut-themes; for WCAG-focused work use codecademy-gamut-a11y.
---

# Gamut consumer (core)

## When to use

- Application code importing `@codecademy/gamut` or `@codecademy/gamut-styles`.
- Layout, spacing, typography, and component composition with design tokens.

## Providers (minimal)

Ensure the app supplies appropriate color/theme context at the root. For `ColorMode`, `Background`, `useColorMode`, platform themes, and troubleshooting contrast or mode bugs, rely on the **codecademy-gamut-themes** plugin and [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page).

## Semantic colors and tokens

- Semantic names describe **role** (`text`, `background`, `primary`, `secondary`, …) and resolve per ColorMode. See [Best practices / ColorMode](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page).
- Use `css({ color: 'primary', p: 4 })`, `variant`, and `states` from `@codecademy/gamut-styles` with those semantic keys.
- Prefer `themed(...)` or variants APIs over ad-hoc `theme.colors` access when eslint recommends it.

## System props and layout

- Use `Box`, `FlexBox`, `GridBox` with system props; support responsive maps (`{ _: value, md: value }`) and arrays with sparse breakpoints.
- Docs: [Responsive properties](https://gamut.codecademy.com/storybook/?path=/docs-foundations-system-responsive-properties--page), [system compose](https://gamut.codecademy.com/?path=/docs-foundations-system-compose--page).

## Anti-patterns

- No `style={{}}` for design-token-level styling where system props or `css()` apply.
- No tag-wide or `*` selectors; no `${Box}`-style nested selectors targeting Gamut internals—use props and layout wrappers.

## Lint

If the repo enables `eslint-plugin-gamut`, expect rules such as `no-inline-style`, `no-css-standalone`, and `gamut-import-paths`. Match fixes to Gamut patterns.

## Sibling plugins

- **codecademy-gamut-a11y** — forms, dialogs, custom widgets, WCAG reviews, focus/ARIA.
- **codecademy-gamut-themes** — multi-mode layouts, `Background`, `background-current`, hooks, platform themes.

## Reference

Stable Storybook URLs and migration snippets: [reference.md](reference.md).
