# Gamut Design System

Gamut is the Codecademy / Skillsoft design system — React component library (`@codecademy/gamut`), design tokens (`@codecademy/gamut-styles`), and Figma components with live code previews via Figma Code Connect.

**Design voice**: "Ruled by logic, but creative and a bit unexpected." Structured and trustworthy for a learning platform, with engaging personality. Medium density — information-rich layouts with strong typographic hierarchy. Never cramped or overly airy.

**Core principles**:

- Components are color mode–aware by default — never hardcode hex values for adaptive, accessible UI
- All components work across all themes without modification
- 12-column grid
- Use **semantic theme tokens** from `@codecademy/gamut-styles` for **color roles** (ColorMode-aware), **typography**, **spacing**, **border radii**, and shared **layout** values (`elements`, …) — not raw palette hex or magic numbers. Defaults support accessible pairings, but **no token set guarantees WCAG AA** for every composition; validate non-standard combinations.

**ColorMode in product UI:** Use `<ColorMode>` and `<Background>` from `@codecademy/gamut-styles` for scoped light/dark and contrast-safe surfaces — see [foundations/modes.md](foundations/modes.md) and the `gamut-color-mode` skill. Storybook: [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page), [Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) (semantic tokens + `css` / `variant` / `states`).

**Agent skills (styling / themes):** `gamut-style-utilities` (`css`, `variant`, `states`, `StyleProps`), `gamut-theming` (which theme, `GamutProvider`, new themes), `gamut-system-props` (`system.*` / `Box`), `gamut-color-mode` (ColorMode / semantic color).

## Themes

Runtime stacks come from `@codecademy/gamut-styles` (see [foundations/typography.md](foundations/typography.md)). Product `DESIGN.*.md` may differ until reconciled.

| Theme         | Product                         | Primary UI fonts (shipped theme)                                               | Dark mode |
| ------------- | ------------------------------- | ------------------------------------------------------------------------------ | --------- |
| **Core**      | Codecademy (default)            | Apercu + Suisse (`accent`)                                                     | ✓         |
| **Admin**     | Codecademy admin tools          | Same as Core                                                                   | ✓         |
| **Platform**  | Codecademy learning environment | Same as Core                                                                   | ✓         |
| **LX Studio** | LX Studio application           | Skillsoft Text / Sans (`base` / `accent`); DESIGN docs may list Hanken Grotesk | —         |
| **Percipio**  | Skillsoft Percipio              | Skillsoft Text / Sans; DESIGN docs may list Roboto                             | —         |

Set the theme at the app root via `<GamutProvider theme={...}>`.

**Figma Make, `gamut plugin`, and `DESIGN.md`:** See Storybook [Meta → AI Tooling → Creating design with AI](https://gamut.codecademy.com/?path=/docs-meta-ai-tooling-creating-design-with-ai--page). For product design context in app repos, copy the appropriate `DESIGN.*.md` from `agent-tools` to the repository root as `DESIGN.md` (documented there).

## Reading order

| File                                                   | What it covers                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [setup.md](setup.md)                                   | Packages, GamutProvider, theme selection                                       |
| [foundations/color.md](foundations/color.md)           | Semantic roles (all themes), where to verify hex, Core-only cheatsheets        |
| [foundations/modes.md](foundations/modes.md)           | Light/dark ColorMode, Background component                                     |
| [foundations/typography.md](foundations/typography.md) | Theme fonts, scales, semantic `title` weight (700 vs 500), Core voice rules    |
| [foundations/spacing.md](foundations/spacing.md)       | Spacing scale, radii, Layout grid; system props + responsive/container queries |
| [components/overview.md](components/overview.md)       | Full component catalog                                                         |
| [components/buttons.md](components/buttons.md)         | Button variants, props, decision tree                                          |
| `agent-tools/skills/gamut-style-utilities/SKILL.md`    | `css` / `variant` / `states`, `StyleProps`, `useTheme` escape hatch            |
| `agent-tools/skills/gamut-theming/SKILL.md`            | Theme matrix, `GamutProvider`, CreatingThemes                                  |
