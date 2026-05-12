# Color

Use **semantic aliases** for all UI that adapts to color mode or theme. Use raw palette tokens only when a color must stay fixed regardless of mode.

## Semantic aliases

### Text

| Token            | Light        | Dark      | Use for                     |
| ---------------- | ------------ | --------- | --------------------------- |
| `text`           | `#10162F`    | `#ffffff` | Default body and UI text    |
| `text-accent`    | `#0A0D1C`    | `#FFF0E5` | Stronger emphasis text      |
| `text-secondary` | navy-800 75% | white 65% | Supporting / secondary copy |
| `text-disabled`  | navy-800 63% | white 50% | Disabled state labels       |

### Background

| Token                 | Light        | Dark      | Use for                           |
| --------------------- | ------------ | --------- | --------------------------------- |
| `background`          | `#ffffff`    | `#10162F` | Default page/component background |
| `background-primary`  | `#FFF0E5`    | `#0A0D1C` | Slightly elevated surfaces        |
| `background-contrast` | white        | black     | Maximum contrast surface          |
| `background-selected` | navy-800 4%  | white 4%  | Selected row / item               |
| `background-hover`    | navy-800 12% | white 9%  | Hover state overlay               |
| `background-disabled` | navy-800 12% | white 9%  | Disabled surface                  |
| `background-success`  | `#F5FFE3`    | `#151C07` | Success state container           |
| `background-warning`  | `#FFFAE5`    | `#211B00` | Warning state container           |
| `background-error`    | `#FBF1F0`    | `#280503` | Error state container             |

### Interactive

| Token             | Light        | Dark      | Use for                           |
| ----------------- | ------------ | --------- | --------------------------------- |
| `primary`         | `#3A10E5`    | `#FFD300` | Primary CTA, links, focus rings   |
| `primary-hover`   | `#5533FF`    | `#CCA900` | Hover on primary interactive      |
| `primary-inverse` | `#FFD300`    | `#3A10E5` | Primary on a colored background   |
| `secondary`       | `#10162F`    | `#ffffff` | Secondary CTA, ghost buttons      |
| `secondary-hover` | navy-800 86% | white 80% | Hover on secondary interactive    |
| `interface`       | `#3A10E5`    | `#FFD300` | Checkboxes, toggles, sliders      |
| `interface-hover` | `#5533FF`    | `#CCA900` | Hover on interface elements       |
| `danger`          | `#E91C11`    | `#E85D7F` | Destructive actions, error states |
| `danger-hover`    | `#BE1809`    | `#DC5879` | Hover on danger interactive       |

### Border

| Token              | Light        | Dark      | Use for                    |
| ------------------ | ------------ | --------- | -------------------------- |
| `border-primary`   | `#10162F`    | `#ffffff` | Strong borders, dividers   |
| `border-secondary` | navy-800 75% | white 65% | Medium-weight borders      |
| `border-tertiary`  | navy-800 28% | white 20% | Subtle borders, separators |
| `border-disabled`  | navy-800 63% | white 50% | Disabled input borders     |

### Feedback

| Token              | Light     | Dark      | Use for                    |
| ------------------ | --------- | --------- | -------------------------- |
| `feedback-error`   | `#BE1809` | `#E85D7F` | Error messages, validation |
| `feedback-success` | `#008A27` | `#AEE938` | Success messages           |
| `feedback-warning` | `#FFD300` | `#FFFAE5` | Warning messages           |

## Raw palette

Use raw tokens only when color must be **fixed** (not adaptive).

| Name     | Weights                    | Key values                       |
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

Named shorthand aliases: `beige`, `blue`, `green`, `hyper`, `navy`, `orange`, `pink`, `red`, `yellow`, `black`, `white`

## Decision guide

```
Coloring UI text or backgrounds?
  └─ Needs to adapt to light/dark or theme? → use semantic alias (text, background, primary, …)
  └─ Must be fixed regardless of mode?      → use raw token (navy-800, yellow-500, …)
  └─ Setting a section background with content inside? → use <Background bg="…"> (see modes.md)
```
