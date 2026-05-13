---
name: gamut-typography
description: Use this skill when creating or reviewing UI text in Gamut apps — headlines, body, captions, labels, code snippets, or text-heavy layouts — even if the user does not name fonts or tokens. Covers Apercu Pro, Suisse Intl Mono, scale, line heights, line length, and alignment.
---

# Gamut Typography

> **Scope**: This skill covers typography for **Codecademy products** using the Core, Admin, or Platform themes (Apercu + Suisse). Percipio uses Roboto for all type — see `DESIGN.md` for Percipio-specific guidance. LX Studio uses Hanken Grotesk in place of both Apercu and Suisse.

## Typefaces

Codecademy products use two typefaces:

### Apercu Pro (`fontFamily: "base"`)

The primary typeface. Geometric-ish, humanist sans-serif. Use for:

- Headlines (Bold weight)
- Body / paragraph text (Regular weight)
- UI labels, menu items (Regular weight)
- Emphasis within body copy (Italic — **not** Bold)

**Rules:**

- Do not use Bold to emphasize text within a Regular-weight paragraph. Use Italic instead.
- Set with generous line-height for body text: **150–175%** of the type size (e.g. 16px type → 24–28px line-height).
- Headlines should use **100–110%** line-height to appear intentional and grouped.
- Text should be **left-aligned** by default.

### Suisse Intl Mono (`fontFamily: "accent"`)

Monospace accent typeface. Use sparingly for:

- Code snippets and inline code
- Numbers, figures, and statistics
- Captions and labels that reference technical/engineering context
- Enumerated lists
- Quotations in a technical voice

**Rules:**

- Every character is the same width — avoid long paragraph-length prose in Suisse.
- It reads large for its point size: **reduce the size by ~10–15%** relative to Apercu text at the same visual scale (e.g. 14px Suisse ≈ 16px Apercu visually).
- Requires extra line-height to remain readable.

## Font size scale (`fontSize`)

Sizes are accessed via the theme's `fontSize` scale. Common keys:

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// Via system props
import { system } from '@codecademy/gamut-styles';
const Text = styled.p(system.typography);
<Text fontSize={16} />;

// Via css() utility
const Box = styled.div(css({ fontSize: 14 }));

// Via theme directly (outside styled components)
import { theme } from '@codecademy/gamut-styles';
const size = theme.fontSize[16];
```

## Line heights (`lineHeight`)

Line heights are limited to **multiples of 4px**. Type boxes are placed on an **8px placement grid**.

Guidelines:

- Body text: 150–175% of font size
- Headlines: 100–110% of font size

## Line length

Controlling line length is essential for readability:

| Context                 | Target                  |
| ----------------------- | ----------------------- |
| Single-column body text | ~66 characters (max 85) |
| Multi-column layouts    | ≤50 characters per line |
| Minimum                 | 45 characters           |

**How to control line length**: Start with the right text style for the design, then adjust the width or column count of the text container.

## Alignment

- **Left-align** paragraphs by default — this is easiest to read and supports grid alignment.
- **Center-align** only for short marketing headlines or specific interface components with brief text.
- **Never right-align** text in normal circumstances (exceptions: numbers, equations).
- Do not adjust letter-spacing.

## Accessing typography tokens

```tsx
// System props (recommended for styled components)
import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';

const Heading = styled.h2(variance.compose(system.typography, system.space));

<Heading
  fontSize={24}
  fontFamily="base"
  fontWeight="bold"
  lineHeight={1.1}
  mb={8}
/>;

// css() utility (recommended for static styles)
import { css } from '@codecademy/gamut-styles';

const Caption = styled.span(
  css({ fontFamily: 'accent', fontSize: 12, color: 'secondary' })
);

// Theme object (outside styled components)
import { theme } from '@codecademy/gamut-styles';
import { css as emotionCss } from '@emotion/react';

const myStyles = emotionCss`
  font-size: ${theme.fontSize[14]};
`;
```

## Semantic vs. visual sizing

- The term **"Title"** distinguishes visual size from semantic HTML hierarchy (H1–H6).
- A visually large title may use `<h2>` or `<p>` semantically — visual scale and semantic meaning are independent in Gamut.
- Choose HTML heading levels for document structure, choose font size for visual hierarchy.
