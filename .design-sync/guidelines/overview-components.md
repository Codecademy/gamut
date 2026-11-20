# Component Usage — General Rules

Rules that apply to all Gamut components. Component-specific rules live in `components/*.md` and must be read before using that component.

## Core rules

- **Always use existing Gamut components** from `window.CodecademyGamut` rather than constructing one-off equivalents. See the Quick Reference table below for components by UI pattern.
- **Apply exact sizing, variant, and other props from the source (design or prompt).** Never rely on component defaults when the source specifies a value (e.g., `size="small"` on `Input`, `sizeVariant="small"` on `Select`). Cross-check all instances of the same component for consistency.
- **When unsure about a component's API**, read its `.d.ts` and `.prompt.md` in `components/<group>/<Name>/` (see the project README's "Where the truth lives" / Agent Information section).

## Forms vs. standalone inputs (critical breadcrumb)

**Functional forms** — UIs with a discrete submit/save action bundling multiple field values, validation, error states, or dirty tracking — **must** use `GridForm` or `ConnectedForm` from `@codecademy/gamut`. Never compose functional forms from bare atoms. Before building any functional form, read `components/forms.md`.

**Standalone non-submitted inputs** — live search filters, real-time filter panels, single-field controls that update UI state immediately on change — **should** use the bare atoms (`Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`) directly. No organism is needed when there is no submit step.

**The test:** if the user clicks a button to submit/save bundled field values → organism. If the input drives state in real time with no submit step → atom.

## Component Discovery

Before writing custom markup for any UI pattern, inspect available Gamut components first:

1. **Enumerate exports.** Check `window.CodecademyGamut` (or the root `README.md`'s component index) before building any UI element.
2. **Prefer Gamut over raw HTML or hand-built layout.** If a Gamut component serves the purpose (e.g., `Menu` for navigation, `DataTable`/`DataList` for tabular or item data, `Tabs` for tab navigation, `List` for repeating rows, `Toggle` for on/off controls), use it — never recreate one from `Box`/`FlexBox`/`<ul>`/`<div>` and manual state. See `components/list.md`, `components/data-table.md`, `components/data-list.md`, `components/menu.md` for the purpose-built components most often reinvented from boxes. This isn't limited to big organisms: `Badge`/`Tag` are just as often reinvented on a small scale. **A styled `Box`/`FlexBox` whose only content is a short label, count, status, or chip _is_ a reinvention of `Tag`/`Badge`** — check those first, before styling anything.

   **Use `Menu` for navigation and action lists — do not hand-build them.** Sidebar/section navigation, account menus, kebab/overflow actions, and any repeated list of links or actions should be composed with `Menu`, not rebuilt from `Box`/`FlexBox` rows with `as="a"`/`as="button"`. A hand-built version loses `Menu`'s keyboard navigation, focus management, active/selected state, and ARIA roles. If a design shows a vertical nav rail or an actions dropdown, that is a `Menu`.

3. **Read the component's type definitions** (`.d.ts` in its `components/<group>/<Name>/` folder) for props (e.g., `icon`, `variant`, `href`, `onClick` on `MenuItem`) before falling back to custom wrappers.
4. **Never build custom media players** — Gamut exports `Video`. See `components/video.md`.
5. **When no Gamut component exists, the comment is required, not optional.** Any custom markup without `{/* No Gamut component available for [pattern] — using custom markup */}` is incomplete — this is a checkpoint to pass before shipping, not an after-the-fact footnote.

### Gamut Component Quick Reference

| UI Pattern                                                                      | Gamut Component(s)                                                                                                                                            |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buttons (action triggers)                                                       | `FillButton`, `StrokeButton`, `TextButton`, `IconButton` (details: `components/buttons.md`)                                                                   |
| Links / hyperlinks                                                              | `Anchor`                                                                                                                                                      |
| Typography / text rendering                                                     | `Text`                                                                                                                                                        |
| Markdown rendering                                                              | `Markdown`                                                                                                                                                    |
| Layout primitives, breakpoints, page grid                                       | `Box`, `FlexBox`, `GridBox`, `LayoutGrid` (details: `components/layout.md`)                                                                                   |
| Animations / transitions / motion                                               | Animation primitives — `Rotation`, `ExpandInCollapseOut`, `FadeInSlideOut` (details: `components/animations.md`)                                              |
| Page content containers                                                         | `ContentContainer`                                                                                                                                            |
| Navigation / menus — sidebar/section nav, account menus, kebab/overflow actions | `Menu`, `MenuItem`, `MenuSeparator` — never hand-built from `Box`/`FlexBox` rows (details: `components/menu.md`)                                              |
| Breadcrumbs                                                                     | `Breadcrumbs`                                                                                                                                                 |
| Pagination                                                                      | `Pagination`                                                                                                                                                  |
| Tabs                                                                            | `Tabs` — composite, not a `tabs` prop (details: `components/tabs.md`)                                                                                         |
| Accordions                                                                      | `Disclosure`                                                                                                                                                  |
| Data tables / item-focused lists                                                | `DataTable` (details: `components/data-table.md`), `DataList` (details: `components/data-list.md`)                                                            |
| Fully custom repeating rows                                                     | `List`, `ListRow`, `ListCol` (details: `components/list.md`)                                                                                                  |
| Cards                                                                           | `Card`                                                                                                                                                        |
| Bar charts / data visualization                                                 | `BarChart`                                                                                                                                                    |
| Modals / dialogs                                                                | `Dialog` for binary-choice prompts (Confirm/Cancel, image and/or description only); `Modal` for everything else (multi-view, complex content, custom layouts) |
| Drawers                                                                         | `Drawer`                                                                                                                                                      |
| Flyout panels                                                                   | `Flyout`                                                                                                                                                      |
| Modal overlays / scrims                                                         | `Overlay`                                                                                                                                                     |
| Focus trapping (modals, dialogs, drawers, any focus-confined region)            | `FocusTrap`                                                                                                                                                   |
| Popovers                                                                        | `Popover`, `PopoverContainer`                                                                                                                                 |
| DOM portals / z-index escapes                                                   | `BodyPortal` (usually consumed internally via `Popover`, `Toaster`, `PopoverContainer` — use directly only for z-index troubleshooting)                       |
| Tooltips                                                                        | `ToolTip`, `InfoTip`, `PreviewTip` (details: `components/tooltips.md`)                                                                                        |
| Onboarding / feature highlights                                                 | `Coachmark` (details: `components/coachmark.md`)                                                                                                              |
| Alerts                                                                          | `Alert` (details: `components/alert.md` — note the variant prop is `type`, not `variant`)                                                                     |
| Toast notifications                                                             | `Toast`, `Toaster`                                                                                                                                            |
| Badges / Tags                                                                   | `Badge` for status (details: `components/badge.md`), `Tag` for categorization (details: `components/tag.md`)                                                  |
| Progress                                                                        | `ProgressBar`, `RadialProgress`                                                                                                                               |
| Loading states                                                                  | `Shimmer`, `Spinner`                                                                                                                                          |
| Media / video                                                                   | `Video`                                                                                                                                                       |
| Forms                                                                           | `GridForm`, `ConnectedForm`                                                                                                                                   |
| Standalone inputs (filters, live search, single controls with no submit step)   | `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup` (see Forms breadcrumb above)                                                                  |
| Searchable select / rich dropdown                                               | `SelectDropdown`                                                                                                                                              |
| Date input / selection                                                          | `DatePicker`                                                                                                                                                  |
| Toggle switches (standalone)                                                    | `Toggle`                                                                                                                                                      |
| Screen-reader-only text                                                         | `HiddenText`                                                                                                                                                  |
| Skip-to-content accessibility links                                             | `SkipToContent`                                                                                                                                               |
| Dark / light regions                                                            | `ColorMode`, `Background` (rules: `overview-color-modes.md`; details: `components/color-mode.md`)                                                             |

## Validate variant/color props against type definitions

Components like `Card`, `Badge`, `Tag`, and `Alert` accept specific `variant` values that map to internal color tokens via `polished`'s parser. An invalid variant string (e.g., `"navy-on-white"` instead of `"white"`) causes a runtime crash in `parseToHsl()`.

- **Always inspect component prop types** (the `.d.ts` in that component's `components/<group>/<Name>/` folder) before using variant/color props. Never guess or invent compound variant names.

For `Card`-specific valid variants and defaults, see `components/card.md`.
