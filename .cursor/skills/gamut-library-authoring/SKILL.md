---
name: gamut-library-authoring
description: >-
  Authors and maintains components in the Codecademy Gamut monorepo (packages/gamut,
  gamut-styles, patterns, icons, illustrations). Use when adding or changing design
  system components, tokens, Storybook MDX, variance/styledOptions, ColorMode-aware
  styles, or eslint-plugin-gamut rules in this repository—not when consuming Gamut
  from an application.
---

# Gamut library authoring

## Scope

Work lives under this monorepo: `packages/gamut`, `packages/gamut-styles`, `packages/gamut-patterns`, `packages/gamut-icons`, `packages/gamut-illustrations`, `packages/styleguide`. Do not treat this skill as guidance for app repos that only install `@codecademy/gamut`.

## Architecture

- Components: `packages/gamut/src` — extend existing components before adding overlapping primitives.
- Patterns: `packages/gamut-patterns` — page-level compositions.
- Icons / illustrations: `packages/gamut-icons`, `packages/gamut-illustrations`.
- Tokens: single source in `packages/gamut-styles/src/variables/` (`spacing`, `colors`, `typography`, `borderRadii`). No ad-hoc hex or arbitrary pixel strings where a token exists.

## Styling

- Emotion + `@codecademy/gamut-styles`: `css`, `variant`, `states`, system props via `system.css`, `styledOptions`, variance `compose` where the codebase already does.
- Semantic color keys only in component styles so components work in any ColorMode.
- Avoid nested tag selectors and `${GamutComponent}` selectors; prefer system props, layout primitives (`FlexBox`, `GridBox`), and explicit wrappers.

## ColorMode and Background

- When changing theme behavior, read `packages/styleguide/src/lib/Foundations/ColorMode/ColorMode.mdx` and `packages/gamut-styles/src/ColorMode.tsx` / `Background` implementation.
- Components should consume **semantic** aliases (`text`, `background`, `primary`, etc.), not raw palette names in ways that break mode switching.

## Documentation and AI-facing MDX

- New or changed components need Storybook MDX under `packages/styleguide`; keep props tables accurate ([Storybook Autodocs](https://storybook.js.org/docs/writing-docs/autodocs) where used).
- Cross-link [published Storybook](https://gamut.codecademy.com/) paths for reviewers and agents.

## Accessibility

- Follow WCAG-minded patterns; use styleguide Meta and per-component pages. Prefer built-in Gamut props and semantics over bespoke DOM.

## Quality gates

- Respect `eslint-plugin-gamut` and repo ESLint config for touched packages.
- Add or update stories and visual/docs coverage when behavior or public API changes.

## Further reading

See [reference.md](reference.md) for token paths, exemplar workflow, and Figma rule alignment.
