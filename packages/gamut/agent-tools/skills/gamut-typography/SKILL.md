---
name: gamut-typography
description: Gamut UI text — headlines, body, fontSize, lineHeight, fontWeight title. When invoked, read guidelines/foundations/typography.md and DESIGN.md for the active theme.
---

# Gamut Typography

## Read first

When this skill applies, read [`guidelines/foundations/typography.md`](../../guidelines/foundations/typography.md) before writing code. Confirm stacks and `fontWeight.title` against root `DESIGN.md`.

Implementation source of truth: [`packages/gamut-styles/src/variables/typography.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/variables/typography.ts) and themes under [`packages/gamut-styles/src/themes`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/themes).

## Scope by theme

| Themes                | Fonts                                                                                                                                    | `fontWeight.title` |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Core, Admin, Platform | `base` → Apercu stack; `accent` → Suisse + Apercu stack                                                                                  | 700                |
| Percipio, LX Studio   | `base` → Skillsoft Text; `accent` → Skillsoft Sans; Percipio `monospace` → Roboto Mono; LX `monospace` matches Core stack per theme file | 500                |

Use `fontWeight="title"` for headlines / emphasis roles — never hardcode `700` on Percipio/LX unless SPECIFICALLY noted in Figma designs.

## Font size scale (`fontSize`)

Theme keys: `64`, `44`, `34`, `26`, `22`, `20`, `18`, `16`, `14`.

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { system } from '@codecademy/gamut-styles';

const Paragraph = styled.p(system.typography);
<Paragraph fontSize={16} lineHeight="base" />;

const Styled = styled.div(css({ fontSize: 14, fontFamily: 'base' }));
```

## Line height (`lineHeight`)

Tokens: `base` (1.5), `spacedTitle` (1.3), `title` (1.2). Prefer tokens over raw decimals. Only specify `lineHeight` when specified by design.

## Line length

| Context            | Target                   |
| ------------------ | ------------------------ |
| Single-column body | ~66 characters (max ~85) |
| Multi-column       | ≤50 characters per line  |
| Minimum            | ~45 characters           |

## Accessing typography tokens

```tsx
import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';

const Heading = styled.h2(variance.compose(system.typography, system.space));

<Heading
  fontSize={26}
  fontFamily="base"
  fontWeight="title"
  lineHeight="title"
  mb={8}
/>;

import { css } from '@codecademy/gamut-styles';

const Caption = styled.span(
  css({ fontFamily: 'accent', fontSize: 14, color: 'text-secondary' })
);
```

Prefer `<Text>` from `@codecademy/gamut` with `variant` / `as` — see Storybook [Typography / Text](https://gamut.codecademy.com/?path=/docs-typography-text--docs).

## Semantic vs visual headings

- `<Text as="h1">` … `<Text as="h6">` gets default heading styles: each tag maps to the same scale as `variant="title-xxl"` … `variant="title-xs"` (`h1` largest through `h6` smallest). Plain `<Text>` defaults to `as="span"` (inherits font size).
- Use `variant` plus `fontSize` / `fontWeight` / `lineHeight` (and other system props) to override element defaults when the outline needs one heading level but the UI needs another visual weight — e.g. `<Text as="h2" variant="title-sm">`.
- Still pick `h1`–`h6` for document structure and assistive tech; overrides are for intentional divergence between semantics and appearance.
