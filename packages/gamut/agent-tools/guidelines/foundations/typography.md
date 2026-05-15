# Typography

Use **theme typography tokens** (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`) — never hardcoded font-family strings or magic px for product UI. Prefer `<Text>` from `@codecademy/gamut`, or `system.typography` / `css()` from `@codecademy/gamut-styles` ([`gamut-system-props` skill](../../skills/gamut-system-props/SKILL.md)).

Source of truth for scales and stacks: [`packages/gamut-styles/src/variables/typography.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/variables/typography.ts) and theme builders under [`packages/gamut-styles/src/themes`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/themes).

**Storybook:** [Typography / Text](https://gamut.codecademy.com/?path=/docs-typography-text--docs) · [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) (system props) · Foundations / Theme: [Core](https://gamut.codecademy.com/?path=/docs-foundations-theme-core-theme--docs), [Percipio](https://gamut.codecademy.com/?path=/docs-foundations-theme-percipio-theme--docs), [LX Studio](https://gamut.codecademy.com/?path=/docs-foundations-theme-lx-studio-theme--docs)

**DESIGN.md drift:** [`DESIGN.Percipio.md`](../../DESIGN.Percipio.md) and [`DESIGN.LXStudio.md`](../../DESIGN.LXStudio.md) sometimes describe **Roboto** or **Hanken Grotesk** for those products. **Shipped `gamut-styles` themes** currently use the stacks below (Skillsoft Text / Sans). Treat DESIGN YAML as product narrative until it matches code — confirm with the design platform when they disagree.

## Themes × font families

Semantic keys (`base`, `accent`, `monospace`, `system`) are stable; resolved stacks depend on `GamutProvider` theme ([`setup.md`](../setup.md)).

| Theme                             | `fontFamily.base`                    | `fontFamily.accent`                   | `fontFamily.monospace`                 | `fontFamily.system`            |
| --------------------------------- | ------------------------------------ | ------------------------------------- | -------------------------------------- | ------------------------------ |
| **Core**, **Admin**, **Platform** | Apercu stack (`fontBase`)            | Suisse + Apercu stack (`fontAccent`)  | Monaco / Menlo stack (`fontMonospace`) | System UI stack (`fontSystem`) |
| **Percipio**                      | Skillsoft Text (`fontPercipioBase`)  | Skillsoft Sans (`fontPercipioAccent`) | Roboto Mono                            | Roboto (`system`)              |
| **LX Studio**                     | Same as Percipio (`base` / `accent`) | Same                                  | Same stack as Core (`fontMonospace`)   | Same as Core (`fontSystem`)    |

Admin and Platform extend Core for colors / modes only — typography matches Core.

**Licensing:** Apercu is licensed for Codecademy surfaces only; Skillsoft products use Percipio/LX stacks above.

## Font size scale

Values are `rem`-backed keys on `theme.fontSize` (aliases shown as px for readability).

| Token | Size | Common use                   |
| ----- | ---- | ---------------------------- |
| `64`  | 64px | Hero / display               |
| `44`  | 44px | Page titles                  |
| `34`  | 34px | Section titles               |
| `26`  | 26px | Sub-section titles           |
| `22`  | 22px | Card titles, large UI labels |
| `20`  | 20px | Secondary titles             |
| `18`  | 18px | Large body, intro text       |
| `16`  | 16px | Default body text            |
| `14`  | 14px | Small body, captions, labels |

## Line height

| Token         | Value | Use                          |
| ------------- | ----- | ---------------------------- |
| `base`        | 1.5   | Body text                    |
| `spacedTitle` | 1.3   | Sub-headlines, medium titles |
| `title`       | 1.2   | Large headlines              |

## Font weight (semantic)

Use **semantic keys** on components — do not assume a numeric bold everywhere.

| Token   | Core / Admin / Platform | Percipio / LX Studio              |
| ------- | ----------------------- | --------------------------------- |
| `base`  | 400                     | 400                               |
| `title` | **700**                 | **500** (`fontWeightMediumTitle`) |

Headlines, CTAs, and buttons should use **`fontWeight="title"`** so Percipio/LX get **500**, Core gets **700**. Literal `700` breaks Skillsoft branding on those themes.

Numeric **`400`** and **`700`** keys also exist on the theme for rare explicit needs.

## Codecademy (Core / Admin / Platform) — voice & layout

These UX rules target **Apercu + Suisse** products; do not blindly apply to Percipio/LX without brand guidance.

- **`fontFamily="base"` (Apercu):** default UI and marketing type. Emphasis inside body copy: **Italic**, not Bold for intra-paragraph stress.
- **`fontFamily="accent"` (Suisse stack):** technical accent — code snippets, captions, labels with engineering flavor, figures. Use sparingly; glyph box reads larger — step **down ~10–15%** vs equivalent `base` size; give comfortable line-height.
- **Alignment:** left-align by default; center only short marketing headlines; avoid right-align except tabs / numerics.
- **Letter-spacing:** do not tweak tracking unless design specifies.
- **Line length:** ~45–85 characters per line (~66 ideal for single-column body); constrain container width, not arbitrary CSS letter-spacing.

## Line length (all products)

| Context            | Target              |
| ------------------ | ------------------- |
| Single-column body | ~66 chars (max ~85) |
| Multi-column       | ≤50 chars per line  |
| Minimum            | ~45 chars           |

## Related skills

- [`gamut-typography`](../../skills/gamut-typography/SKILL.md) — deeper editorial patterns for agents.
- [`gamut-style-utilities`](../../skills/gamut-style-utilities/SKILL.md) — `css()` / `variant` / `states` and tokenized typography in styled components.
- [`gamut-theming`](../../skills/gamut-theming/SKILL.md) — which theme / `GamutProvider` / `theme.d.ts`.
