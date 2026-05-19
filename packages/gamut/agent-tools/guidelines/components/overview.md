# Components

52 components have Figma ↔ code mappings via Figma Code Connect (`packages/code-connect/`). Live code snippets appear in Figma's inspect panel when you select a component.

## Core rules

- Always use existing Gamut components from `packages/gamut/src` rather than one-off equivalents. See the quick reference table below.
- Apply exact sizing, variant, and props from the source. Never rely on defaults when the design or prompt specifies a value (e.g. `size="small"` on `Input`, `sizeVariant="small"` on `Select`).
- When unsure, reference `Badge`, `Tag`, or button atoms in `packages/gamut/src`.

## Forms vs. standalone inputs

Functional forms — submit/save bundling multiple fields, validation, errors, or dirty tracking — must use `GridForm` or `ConnectedForm`. Read [forms.md](forms.md) before building any functional form.

Standalone inputs — live search, real-time filters, single controls that update state immediately — use bare atoms (`Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`). No organism when there is no submit step.

The test: submit/save bundled values → organism. Real-time state with no submit → atom.

## Component discovery

Before custom markup for any UI pattern:

1. Enumerate exports — check `@codecademy/gamut` public API or `index.d.ts`.
2. Prefer Gamut over raw HTML — e.g. `Menu` for nav, `DataTable` for tables, `Tabs` for tabs. Do not rebuild from `<ul>` / `<motion.div>` when a primitive exists.
3. Read type definitions for props before custom wrappers.
4. Never build custom media players — use `Video` ([video.md](video.md)).
5. When no Gamut component exists, comment: `{/* No Gamut component for [pattern] — custom markup */}`

### Quick reference

| UI Pattern            | Gamut component(s)                                                    | Guide                                                                    |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Buttons               | `FillButton`, `StrokeButton`, `TextButton`, `IconButton`, `CTAButton` | [buttons.md](buttons.md)                                                 |
| Links                 | `Anchor`                                                              | —                                                                        |
| Typography            | `Text`                                                                | [`gamut-typography` skill](../../skills/gamut-typography/SKILL.md)       |
| Markdown              | `Markdown`                                                            | —                                                                        |
| Layout                | `Box`, `FlexBox`, `GridBox`, `Layout`, `LayoutGrid`                   | [spacing.md](../foundations/spacing.md)                                  |
| Animations            | `Rotation`, `ExpandInCollapseOut`, `FadeInSlideOut`                   | [animations.md](animations.md)                                           |
| Page containers       | `ContentContainer`, `GridContainer`                                   | —                                                                        |
| Navigation / menus    | `Menu`, `MenuItem`, `MenuSeparator`                                   | [menu.md](menu.md)                                                       |
| Breadcrumbs           | `Breadcrumbs`                                                         | —                                                                        |
| Pagination            | `Pagination`                                                          | —                                                                        |
| Tabs                  | `Tabs`                                                                | [`gamut-accessibility` skill](../../skills/gamut-accessibility/SKILL.md) |
| Accordions            | `Disclosure`                                                          | —                                                                        |
| Data tables           | `DataTable`, `DataList`                                               | [data-table.md](data-table.md)                                           |
| Lists                 | `List`                                                                | —                                                                        |
| Cards                 | `Card`                                                                | [card.md](card.md)                                                       |
| Charts                | `BarChart`                                                            | —                                                                        |
| Modals                | `Dialog` (binary confirm/cancel); `Modal` (multi-view, complex)       | [`gamut-accessibility` skill](../../skills/gamut-accessibility/SKILL.md) |
| Drawers / flyouts     | `Drawer`, `Flyout`                                                    | [`gamut-accessibility` skill](../../skills/gamut-accessibility/SKILL.md) |
| Overlays / focus trap | `Overlay`, `FocusTrap`                                                | [`gamut-accessibility` skill](../../skills/gamut-accessibility/SKILL.md) |
| Popovers              | `Popover`, `PopoverContainer`                                         | —                                                                        |
| Tooltips              | `ToolTip`, `InfoTip`, `PreviewTip`                                    | [tooltips.md](tooltips.md)                                               |
| Onboarding            | `Coachmark`                                                           | [coachmark.md](coachmark.md)                                             |
| Alerts / toasts       | `Alert`, `Toast`, `Toaster`                                           | —                                                                        |
| Badges / tags         | `Badge`, `Tag`                                                        | —                                                                        |
| Progress              | `ProgressBar`, `RadialProgress`                                       | [radial-progress.md](radial-progress.md)                                 |
| Loading               | `Shimmer`, `Spinner`                                                  | [loading-states.md](loading-states.md)                                   |
| Video                 | `Video`                                                               | [video.md](video.md)                                                     |
| Forms                 | `GridForm`, `ConnectedForm`                                           | [forms.md](forms.md)                                                     |
| Standalone inputs     | `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`       | Forms breadcrumb above                                                   |
| Rich select           | `SelectDropdown`                                                      | [select.md](select.md)                                                   |
| Date                  | `DatePicker`                                                          | [`gamut-forms` skill](../../skills/gamut-forms/SKILL.md)                 |
| Toggle (standalone)   | `Toggle`                                                              | —                                                                        |
| Screen reader text    | `HiddenText`                                                          | —                                                                        |
| Skip link             | `SkipToContent`                                                       | —                                                                        |
| Dark / light regions  | `ColorMode`, `Background`                                             | [modes.md](../foundations/modes.md)                                      |

## Validate variant props

`Card`, `Badge`, `Tag`, and `Alert` accept specific `variant` values. Invalid strings (e.g. `"navy-on-white"`) crash `parseToHsl()` at runtime. Inspect prop types in `@codecademy/gamut` before using variant/color props. See [card.md](card.md) for `Card` variants.

## Catalog by layer

### Atoms

Badge, FillButton, StrokeButton, CTAButton, TextButton, IconButton, Card, Checkbox, CodeBlock, Drawer, FlexBox, FormGroup, GridBox, HiddenText, Icon, Input, Label, Loader, Radio, Select, Spinner, Tag, TextArea, Toggle, Tooltip

### Molecules

Alert, Anchor, Breadcrumbs, Coachmark, Disclosure, GridForm, Markdown, Menu, Modal, Pagination, Popover, ProgressBar, Table, Tabs, Toast, Toaster, Video

### Organisms

ContentContainer, GridContainer, Layout, LayoutGrid

## Key patterns

### Buttons

[buttons.md](buttons.md) — `FillButton` primary, `StrokeButton` secondary.

### Forms and accessibility

[forms.md](forms.md) · [`gamut-forms` skill](../../skills/gamut-forms/SKILL.md) · [`gamut-accessibility` skill](../../skills/gamut-accessibility/SKILL.md)

### Cards

See [card.md](card.md). Variants include `default`, `white`, `yellow`, `hyper`, `navy`. Confirm against `DESIGN.md` for theme-specific surfaces.
`FormGroup`, `GridForm`, `ConnectedForm`, tips, dialogs, composite widgets: [`skills/gamut-forms/SKILL.md`](../../skills/gamut-forms/SKILL.md) (forms) · [`skills/gamut-accessibility/SKILL.md`](../../skills/gamut-accessibility/SKILL.md) (overlays, composites, checklists) · Storybook [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page).

- Background variants: `default` (ColorMode-responsive), `white`, `yellow`, `beige`, `navy`, `hyper`
- Shadow variants: `none` (default), `outline`, `patternLeft`, `patternRight`
- Add `isInteractive` when wrapping in `<Anchor>` — enables hover shadow + `borderRadius: md`
- Default `borderRadius` is `none`; override with `borderRadius` prop

### Color-aware regions

[foundations/modes.md](../foundations/modes.md) — `<ColorMode mode="light|dark|system">`, `<Background bg="…">`.

### Alerts

| Variant | Tokens                                    |
| ------- | ----------------------------------------- |
| Error   | `feedback-error` + `background-error`     |
| Success | `feedback-success` + `background-success` |
| Warning | `feedback-warning` + `background-warning` |

## Global tokens

| Token          | Value                   | Use                |
| -------------- | ----------------------- | ------------------ |
| `headerHeight` | 64px (base), 80px (md+) | Global page header |
| `headerZ`      | 15                      | Header z-index     |
