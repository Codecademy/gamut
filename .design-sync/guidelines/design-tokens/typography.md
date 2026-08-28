# Typography Tokens

| Property    | Accepted Values                                    |
| ----------- | -------------------------------------------------- |
| Font family | `accent` · `base` · `monospace` · `system`         |
| Font size   | `14 · 16 · 18 · 20 · 22 · 26 · 34 · 44 · 64`       |
| Font weight | `base` · `title`                                   |
| Line height | `base` (1.5) · `title` (1.2) · `spacedTitle` (1.3) |

**No off-system font sizes, weights, or families.** Every typographic choice must come from the tokens above.

## `fontWeight="title"` differs by theme — never hardcode `700`

| Themes                      | `fontFamily.base`                      | `fontFamily.accent`                       | `fontWeight.title` |
| --------------------------- | -------------------------------------- | ----------------------------------------- | ------------------ |
| Core, Admin, Platform       | Apercu stack                           | Suisse + Apercu stack                     | 700                |
| Percipio (**default here**) | Skillsoft Text                         | Skillsoft Sans; `monospace` → Roboto Mono | 500                |
| LX Studio                   | Skillsoft Text/Sans (same as Percipio) | Same                                      | 500                |

Admin and Platform extend Core for colors/modes only — typography matches Core. Licensing: Apercu is licensed for Codecademy surfaces only; Skillsoft products (Percipio, LX Studio) use their own stacks.

**Always use `fontWeight="title"` for headlines/emphasis** — never hardcode `700` unless a Figma design SPECIFICALLY calls for that literal weight on Percipio/LX. A literal `700` breaks Skillsoft branding on those themes.

| Token   | Core / Admin / Platform | Percipio / LX Studio |
| ------- | ----------------------- | -------------------- |
| `base`  | 400                     | 400                  |
| `title` | 700                     | 500                  |

## Line length

| Context            | Target                   |
| ------------------ | ------------------------ |
| Single-column body | ~66 characters (max ~85) |
| Multi-column       | ≤50 characters per line  |
| Minimum            | ~45 characters           |

## Semantic vs. visual headings

`<Text as="h1">`…`<Text as="h6">` gets default heading styles mapped to the type scale (`h1` largest through `h6` smallest). Plain `<Text>` defaults to `as="span"`. Use `variant` plus `fontSize`/`fontWeight`/`lineHeight` to override element defaults when the document outline needs one heading level but the UI needs a different visual weight — e.g. `<Text as="h2" variant="title-sm">`. Still pick `h1`–`h6` for document structure and assistive tech; overrides are for intentional divergence between semantics and appearance.
