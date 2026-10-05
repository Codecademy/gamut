---
name: gamut-component-first
description: Use this skill BEFORE writing any new custom UI component, control, overlay, or interactive pattern in a codebase that depends on `@codecademy/gamut` — check whether Gamut already provides it before building bespoke markup/CSS. Triggers on requests to build/add a modal, dialog, dropdown, select, tooltip, popover, context menu, tabs, toggle/switch, accordion, avatar, badge, tag/chip, pagination, toast/notification, date picker, progress bar, loading spinner/skeleton, card, alert/banner, breadcrumb, or any custom `position: fixed`/`absolute` overlay, hand-rolled focus trap, or custom `role="dialog"`/`"menu"`/`"tooltip"`/`"listbox"`. Not for auditing code that already exists — see `gamut-review`'s bespoke component duplication check for that.
---

# Gamut Component-First

Before writing a new component, control, or interactive pattern from scratch, check whether `@codecademy/gamut` already provides it. Building a parallel bespoke version costs more than the one-time effort: it silently bypasses ColorMode/dark-mode support, the variance/system-props styling model, the focus-trap and dismiss conventions, and the accessibility work already done in the library — and it has to be independently maintained forever after.

Source: `packages/gamut/src/*` (component export surface). See also: [`gamut-review`](../gamut-review/SKILL.md) — its bespoke component duplication check audits existing code for this same problem after the fact.

---

## The rule

1. Name the UI need in plain language (e.g. "a way to confirm a destructive action," "a floating options list under a text input").
2. Check the decision table below. If it names a component, use that — don't rebuild it, even partially.
3. If the need isn't in the table, check the [full component index](#full-component-index) below, or the [Storybook navigation](https://gamut.codecademy.com/) / `packages/gamut/src` directory listing directly.
4. Only after a genuine miss, build custom — and prefer _composing_ existing primitives (`Box`/`FlexBox`, `Overlay`, `FocusTrap`, `PopoverContainer`, system props, `css()`/`variant()`/`states()` from `@codecademy/gamut-styles`) over raw markup/CSS. Composing primitives is the intended pattern, not a violation of this rule.
5. If what you just built feels like it could be needed again elsewhere in the app (not a one-off), say so — it's a candidate for becoming a real Gamut component upstream instead of living as a silently duplicated pattern.

---

## Decision table (common needs)

| You need...                                               | Use                                                                                                                                                                         | Skill / reference                                                                                                |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Confirm/cancel dialog, free-form modal, multi-step wizard | `Modal`, `Dialog`                                                                                                                                                           | [`gamut-modal`](../gamut-modal/SKILL.md)                                                                         |
| Floating panel anchored to a trigger element              | `PopoverContainer`                                                                                                                                                          | [`gamut-menu`](../gamut-menu/SKILL.md) (usage pattern) · [`gamut-z-index`](../gamut-z-index/SKILL.md) (stacking) |
| Action list / context menu / nav menu                     | `Menu`, `MenuItem`, `MenuSeparator`                                                                                                                                         | [`gamut-menu`](../gamut-menu/SKILL.md)                                                                           |
| Dropdown / combobox inside a form                         | `SelectDropdown`                                                                                                                                                            | Storybook: Molecules / SelectDropdown — no dedicated skill yet                                                   |
| Hover/focus tooltip, rich hover preview, inline info icon | `ToolTip`, `PreviewTip`, `InfoTip` (all built on `Tip`)                                                                                                                     | [`gamut-accessibility`](../gamut-accessibility/SKILL.md#tooltip-detail) — no dedicated Tip skill yet             |
| Tabbed content switch                                     | `Tabs`, `Tab`, `TabList`, `TabPanel`                                                                                                                                        | [`gamut-accessibility`](../gamut-accessibility/SKILL.md#tabs-detail)                                             |
| On/off switch                                             | `Toggle`                                                                                                                                                                    | [`gamut-forms`](../gamut-forms/SKILL.md)                                                                         |
| Radio button / radio group                                | `Radio`, `RadioGroup`                                                                                                                                                       | [`gamut-forms`](../gamut-forms/SKILL.md#radio-and-radiogroup)                                                    |
| Checkbox                                                  | `Checkbox`                                                                                                                                                                  | [`gamut-forms`](../gamut-forms/SKILL.md)                                                                         |
| Expand/collapse section, accordion-style item list        | `Disclosure`; a _list_ of them → `List`'s expandable-row pattern, not repeated `Disclosure`                                                                                 | [`gamut-list`](../gamut-list/SKILL.md)                                                                           |
| Side panel / drawer                                       | `Drawer`, `Flyout`                                                                                                                                                          | [`gamut-accessibility`](../gamut-accessibility/SKILL.md) — no dedicated skill yet                                |
| Avatar / user image                                       | check `packages/gamut/src` — search before assuming absence                                                                                                                 | Storybook — no dedicated skill yet                                                                               |
| Badge / status pill / tag / chip                          | `Badge`, `Tag`                                                                                                                                                              | Storybook — no dedicated skill yet                                                                               |
| Page-through control                                      | `Pagination`                                                                                                                                                                | [`gamut-accessibility`](../gamut-accessibility/SKILL.md)                                                         |
| Toast / snackbar notification                             | `Toast`, `Toaster`                                                                                                                                                          | [`gamut-accessibility`](../gamut-accessibility/SKILL.md)                                                         |
| Date input / calendar picker                              | `DatePicker`, `DatePickerInput`                                                                                                                                             | [`gamut-accessibility`](../gamut-accessibility/SKILL.md)                                                         |
| Progress bar / radial/circular progress                   | `ProgressBar`, `RadialProgress`                                                                                                                                             | Storybook — no dedicated skill yet                                                                               |
| Loading state / skeleton placeholder                      | `Loading`, `FeatureShimmer`                                                                                                                                                 | Storybook — no dedicated skill yet                                                                               |
| Bulk-comparison table                                     | `DataTable` for pure comparison; `DataList` if rows also need selection or expansion                                                                                        | [`gamut-datatable`](../gamut-datatable/SKILL.md) · [`gamut-datalist`](../gamut-datalist/SKILL.md)                |
| Item list with expand/select                              | `DataList` for data-driven lists (query, selection, expansion together); `List` (`ListRow`'s `expanded`/`renderExpanded`) for a small, static set of custom expandable rows | [`gamut-datalist`](../gamut-datalist/SKILL.md) · [`gamut-list`](../gamut-list/SKILL.md)                          |
| Fully custom repeating rows/columns                       | `List`, `ListRow`, `ListCol`, `TableHeader`                                                                                                                                 | [`gamut-list`](../gamut-list/SKILL.md)                                                                           |
| Alert / inline banner message                             | `Alert`                                                                                                                                                                     | [`gamut-accessibility`](../gamut-accessibility/SKILL.md)                                                         |
| Breadcrumb trail                                          | `Breadcrumbs`                                                                                                                                                               | Storybook — no dedicated skill yet                                                                               |
| Card surface / clickable card                             | `Card`                                                                                                                                                                      | Storybook — no dedicated skill yet                                                                               |
| Button (any kind)                                         | `FillButton`, `StrokeButton`, `TextButton`, `CTAButton`, `IconButton`                                                                                                       | [`gamut-buttons`](../gamut-buttons/SKILL.md)                                                                     |
| Page/section backdrop scrim, generic dismissable overlay  | `Overlay`, `FocusTrap`, `BodyPortal`                                                                                                                                        | [`gamut-modal`](../gamut-modal/SKILL.md) (usage pattern) · [`gamut-z-index`](../gamut-z-index/SKILL.md)          |
| Grid/flex layout, responsive spacing                      | `Box`, `FlexBox`, `GridBox`, `LayoutGrid`                                                                                                                                   | [`gamut-layout`](../gamut-layout/SKILL.md) · [`gamut-system-props`](../gamut-system-props/SKILL.md)              |
| Coach mark / onboarding callout                           | `Coachmark`                                                                                                                                                                 | Storybook — no dedicated skill yet                                                                               |
| Video embed/player                                        | `Video`                                                                                                                                                                     | Storybook — no dedicated skill yet                                                                               |
| Chart / bar chart                                         | `BarChart`                                                                                                                                                                  | Storybook — no dedicated skill yet                                                                               |
| Skip-navigation link                                      | `SkipToContent`                                                                                                                                                             | [`gamut-accessibility`](../gamut-accessibility/SKILL.md)                                                         |

---

## Full component index

Every top-level directory in `packages/gamut/src` — check here before concluding "Gamut doesn't have this":

`Alert` · `Anchor` · `Animation` · `Badge` · `BarChart` · `Breadcrumbs` · `Button`/`ButtonBase` · `Card` · `Coachmark` · `ConnectedForm` · `ContentContainer` · `DataList` (includes `DataTable`) · `DatePicker` · `Disclosure` · `Drawer` · `FeatureShimmer` · `Flyout` · `Form` · `GridForm` · `Layout` · `List` · `Loading` · `Markdown` · `Menu` · `Modals` (`Modal`, `Dialog`) · `Overlay` · `Pagination` · `PatternBackdrop` · `Popover`/`PopoverContainer` · `ProgressBar` · `RadialProgress` · `SkipToContent` · `Tabs` · `Tag` · `Tip` (`ToolTip`, `PreviewTip`, `InfoTip`) · `Toast`/`Toaster` · `Toggle` · `Typography` (`Text`, `Anchor`) · `Video`.

If the need still isn't covered by any of these, it's a genuine gap — proceed with a custom implementation.

---

## Signals you're about to reinvent something

Treat any of these as a prompt to stop and check the table above, even mid-implementation:

- Writing `position: fixed` or `position: absolute` plus your own show/hide state, for anything that isn't pure decoration.
- Setting `role="dialog"`, `role="menu"`, `role="tooltip"`, `role="listbox"`, or `role="alert"` by hand.
- Implementing your own Escape-key or outside-click dismiss handler.
- Implementing your own focus trap, or manually saving/restoring a "previously focused element" ref.
- A new SCSS/CSS module for something that is primarily layout, color, or a standard interactive control (see [`gamut-review`](../gamut-review/SKILL.md) Check 3b).
- Copy-pasting an existing custom component from one app/page into another "for now" — that's a sign it should be a shared Gamut component, not that copying is fine.

---

## When custom actually is fine

- The need is genuinely product-specific with no reasonable Gamut analog (e.g. a bespoke data visualization unique to one feature).
- You're composing existing Gamut primitives (`Box` + system props + `css()`/`variant()`/`states()`) — this is the intended escape hatch, not "bespoke."
- A deliberate, documented design decision to diverge from the library for this one surface (rare — confirm with design/DESIGN.md first).
