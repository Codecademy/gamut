# Gamut Design System

## For agents

Do not load all guideline files. Read this overview’s **Step 2** table, then open **only** the `guidelines/components/*.md` (or foundation) guides you need for the current task. For Menu, DataTable, Card, and other components without a dedicated skill, use **`gamut-components`**.

Gamut is the Codecademy / Skillsoft design system — React component library (`@codecademy/gamut`), design tokens (`@codecademy/gamut-styles`), and Figma components with live code previews via Figma Code Connect.

**Core principle:** Always use Gamut components, tokens, and patterns. Every element must trace back to an existing token, component, or documented pattern — never introduce ad-hoc values when a system equivalent exists.

**Design voice**: "Ruled by logic, but creative and a bit unexpected." Structured and trustworthy for a learning platform, with engaging personality. Medium density — information-rich layouts with strong typographic hierarchy.

Core principles:

- Components are color mode–aware by default — never hardcode hex values for adaptive, accessible UI
- All components work across all themes without modification
- 12-column grid
- Use **semantic theme tokens** from `@codecademy/gamut-styles` for color roles, typography, spacing, border radii, and layout — not raw palette hex or magic numbers. Validate non-standard combinations against WCAG.
- **Product theme:** infer semantic tokens, fonts, and palette from root **`DESIGN.md`** (installed via `gamut plugin install --theme <name>`) and `<GamutProvider>`. See [`skills/gamut-theming/SKILL.md`](../skills/gamut-theming/SKILL.md).

**Agent skills:** `gamut-components`, `gamut-style-utilities`, `gamut-theming`, `gamut-system-props`, `gamut-color-mode`, `gamut-forms`, `gamut-accessibility`, `gamut-typography`, `gamut-testing`.

## Themes

| Theme         | Product                         | Primary UI fonts (shipped theme)                       | Dark mode |
| ------------- | ------------------------------- | ------------------------------------------------------ | --------- |
| **Core**      | Codecademy (default)            | Apercu + Suisse (`accent`)                             | ✓         |
| **Admin**     | Codecademy admin tools          | Same as Core                                           | ✓         |
| **Platform**  | Codecademy learning environment | Same as Core                                           | ✓         |
| **LX Studio** | LX Studio application           | Skillsoft Text / Sans (`base` / `accent`)              | ✓         |
| **Percipio**  | Skillsoft Percipio              | Skillsoft Text / Sans; Roboto Mono / Roboto (`system`) | ✓         |

Set the theme at the app root via `<GamutProvider theme={...}>`. Match **`DESIGN.md`** in the app repo to the active product.

**Plugin install:** Storybook [Meta → AI Tooling → Gamut plugin → Install](https://gamut.codecademy.com/?path=/docs-meta-ai-tooling-gamut-plugin-install--page). `gamut plugin install cursor --theme core` (or `percipio`, `lxstudio`, …) copies `DESIGN.*.md` to `./DESIGN.md`.

## Reading order

### Step 1: Overview (required)

| File                                                                                                                             | What it covers                                 |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [setup.md](setup.md)                                                                                                             | Packages, `GamutProvider`, theme selection     |
| [foundations/spacing.md](foundations/spacing.md) + [color.md](foundations/color.md) + [typography.md](foundations/typography.md) | Tokens — spacing, color, typography            |
| [foundations/modes.md](foundations/modes.md)                                                                                     | `ColorMode`, `Background`                      |
| [components/overview.md](components/overview.md)                                                                                 | Component catalog, discovery, forms breadcrumb |
| [overview-icons.md](overview-icons.md)                                                                                           | Icon selection from `@codecademy/gamut-icons`  |
| [overview-illustrations.md](overview-illustrations.md)                                                                           | `@codecademy/gamut-illustrations`              |
| [overview-patterns.md](overview-patterns.md)                                                                                     | `@codecademy/gamut-patterns`                   |
| [validation-checklist.md](validation-checklist.md)                                                                               | Pre-ship checklist                             |

### Step 2: Component guides (read before using that component)

| Using…                                                                    | Read first                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `FillButton` / `StrokeButton` / `TextButton` / `IconButton` / `CTAButton` | [components/buttons.md](components/buttons.md)                                                                           |
| `GridForm` / `ConnectedForm`                                              | [components/forms.md](components/forms.md) · [`skills/gamut-forms/SKILL.md`](../skills/gamut-forms/SKILL.md)             |
| `DataTable` / `DataList`                                                  | [components/data-table.md](components/data-table.md)                                                                     |
| `Menu` / `MenuItem` / `MenuSeparator`                                     | [components/menu.md](components/menu.md)                                                                                 |
| `Card`                                                                    | [components/card.md](components/card.md)                                                                                 |
| `Select` / `SelectDropdown`                                               | [components/select.md](components/select.md)                                                                             |
| `RadialProgress`                                                          | [components/radial-progress.md](components/radial-progress.md)                                                           |
| `Shimmer` / `Spinner` / `FeatureShimmer`                                  | [components/loading-states.md](components/loading-states.md)                                                             |
| `Coachmark`                                                               | [components/coachmark.md](components/coachmark.md)                                                                       |
| `ToolTip` / `InfoTip`                                                     | [components/tooltips.md](components/tooltips.md)                                                                         |
| `Video`                                                                   | [components/video.md](components/video.md)                                                                               |
| `Rotation` / `ExpandInCollapseOut` / `FadeInSlideOut`                     | [components/animations.md](components/animations.md)                                                                     |
| `ColorMode` / `Background`                                                | [foundations/modes.md](foundations/modes.md) · [`skills/gamut-color-mode/SKILL.md`](../skills/gamut-color-mode/SKILL.md) |

### Step 3: Skills (on demand)

| Skill                                                               | When                                                                                                  |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`gamut-components`](../skills/gamut-components/SKILL.md)           | Menu, DataTable, Card, Select, Video, Coachmark, loading, animations (read matching component guides) |
| [`gamut-style-utilities`](../skills/gamut-style-utilities/SKILL.md) | `css` / `variant` / `states`, `StyleProps`                                                            |
| [`gamut-system-props`](../skills/gamut-system-props/SKILL.md)       | `system.*`, responsive props, `Box`                                                                   |
| [`gamut-theming`](../skills/gamut-theming/SKILL.md)                 | Theme matrix, `GamutProvider`, new themes                                                             |
| [`gamut-color-mode`](../skills/gamut-color-mode/SKILL.md)           | ColorMode, semantic color, `<Background>`                                                             |
| [`gamut-forms`](../skills/gamut-forms/SKILL.md)                     | Form accessibility wiring                                                                             |
| [`gamut-accessibility`](../skills/gamut-accessibility/SKILL.md)     | Component a11y matrix, overlays                                                                       |
| [`gamut-typography`](../skills/gamut-typography/SKILL.md)           | Type stacks and voice                                                                                 |
| [`gamut-testing`](../skills/gamut-testing/SKILL.md)                 | `setupRtl`, test harnesses                                                                            |

Pre-ship audit: [`commands/gamut-review.md`](../commands/gamut-review.md) (`/gamut-review`).
