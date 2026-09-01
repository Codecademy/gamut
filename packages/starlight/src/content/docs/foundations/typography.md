---
title: Typography
description: Type scale, line length, and readability guidelines for text.
---

See [Design tokens](/foundations/design-tokens/) for how to reach `fontFamily`, `fontSize`, `fontWeight`, and `lineHeight` in code. This page covers the design guidance around using them. Gamut uses "Title" to distinguish its visual sizing from semantic heading levels — a `title-md` value doesn't necessarily mean `h2`; see [Text](/components/typography/text/) for how the two compose.

For the full, live-rendered scale — every font family, size, weight, and line-height value with a rendered example — see [Foundations: Typography](https://gamut.codecademy.com/?path=/docs/foundations-typography--docs) in Storybook rather than a static copy here.

## Line length

Line length — the number of characters per line — is a major factor in readability.

- Aim for 45–85 characters per line; 66 is the ideal for web text.
- For most multi-line text areas, keep lines to an average of 66 characters, including spaces.
- For multi-column layouts, don't exceed 50 characters per line, including spaces.
- Adjust line length by changing the text size (to keep the same layout width) or the width of the text container (to keep the same type size) — whichever fits the design better.

## Alignment

- Left-align paragraphs by default — it's the easiest to read, and keeps layouts aligned to the grid.
- If you must center-align a paragraph, keep the lines especially short and avoid high word counts.
- Don't right-align text, except for numbers or equations.
- Don't adjust letter spacing.

## Line height

Place type boxes on the 8px placement grid, the same as any other element.
