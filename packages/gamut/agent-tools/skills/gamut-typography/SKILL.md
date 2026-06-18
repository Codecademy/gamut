---
name: gamut-typography
description: Use this skill when applying Gamut typography tokens — font family, font size, line height, or semantic font weight (including the `fontWeight="title"` difference between Core 700 and Percipio/LX 500). See `gamut-system-props` for system.typography props.
---

# Gamut Typography

Implementation source of truth: [`packages/gamut-styles/src/variables/typography.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/variables/typography.ts) and themes under [`packages/gamut-styles/src/themes`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/themes).

## Scope by theme

| Themes                | `fontFamily.base`                        | `fontFamily.accent`                       | `fontWeight.title` |
| --------------------- | ---------------------------------------- | ----------------------------------------- | ------------------ |
| Core, Admin, Platform | Apercu stack                             | Suisse + Apercu stack                     | 700                |
| Percipio              | Skillsoft Text                           | Skillsoft Sans; `monospace` → Roboto Mono | 500                |
| LX Studio             | Skillsoft Text / Sans (same as Percipio) | Same                                      | 500                |

Admin and Platform extend Core for colors / modes only — typography matches Core.

Licensing: Apercu is licensed for Codecademy surfaces only; Skillsoft products use Percipio/LX stacks.

Use `fontWeight="title"` for headlines / emphasis roles — never hardcode `700` on Percipio/LX unless SPECIFICALLY noted in Figma designs.

## Font weight (semantic)

| Token   | Core / Admin / Platform | Percipio / LX Studio |
| ------- | ----------------------- | -------------------- |
| `base`  | 400                     | 400                  |
| `title` | 700                     | 500                  |

Headlines, CTAs, and buttons should use `fontWeight="title"` so Percipio/LX get 500, Core gets 700. Literal `700` breaks Skillsoft branding on those themes.

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

## Codecademy (Core / Admin / Platform) — voice and layout

Do not blindly apply to Percipio/LX without brand guidance.

- `fontFamily="base"` (Apercu): default UI and marketing type. Emphasis inside body copy: Italic, not Bold for intra-paragraph stress.
- `fontFamily="accent"` (Suisse stack): technical accent — code snippets, captions, labels. Use sparingly; glyph box reads larger — step down ~10–15% vs equivalent `base` size.
- Alignment: left-align by default; center only short marketing headlines; avoid right-align except tabs / numerics.
- Letter-spacing: do not tweak tracking unless design specifies.

## Semantic vs visual headings

- `<Text as="h1">` … `<Text as="h6">` gets default heading styles: each tag maps to the same scale as `variant="title-xxl"` … `variant="title-xs"` (`h1` largest through `h6` smallest). Plain `<Text>` defaults to `as="span"` (inherits font size).
- Use `variant` plus `fontSize` / `fontWeight` / `lineHeight` (and other system props) to override element defaults when the outline needs one heading level but the UI needs another visual weight — e.g. `<Text as="h2" variant="title-sm">`.
- Still pick `h1`–`h6` for document structure and assistive tech; overrides are for intentional divergence between semantics and appearance.
