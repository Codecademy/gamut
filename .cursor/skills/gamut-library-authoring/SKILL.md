---
name: gamut-library-authoring
description: >-
  Authors and maintains components in the Codecademy Gamut monorepo (packages/gamut,
  gamut-styles, patterns, icons, illustrations). Use when adding or changing design
  system components, tokens, Storybook MDX, variance/styledOptions, ColorMode-aware
  styles, TypeScript prop modeling, React patterns, or eslint-plugin-gamut rules in
  this repository—not when consuming Gamut from an application.
---

# Gamut library authoring

## Scope

Work lives under this monorepo: `packages/gamut`, `packages/gamut-styles`, `packages/gamut-patterns`, `packages/gamut-icons`, `packages/gamut-illustrations`, `packages/styleguide`. Do not treat this skill as guidance for app repos that only install `@codecademy/gamut`.

**Cursor rules:** `.cursor/rules/gamut-library.mdc` (tokens, ColorMode, Figma boundaries) and `.cursor/rules/gamut-component-building.mdc` (component structure, TS, React, Storybook pairing for `packages/gamut` + `packages/styleguide`).

## Architecture

- Components: `packages/gamut/src` — extend existing components before adding overlapping primitives.
- Patterns: `packages/gamut-patterns` — page-level compositions.
- Icons / illustrations: `packages/gamut-icons`, `packages/gamut-illustrations`.
- Tokens: single source in `packages/gamut-styles/src/variables/` (`spacing`, `colors`, `typography`, `borderRadii`). No ad-hoc hex or arbitrary pixel strings where a token exists.

## Component structure (`packages/gamut`)

- Default: one **PascalCase** folder with `index.tsx` (or `index.ts` re-exporting siblings) and `__tests__/<Component>.test.tsx`.
- Large UIs: add `shared/` for types/styles/variants, `elements/` for presentational pieces, or domain subfolders (`layout/`, `inputs/`) following `Button/`, `Form/`, `BarChart/`, `GridForm/`.
- **Barrel:** every public component or type consumers need must be exported from `packages/gamut/src/index.tsx`. Use `export type { … }` when values should not be re-exported.

## Storybook and snippets (`packages/styleguide`)

- Place docs under `packages/styleguide/src/lib/` in the atomic layer that matches the component (Atoms, Molecules, Organisms, Layouts, Typography, etc.); folder structure mirrors the Storybook sidebar.
- For each component: **`ComponentName.stories.tsx`** + **`ComponentName.mdx`** (kebab-case filenames) in that component’s folder.
- VS Code (repo root): type **`component-story`**, **`component-doc`**, or **`toc-story`** to insert templates from `.vscode/stories.code-snippets`.
- Include a flagship/default story, **`Controls`** where appropriate, and prose in MDX (`parameters` with `title`, `subtitle`, `design`, `status`, `source.githubLink`). Prefer examples that **Show code** as copy-paste-ready (avoid heavy indirection in the snippet users copy).
- Meta guides: `packages/styleguide/src/lib/Meta/Gamut writing guide/Stories/About.mdx`, `Component story documentation.mdx`, `Component code examples.mdx`.

## TypeScript and variance

- **Derive props from styling:** after `const x = variance.compose(system.space, …)` or `variant({ … })`, extend with `StyleProps<typeof x>`. Chain multiple `StyleProps<typeof …>` when variants and states are separate (see `Anchor`, `Tag/types.tsx`).
- **Derive from styled component:** `export type FooProps = ComponentProps<typeof StyledFoo>` for Emotion roots built with `styled('tag', styledOptions<'tag'>())(…)`.
- **Compose with bases:** e.g. `ButtonBaseProps & ComponentProps<typeof ButtonBase>` so system props and the underlying component stay aligned.
- **Variants:** use **discriminated unions** (`export type Props = A | B | C`) when `variant` or mode changes required props. Use **`never`** on disallowed props per branch so invalid combinations fail at compile time (`Tag`, `Badge` standard vs `custom`).
- **DOM handlers:** prefer `HTMLProps<HTMLAnchorElement>['onClick']`, `ComponentProps<typeof SubComponent>['onClick']`, etc., over `Function` or `any`.
- **Shared types:** reuse `WithChildrenProp`, `IconComponentType`, `Partial<IconComponentType>` from `packages/gamut/src/utils/types.ts`; follow generics like `InlineIconButtonProps` in `Button/shared/types.ts` for polymorphic wrappers.
- **Gold components:** adding a variant usually means a new union member and fixing consumers; avoid new `as any`; reserve exceptions for documented edge cases only.

## React

- Match **local file style** (`React.FC<Props>` is common in Gamut).
- Use **`forwardRef`** when consumers or libraries need the underlying DOM ref.
- **Rules of Hooks**; name shared logic `use*`. Effects: correct dependency arrays, cleanup for subscriptions/timers; avoid mirroring props into state when derived state or a `key` reset is clearer ([You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)).
- **Memoization:** `useMemo` / `useCallback` / `React.memo` when profiling or stable identity is required—not by default.
- **Composition:** prefer `children` and subcomponents over flat prop explosion; page templates belong in `gamut-patterns`.
- **Lists:** stable keys; avoid index keys for reorderable/dynamic lists.
- **Forms:** be explicit about controlled vs uncontrolled behavior; align with `ConnectedForm` / `GridForm` when touching those flows.
- **Accessibility:** semantic elements first (`button`, `a`, `label` + `htmlFor`); use `aria-*` for bespoke widgets. See styleguide Meta and `Best practices.mdx`.

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
- Human-oriented overview for contributors: `packages/styleguide/src/lib/Meta/Gamut writing guide/Building components in Gamut.mdx` (if present).

## Accessibility

- Follow WCAG-minded patterns; use styleguide Meta and per-component pages. Prefer built-in Gamut props and semantics over bespoke DOM.

## Quality gates

- Respect `eslint-plugin-gamut` and repo ESLint config for touched packages.
- Add or update stories and visual/docs coverage when behavior or public API changes.

## Further reading

See [reference.md](reference.md) for token paths, exemplar source files, snippet names, Meta MDX paths, and Figma rule alignment.
