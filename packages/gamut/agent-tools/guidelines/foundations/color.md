# Color

Use semantic aliases for UI that should respond to color mode (light/dark) and theme (Core, Admin, Platform, Percipio, LX Studio). The same semantic token names (`text`, `primary`, `background`, …) exist across themes; resolved palette values and hex differ by `GamutProvider` theme and active ColorMode. Never assume Codecademy Core hex when advising another product.

Prefer `css` / `variant` / `states` from `@codecademy/gamut-styles` with semantic names (see Storybook [Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page)).

Related: [`setup.md`](../setup.md) (which theme to import) · [`gamut-theming` skill](../../skills/gamut-theming/SKILL.md) · [`gamut-style-utilities` skill](../../skills/gamut-style-utilities/SKILL.md) · [`gamut-color-mode` skill](../../skills/gamut-color-mode/SKILL.md) · [`modes.md`](modes.md) (`<ColorMode>`, `<Background>`)

Percipio, LX Studio, Admin, and Platform override subsets of semantic mappings while keeping the shared alias API — see theme sources below before hardcoding palette names or hex.

## Semantic aliases (theme-stable names)

These tokens describe roles. Actual colors come from the active theme + ColorMode.

### Text

| Token            | Use for                     | Notes                      |
| ---------------- | --------------------------- | -------------------------- |
| `text`           | Default body and UI text    |                            |
| `text-accent`    | Stronger emphasis text      |                            |
| `text-secondary` | Supporting / secondary copy | Often opacity on base text |
| `text-disabled`  | Disabled state labels       |                            |

### Background

| Token                 | Use for                           | Notes                     |
| --------------------- | --------------------------------- | ------------------------- |
| `background`          | Default page/component background |                           |
| `background-primary`  | Slightly elevated surfaces        |                           |
| `background-contrast` | Maximum contrast surface          |                           |
| `background-selected` | Selected row / item               | Often low-opacity overlay |
| `background-hover`    | Hover state overlay               |                           |
| `background-disabled` | Disabled surface                  |                           |
| `background-success`  | Success state container           |                           |
| `background-warning`  | Warning state container           |                           |
| `background-error`    | Error state container             |                           |

### Interactive

| Token             | Use for                                   | Notes                        |
| ----------------- | ----------------------------------------- | ---------------------------- |
| `primary`         | Primary CTA, links, focus accents         | Pairs with `primary-hover`   |
| `primary-hover`   | Hover on primary interactive              |                              |
| `primary-inverse` | Accent on top of primary-colored surfaces |                              |
| `secondary`       | Secondary CTA, ghost buttons              | Pairs with `secondary-hover` |
| `secondary-hover` | Hover on secondary interactive            |                              |
| `danger`          | Destructive actions, error emphasis       | Pairs with `danger-hover`    |
| `danger-hover`    | Hover on danger interactive               |                              |

### Border

| Token              | Use for                    | Notes |
| ------------------ | -------------------------- | ----- |
| `border-primary`   | Strong borders, dividers   |       |
| `border-secondary` | Medium-weight borders      |       |
| `border-tertiary`  | Subtle borders, separators |       |
| `border-disabled`  | Disabled input borders     |       |

### Feedback

| Token              | Use for                    | Notes |
| ------------------ | -------------------------- | ----- |
| `feedback-error`   | Error messages, validation |       |
| `feedback-success` | Success messages           |       |
| `feedback-warning` | Warning messages           |       |

## Where resolved colors are documented

Use these instead of memorizing hex:

- Storybook [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) — how aliases map per light/dark for reference layouts.
- Storybook Foundations → Theme — per-product tables and guidance:
  - [Core Theme](https://gamut.codecademy.com/?path=/docs-foundations-theme-core-theme--docs)
  - [Admin Theme](https://gamut.codecademy.com/?path=/docs-foundations-theme-admin-theme--docs)
  - [Platform Theme](https://gamut.codecademy.com/?path=/docs-foundations-theme-platform-theme--docs)
  - [Percipio Theme](https://gamut.codecademy.com/?path=/docs-foundations-theme-percipio-theme--docs)
  - [LX Studio Theme](https://gamut.codecademy.com/?path=/docs-foundations-theme-lx-studio-theme--docs)
  - [Creating Themes](https://gamut.codecademy.com/?path=/docs-foundations-theme-creating-themes--docs) — authoring new themes in `gamut-styles`
- Product design YAML (root `DESIGN.md` from agent-tools): [`DESIGN.Codecademy.md`](../../DESIGN.Codecademy.md), [`DESIGN.Percipio.md`](../../DESIGN.Percipio.md), [`DESIGN.LXStudio.md`](../../DESIGN.LXStudio.md) — semantic ↔ palette for that product.
- Source: theme definitions in [`packages/gamut-styles/src/themes`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/themes), palette scales in [`packages/gamut-styles/src/variables`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/variables).

## Codecademy Core — illustrative light/dark hex only

The tables below are not valid for Percipio, LX Studio, or other themes. They are a quick mental model for Codecademy Core defaults only.

### Text

| Token            | Light        | Dark      |
| ---------------- | ------------ | --------- |
| `text`           | `#10162F`    | `#ffffff` |
| `text-accent`    | `#0A0D1C`    | `#FFF0E5` |
| `text-secondary` | navy-800 75% | white 65% |
| `text-disabled`  | navy-800 63% | white 50% |

### Background

| Token                 | Light        | Dark      |
| --------------------- | ------------ | --------- |
| `background`          | `#ffffff`    | `#10162F` |
| `background-primary`  | `#FFF0E5`    | `#0A0D1C` |
| `background-contrast` | white        | black     |
| `background-selected` | navy-800 4%  | white 4%  |
| `background-hover`    | navy-800 12% | white 9%  |
| `background-disabled` | navy-800 12% | white 9%  |
| `background-success`  | `#F5FFE3`    | `#151C07` |
| `background-warning`  | `#FFFAE5`    | `#211B00` |
| `background-error`    | `#FBF1F0`    | `#280503` |

### Interactive

| Token             | Light        | Dark      |
| ----------------- | ------------ | --------- |
| `primary`         | `#3A10E5`    | `#FFD300` |
| `primary-hover`   | `#5533FF`    | `#CCA900` |
| `primary-inverse` | `#FFD300`    | `#3A10E5` |
| `secondary`       | `#10162F`    | `#ffffff` |
| `secondary-hover` | navy-800 86% | white 80% |
| `danger`          | `#E91C11`    | `#E85D7F` |
| `danger-hover`    | `#BE1809`    | `#DC5879` |

### Border

| Token              | Light        | Dark      |
| ------------------ | ------------ | --------- |
| `border-primary`   | `#10162F`    | `#ffffff` |
| `border-secondary` | navy-800 75% | white 65% |
| `border-tertiary`  | navy-800 28% | white 20% |
| `border-disabled`  | navy-800 63% | white 50% |

### Feedback

| Token              | Light     | Dark      |
| ------------------ | --------- | --------- |
| `feedback-error`   | `#BE1809` | `#E85D7F` |
| `feedback-success` | `#008A27` | `#AEE938` |
| `feedback-warning` | `#FFD300` | `#FFFAE5` |

## Raw palette (Core-centric reference)

Raw tokens name fixed swatches (surfaces, illustration, `<Background bg="…">` on Codecademy). Palette keys and hex vary by theme — Percipio and others add or remap scales (`percipioPalette`, etc.). Confirm allowed keys in the active theme or `DESIGN.md` before using a raw token in a non-Core app.

For Codecademy Core defaults:

| Name     | Weights                    | Key values (illustrative)        |
| -------- | -------------------------- | -------------------------------- |
| `navy`   | 100–900                    | 800 = `#10162F`, 900 = `#0A0D1C` |
| `hyper`  | 400, 500                   | 500 = `#3A10E5`, 400 = `#5533FF` |
| `yellow` | 0, 400, 500, 900           | 500 = `#FFD300`                  |
| `red`    | 0, 300, 400, 500, 600, 900 | 500 = `#E91C11`                  |
| `green`  | 0, 100, 400, 700, 900      | 700 = `#008A27`                  |
| `blue`   | 0, 100, 300, 400, 500, 800 | 500 = `#1557FF`                  |
| `beige`  | —                          | `#FFF0E5`                        |
| `pink`   | 0, 400                     | 400 = `#F966FF`                  |
| `orange` | 100, 500                   | 500 = `#FF8C00`                  |

Named shorthand aliases commonly used on Core surfaces: `beige`, `blue`, `green`, `hyper`, `navy`, `orange`, `pink`, `red`, `yellow`, `black`, `white`

## Decision guide

```
Which product theme is GamutProvider using?
  └─ Unknown → check setup.md / DESIGN.md / Storybook theme page before assuming hex or palette name

Coloring UI text or backgrounds?
  └─ Must adapt to light/dark OR theme? → semantic alias (text, background, primary, …)
  └─ Must stay fixed regardless of mode?      → raw palette token (confirm key exists in that theme)
  └─ Section background with content inside? → <Background bg="…"> (see modes.md)
```
