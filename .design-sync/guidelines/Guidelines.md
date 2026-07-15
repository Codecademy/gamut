# Codecademy Gamut Design System Guidelines

> **STOP — required reading before generating any code.** Read these in order before writing a single line; this is a gate, not a suggestion:
>
> 1. `guidelines/Guidelines.md` (this file)
> 2. `guidelines/overview-components.md` (the pattern → component discovery table)
> 3. `guidelines/overview-styling.md` (the styling do/don't list)
> 4. `guidelines/design-tokens/colors.md` + `guidelines/components/color-mode.md`
> 5. The per-component `.prompt.md` for every component you will use.

This project uses the Codecademy Gamut design system, pre-compiled into `_ds_bundle.js` on `window.CodecademyGamut`. The `guidelines/` directory documents how to use it.

## Core Principle

Always use Gamut components, tokens, and patterns. Every element must trace back to an existing token, component, or documented pattern — never introduce ad-hoc values when a system equivalent exists. Non-negotiable, in order:

1. **Props-only — no inline `style`, no inline `css` prop, no `className` for layout, spacing, or color.** Every system-prop-expressible style goes through a Gamut prop, `css()`, `variant()`, or `states()` — not Emotion's `css={...}` JSX prop written inline on an element. Any inline `style`/`css` or hex value is a **departure** and must be called out explicitly (see #5) — it is never a silent default.
2. **Every color is a semantic token, never hex.** Tokens only resolve inside `ColorMode` — see `design-tokens/colors.md`.
3. **Wrap the tree in `ColorMode`.** Skipping it is why hex creeps back in.
4. **Prefer a purpose-built component** (`List`, `DataList`, `DataTable`, `Toggle`, `Menu`, `Badge`, `Tag`, etc.) over recreating one from `Box`/`FlexBox` — see `overview-components.md`'s Component Discovery section and `components/index.md`'s decision table.
5. **Call out departures explicitly — never ship them silently.** This applies to the _request itself_, not just the output: if the designer/user asks for something outside system props, tokens, or semantic tokens (an exact hex, an arbitrary pixel value off the spacing scale, a one-off font size), tell them it deviates from the system before implementing it — don't silently comply, and don't silently substitute the nearest token without saying so.

## Styling do/don't (inlined from `overview-styling.md`)

- **Never use inline `style` attributes.** All styling must use system props or Gamut tokens — never the `style` JSX attribute or hardcoded values.
- **Use system props shorthand** for layout and spacing. Prefer abbreviated prop names over long-form equivalents.
- **Never use SCSS/CSS modules or `className`** on a Gamut component (`Box`, `FlexBox`, `Text`, `FillButton`, etc.) for styling — bypasses `ColorMode` token propagation and system-prop composition. `className` is acceptable only as an integration seam a third-party library requires — call it out explicitly when used, never as a styling mechanism.
- **Avoid nested selectors** in styled/Emotion template literals (bare tag selectors, `${Component} { }` child selectors) — style the target directly with system props or `as`, not from a parent wrapper.

Full detail, including the responsive-value syntax and `css()`/`variant()`/`states()` reference: `overview-styling.md`.

## Pattern → component (inlined from `overview-components.md`)

| UI Pattern                                                                      | Gamut Component(s)                                                                                               |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Buttons (action triggers)                                                       | `FillButton`, `StrokeButton`, `TextButton`, `IconButton` (details: `components/buttons.md`)                      |
| Links / hyperlinks                                                              | `Anchor`                                                                                                         |
| Typography / text rendering                                                     | `Text`                                                                                                           |
| Markdown rendering                                                              | `Markdown`                                                                                                       |
| Layout primitives, breakpoints, page grid                                       | `Box`, `FlexBox`, `GridBox`, `LayoutGrid` (details: `components/layout.md`)                                      |
| Animations / transitions / motion                                               | `Rotation`, `ExpandInCollapseOut`, `FadeInSlideOut` (details: `components/animations.md`)                        |
| Page content containers                                                         | `ContentContainer`                                                                                               |
| Navigation / menus — sidebar/section nav, account menus, kebab/overflow actions | `Menu`, `MenuItem`, `MenuSeparator` — never hand-built from `Box`/`FlexBox` rows (details: `components/menu.md`) |
| Breadcrumbs                                                                     | `Breadcrumbs`                                                                                                    |
| Pagination                                                                      | `Pagination`                                                                                                     |
| Tabs                                                                            | `Tabs` — composite, not a `tabs` prop (details: `components/tabs.md`)                                            |
| Accordions                                                                      | `Disclosure`                                                                                                     |
| Data tables / item-focused lists                                                | `DataTable` (details: `components/data-table.md`), `DataList` (details: `components/data-list.md`)               |
| Fully custom repeating rows                                                     | `List`, `ListRow`, `ListCol` (details: `components/list.md`) — only when `DataTable`/`DataList` don't fit        |
| Cards                                                                           | `Card`                                                                                                           |
| Bar charts / data visualization                                                 | `BarChart`                                                                                                       |
| Modals / dialogs                                                                | `Dialog` for binary-choice prompts; `Modal` for everything else                                                  |
| Drawers                                                                         | `Drawer`                                                                                                         |
| Flyout panels                                                                   | `Flyout`                                                                                                         |
| Modal overlays / scrims                                                         | `Overlay`                                                                                                        |
| Focus trapping                                                                  | `FocusTrap`                                                                                                      |
| Popovers                                                                        | `Popover`, `PopoverContainer`                                                                                    |
| DOM portals / z-index escapes                                                   | `BodyPortal` (usually internal to `Popover`/`Toaster`/`PopoverContainer`)                                        |
| Tooltips                                                                        | `ToolTip`, `InfoTip`, `PreviewTip` (details: `components/tooltips.md`)                                           |
| Onboarding / feature highlights                                                 | `Coachmark` (details: `components/coachmark.md`)                                                                 |
| Alerts                                                                          | `Alert` (details: `components/alert.md` — variant prop is `type`, not `variant`)                                 |
| Toast notifications                                                             | `Toast`, `Toaster`                                                                                               |
| Badges / Tags                                                                   | `Badge` for status (details: `components/badge.md`), `Tag` for categorization (details: `components/tag.md`)     |
| Progress                                                                        | `ProgressBar`, `RadialProgress`                                                                                  |
| Loading states                                                                  | `Shimmer`, `Spinner`                                                                                             |
| Media / video                                                                   | `Video`                                                                                                          |
| Forms                                                                           | `GridForm`, `ConnectedForm`                                                                                      |
| Standalone inputs (filters, live search, no submit step)                        | `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`                                                  |
| Searchable select / rich dropdown                                               | `SelectDropdown`                                                                                                 |
| Date input / selection                                                          | `DatePicker`                                                                                                     |
| Toggle switches (standalone)                                                    | `Toggle`                                                                                                         |
| Screen-reader-only text                                                         | `HiddenText`                                                                                                     |
| Skip-to-content accessibility links                                             | `SkipToContent`                                                                                                  |
| Dark / light regions                                                            | `ColorMode`, `Background` (rules: `overview-color-modes.md`; details: `components/color-mode.md`)                |

Full discovery rules (enumerate exports, read `.d.ts`, the "no Gamut component" required comment): `overview-components.md`.

## Semantic-token mapping (inlined from `components/color-mode.md`)

The default `theme` (`coreTheme`) ships with **`light`** and **`dark`** modes. These semantic tokens remap automatically based on the active mode — other themes' actual resolved values are in `design-tokens/theme-*.md`:

| Semantic Token        | Light Mode Value | Dark Mode Value |
| --------------------- | ---------------- | --------------- |
| `text`                | `navy-800`       | `white`         |
| `text-accent`         | `navy-900`       | `beige`         |
| `text-secondary`      | `navy-600`       | `white-600`     |
| `text-disabled`       | `navy-500`       | `white-500`     |
| `background`          | `white`          | `navy-800`      |
| `background-primary`  | `beige`          | `navy-900`      |
| `background-selected` | `navy-100`       | `white-100`     |
| `background-hover`    | `navy-200`       | `white-200`     |
| `primary`             | `hyper-500`      | `yellow-500`    |
| `secondary`           | `navy-800`       | `white`         |
| `border-primary`      | `navy-800`       | `white`         |
| `border-secondary`    | `navy-600`       | `white-600`     |
| `border-tertiary`     | `navy-300`       | `white-300`     |

Full detail — hooks, `Background`, common mistakes: `components/color-mode.md`. Common-hardcode lookup and status-color rules: `design-tokens/colors.md`.

## Reading order — READ THIS FIRST

### Step 1: Read all overview files (REQUIRED)

- `overview-setup.md` — `GamutProvider` + theme (defaults to `percipioTheme`), runtime model, switching themes
- `overview-styling.md` — system props shorthand, `css()`/`variant()`/`states()`, no inline styles, no `className`, departures
- `overview-components.md` — general component rules, discovery, prop validation, quick reference
- `components/index.md` — one-line decision table for every component: use when / not this-use X instead. Scan this before writing any layout code.
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

Check `recipes/` for a full composed example before planning from scratch — `recipes/data-list-with-status.md` (rows of data with a status indicator) and `recipes/tabbed-sections.md` (switchable content groups) cover the two patterns most often rebuilt from `Box`/`FlexBox`.

### Step 4: Read each component's guide BEFORE writing code that uses it (REQUIRED)

| Using…                                                                               | Read first                      |
| ------------------------------------------------------------------------------------ | ------------------------------- |
| `FillButton` / `StrokeButton` / `TextButton` / `IconButton` / `CTAButton`            | `components/buttons.md`         |
| `GridForm` / `ConnectedForm`                                                         | `components/forms.md`           |
| `DataTable`                                                                          | `components/data-table.md`      |
| `DataList`                                                                           | `components/data-list.md`       |
| `List` / `ListRow` / `ListCol` / `TableHeader`                                       | `components/list.md`            |
| `Menu` / `MenuItem` / `MenuSeparator`                                                | `components/menu.md`            |
| `Tabs` / `TabList` / `Tab` / `TabPanels` / `TabPanel` (composite, not a `tabs` prop) | `components/tabs.md`            |
| `Card`                                                                               | `components/card.md`            |
| `Badge`                                                                              | `components/badge.md`           |
| `Tag`                                                                                | `components/tag.md`             |
| `Alert`                                                                              | `components/alert.md`           |
| `Select` / `SelectDropdown`                                                          | `components/select.md`          |
| `RadialProgress`                                                                     | `components/radial-progress.md` |
| `Shimmer` / `Spinner` / `FeatureShimmer`                                             | `components/loading-states.md`  |
| `Coachmark`                                                                          | `components/coachmark.md`       |
| `ToolTip` / `InfoTip`                                                                | `components/tooltips.md`        |
| `Video`                                                                              | `components/video.md`           |
| `Rotation` / `ExpandInCollapseOut` / `FadeInSlideOut` (or any Animation primitive)   | `components/animations.md`      |
| `ColorMode` / `Background` (dark/light regions, themes, modes)                       | `components/color-mode.md`      |
| Breakpoints, container queries, the 12-column page grid                              | `components/layout.md`          |
| Any component's accessibility behavior (what it handles vs. what you supply)         | `components/accessibility.md`   |
| Any icon, or picking the right icon name                                             | `components/icons.md`           |
| `Input` (controlled value, leading-icon slot)                                        | `components/input.md`           |
| `BarChart` custom styling (`styleConfig`) or custom scale (`scaleInterval`)          | `components/bar-chart.md`       |
| `DatePicker` locale/i18n                                                             | `components/date-picker.md`     |

For a component's full prop list, read its `.d.ts` and `.prompt.md` in `components/<group>/<Name>/` — see the project README's Agent Information section.

### Step 5: Verify each icon exists in the icon library (REQUIRED)

Check `components/icons.md` for the exact name. If a needed icon is unavailable, pick a different one and verify it there.

## Before you ship

- [ ] No inline `style`, no inline `css` prop, and no `className` used for layout, spacing, or color (props-only).
- [ ] Every color resolves to a semantic token — no hex.
- [ ] A purpose-built component chosen over a `Box` rebuild where one exists.
- [ ] Navigation and action lists use `Menu` — not hand-built `Box`/`FlexBox` link rows.
- [ ] `DataTable`/`DataList` used instead of `List` for large or sortable tabular data.
- [ ] One `GamutProvider` + one `ColorMode` wraps the entire tree.
- [ ] Read the `.prompt.md` for every component used.

## Departures

If a build genuinely can't follow one of these guidelines — no semantic token fits a required color, a third-party integration needs `className` — don't silently deviate. Call it out explicitly (see `overview-styling.md`'s Departures section). The same applies when the _request_ itself asks for something off-system (an exact hex, an arbitrary pixel value, a one-off font size) — tell the designer/user it deviates before building it, rather than silently complying or silently coercing it to the nearest token.
