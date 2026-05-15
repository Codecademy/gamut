# Gamut Design System

Gamut is the Codecademy / Skillsoft design system — React component library (`@codecademy/gamut`), design tokens (`@codecademy/gamut-styles`), and Figma components with live code previews via Figma Code Connect.

**Design voice**: "Ruled by logic, but creative and a bit unexpected." Structured and trustworthy for a learning platform, with engaging personality. Medium density — information-rich layouts with strong typographic hierarchy. Never cramped or overly airy.

**Core principles**:

- Components are color mode–aware by default — never hardcode hex values for adaptive UI
- All components work across all themes without modification
- Mobile-first, 12-column grid
- Semantic color tokens guarantee WCAG AA contrast automatically

**ColorMode in product UI:** Use `<ColorMode>` and `<Background>` from `@codecademy/gamut-styles` for scoped light/dark and contrast-safe surfaces — see [foundations/modes.md](foundations/modes.md) and the `gamut-color-mode` skill. Storybook: [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page), [Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) (semantic tokens + `css` / `variant` / `states`).

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
