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

| Theme         | Product                         | Base font      | Dark mode |
| ------------- | ------------------------------- | -------------- | --------- |
| **Core**      | Codecademy (default)            | Apercu         | ✓         |
| **Admin**     | Codecademy admin tools          | Apercu         | ✓         |
| **Platform**  | Codecademy learning environment | Apercu         | ✓         |
| **LX Studio** | LX Studio application           | Hanken Grotesk | —         |
| **Percipio**  | Skillsoft Percipio              | Roboto         | —         |

Set the theme at the app root via `<GamutProvider theme={...}>`.

## Reading order

| File                                                   | What it covers                                                          |
| ------------------------------------------------------ | ----------------------------------------------------------------------- |
| [setup.md](setup.md)                                   | Packages, GamutProvider, theme selection                                |
| [foundations/color.md](foundations/color.md)           | Semantic roles (all themes), where to verify hex, Core-only cheatsheets |
| [foundations/modes.md](foundations/modes.md)           | Light/dark ColorMode, Background component                              |
| [foundations/typography.md](foundations/typography.md) | Typefaces, font scale, rules                                            |
| [foundations/spacing.md](foundations/spacing.md)       | Spacing, border radius, responsive grid                                 |
| [components/overview.md](components/overview.md)       | Full component catalog                                                  |
| [components/buttons.md](components/buttons.md)         | Button variants, props, decision tree                                   |
