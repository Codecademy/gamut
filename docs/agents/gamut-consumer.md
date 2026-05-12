# Gamut consumer (applications)

## When to use

- Application code importing `@codecademy/gamut` or `@codecademy/gamut-styles`.
- Layout, spacing, typography, and component composition with design tokens.

## Providers (minimal)

Ensure the app supplies appropriate color/theme context at the root. For `ColorMode`, `Background`, `useColorMode`, platform themes, and troubleshooting contrast or mode bugs, use [gamut-theming.md](./gamut-theming.md) and [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page).

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

## Related guides

- [gamut-accessibility.md](./gamut-accessibility.md) — forms, dialogs, custom widgets, WCAG reviews, focus/ARIA.
- [gamut-theming.md](./gamut-theming.md) — multi-mode layouts, `Background`, `background-current`, hooks, platform themes.

---

## Storybook URLs and sources

### Published Storybook

Base URL: [https://gamut.codecademy.com/](https://gamut.codecademy.com/)

| Topic                   | URL query                                                    |
| ----------------------- | ------------------------------------------------------------ |
| Meta / Best practices   | `?path=/docs-meta-best-practices--page`                      |
| ColorMode               | `?path=/docs-foundations-colormode--page`                    |
| System compose          | `?path=/docs-foundations-system-compose--page`               |
| Responsive system props | `?path=/docs-foundations-system-responsive-properties--page` |

### Source of truth in the Gamut repo

If you have the monorepo checked out:

- Best practices MDX: `packages/styleguide/src/lib/Meta/Best practices.mdx`
- ColorMode MDX: `packages/styleguide/src/lib/Foundations/ColorMode/ColorMode.mdx`

### Package imports

- Components: `@codecademy/gamut`
- Styles / providers / hooks: `@codecademy/gamut-styles`
- Patterns / icons / illustrations: `@codecademy/gamut-patterns`, `@codecademy/gamut-icons`, `@codecademy/gamut-illustrations` when applicable

### Styled component example

```tsx
import { css, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const Anchor = styled.a(
  variant({
    base: { p: 4 },
    defaultVariant: 'interface',
    variants: {
      interface: {
        color: 'text',
        '&:hover': { color: 'text-accent' },
      },
    },
  })
);
```

### System props example

```tsx
import { Box } from '@codecademy/gamut';

<Box px={{ _: 0, md: 64 }} display={{ _: 'block', md: 'flex' }} />;
```
