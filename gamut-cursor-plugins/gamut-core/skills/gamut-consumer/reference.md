# Gamut consumer — Storybook and sources

## Published Storybook

Base URL: [https://gamut.codecademy.com/](https://gamut.codecademy.com/)

Useful paths (query `path`):

| Topic | URL |
| --- | --- |
| Meta / Best practices | `?path=/docs-meta-best-practices--page` |
| ColorMode | `?path=/docs-foundations-colormode--page` |
| System compose | `?path=/docs-foundations-system-compose--page` |
| Responsive system props | `?path=/docs-foundations-system-responsive-properties--page` |

## Source of truth in the Gamut repo

If you have the monorepo checked out:

- Best practices MDX: `packages/styleguide/src/lib/Meta/Best practices.mdx`
- ColorMode MDX: `packages/styleguide/src/lib/Foundations/ColorMode/ColorMode.mdx`

## Package imports

- Components: `@codecademy/gamut`
- Styles / providers / hooks: `@codecademy/gamut-styles`
- Patterns / icons / illustrations: `@codecademy/gamut-patterns`, `@codecademy/gamut-icons`, `@codecademy/gamut-illustrations` when applicable

## Styled component example

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

## System props example

```tsx
import { Box } from '@codecademy/gamut';

<Box px={{ _: 0, md: 64 }} display={{ _: 'block', md: 'flex' }} />;
```
