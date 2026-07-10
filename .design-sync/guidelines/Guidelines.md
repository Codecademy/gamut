# Codecademy Gamut Design System Guidelines

This project uses the Codecademy Gamut design system, pre-compiled into `_ds_bundle.js` on `window.CodecademyGamut`. The `guidelines/` directory documents how to use it.

## Core Principle

Always use Gamut components, tokens, and patterns. Every element must trace back to an existing token, component, or documented pattern — never introduce ad-hoc values when a system equivalent exists. Prefer a purpose-built component (`List`, `DataList`, `DataTable`, `Toggle`, `Menu`, etc.) over recreating one from `Box`/`FlexBox` — see `overview-components.md`'s Component Discovery section.

## Reading order — READ THIS FIRST

### Step 1: Read all overview files (REQUIRED)

- `overview-setup.md` — `GamutProvider` + theme (defaults to `percipioTheme`), runtime model
- `overview-styling.md` — system props shorthand, `css()`/`variant()`/`states()`, no inline styles, no `className`, departures
- `overview-components.md` — general component rules, discovery, prop validation, quick reference
- `overview-icons.md` — selecting icons from the icon library
- `overview-illustrations.md` — using the illustration library
- `overview-patterns.md` — using the pattern library
- `overview-color-modes.md` — rules for `ColorMode` / `Background` (dark/light regions)
- `overview-accessibility.md` — accessibility requirements
- `overview-validation-checklist.md` — final validation checklist

### Step 2: Read all `design-tokens/` files (REQUIRED)

`colors.md`, `spacing.md`, `typography.md`, `border-radius.md` — theme-agnostic token _names_. Then read the file for whichever theme you're building for — token names resolve to different actual values (hex, weight, even radius size) per theme, and none of that is inferable from the names alone:

- `design-tokens/theme-percipio.md` — **default in this project**
- `design-tokens/theme-core.md` — Core / Admin / Platform (Codecademy)
- `design-tokens/theme-lxstudio.md` — LX Studio (note: different border-radius scale than the others)

### Step 3: Plan the components needed (REQUIRED)

### Step 4: Read each component's guide BEFORE writing code that uses it (REQUIRED)

| Using…                                                                             | Read first                      |
| ---------------------------------------------------------------------------------- | ------------------------------- |
| `FillButton` / `StrokeButton` / `TextButton` / `IconButton` / `CTAButton`          | `components/buttons.md`         |
| `GridForm` / `ConnectedForm`                                                       | `components/forms.md`           |
| `DataTable`                                                                        | `components/data-table.md`      |
| `DataList`                                                                         | `components/data-list.md`       |
| `List` / `ListRow` / `ListCol` / `TableHeader`                                     | `components/list.md`            |
| `Menu` / `MenuItem` / `MenuSeparator`                                              | `components/menu.md`            |
| `Card`                                                                             | `components/card.md`            |
| `Select` / `SelectDropdown`                                                        | `components/select.md`          |
| `RadialProgress`                                                                   | `components/radial-progress.md` |
| `Shimmer` / `Spinner` / `FeatureShimmer`                                           | `components/loading-states.md`  |
| `Coachmark`                                                                        | `components/coachmark.md`       |
| `ToolTip` / `InfoTip`                                                              | `components/tooltips.md`        |
| `Video`                                                                            | `components/video.md`           |
| `Rotation` / `ExpandInCollapseOut` / `FadeInSlideOut` (or any Animation primitive) | `components/animations.md`      |
| `ColorMode` / `Background` (dark/light regions, themes, modes)                     | `components/color-mode.md`      |
| Breakpoints, container queries, the 12-column page grid                            | `components/layout.md`          |
| Any component's accessibility behavior (what it handles vs. what you supply)       | `components/accessibility.md`   |
| Any icon, or picking the right icon name                                           | `components/icons.md`           |
| `Input` (controlled value, leading-icon slot)                                      | `components/input.md`           |
| `BarChart` custom styling (`styleConfig`) or custom scale (`scaleInterval`)        | `components/bar-chart.md`       |
| `DatePicker` locale/i18n                                                           | `components/date-picker.md`     |

For a component's full prop list, read its `.d.ts` and `.prompt.md` in `components/<group>/<Name>/` — see the project README's Agent Information section.

### Step 5: Verify each icon exists in the icon library (REQUIRED)

Check `components/icons.md` for the exact name. If a needed icon is
unavailable, pick a different one and verify it there.

## Departures

If a build genuinely can't follow one of these guidelines — no semantic token fits a required color, a third-party integration needs `className` — don't silently deviate. Call it out explicitly (see `overview-styling.md`'s Departures section).
