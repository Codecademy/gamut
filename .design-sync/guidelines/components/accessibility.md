# Accessibility — component reference

What each Gamut component handles for you vs. what you must still supply.

## Component reference

There is no exported `Button` — use `FillButton`, `TextButton`, `StrokeButton`, `CTAButton`, and `IconButton`. Prefer these over `<div onClick>` or `<span role="button">`.

| Component(s)                                            | Handled by the component                                                             | You must supply                                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `FillButton`, `TextButton`, `StrokeButton`, `CTAButton` | Renders `<button>` (or `<a>` when `href` is set); native click + keyboard activation | Visible text or `href` purpose; see `components/buttons.md` for variant selection and `disabled` vs `aria-disabled`. |
| `IconButton`                                            | `tip` feeds the accessible name for icon-only controls                               | Always pass `tip` when the button has no visible text.                                                               |
| `Dialog`                                                | Overlay (shroud, Escape, focus), `role="dialog"`, `aria-modal`, close control        | A clear `title` (and meaningful body copy).                                                                          |
| `Modal`                                                 | Same overlay/focus stack; optional `aria-label`; multi-`views` support               | `title` / view titles; pass `aria-label` when there is no visible title string.                                      |
| `Alert`                                                 | Default `aria-live="polite"`, `role="status"`                                        | Use `aria-live="assertive"` only for urgent interruptions; do not nest inside another live region.                   |
| `Tabs`, `Tab`, `TabList`, `TabPanel`                    | Roving tabindex, arrow keys, Home/End                                                | Name each tab; Tab moves into the active panel per the ARIA Tabs pattern.                                            |
| Forms                                                   | See `components/forms.md`                                                            | —                                                                                                                    |
| `DatePicker` + `DatePickerInput`                        | Segmented input + calendar behavior inside `FormGroup`                               | Provide `label` / `name` / `form` as for any input; keep `DatePickerInput` inside `DatePicker`.                      |
| `Menu`, `MenuItem`, `MenuSeparator`                     | List + keyboard/role wiring depending on `variant`                                   | Label `Menu` / menubar per pattern; see `components/menu.md`.                                                        |
| `Popover`                                               | Focus trap when open (unless `skipFocusTrap`), positioning                           | `onRequestClose`, meaningful `role` when needed; do not trap focus unnecessarily when `skipFocusTrap`.               |
| `Flyout`                                                | Overlay, Drawer, visible `title`, close `IconButton` with `tip={closeLabel}`         | Pass `title` and `closeLabel`; name panel content.                                                                   |
| `Drawer`                                                | Focuses container when `expanded`, `tabIndex={-1}` on shell                          | Drawer is a surface, not a full dialog — supply headings/labels inside for screen readers.                           |
| `Disclosure`                                            | Drives expand/collapse                                                               | Provide `heading` / structure so the control's purpose is clear.                                                     |
| `Toggle`                                                | Label wired via `htmlFor` to the control's `id`                                      | With no visible label, pass `ariaLabel`.                                                                             |
| `ToolTip`                                               | Floating mode renders a screen-reader `role="tooltip"` branch with `id`              | Pass the same `id` to the trigger's `aria-describedby` when relying on the tooltip as supplementary description.     |
| `InfoTip`                                               | —                                                                                    | `ariaLabel` or `ariaLabelledby` — no automatic fallback.                                                             |
| `PreviewTip`                                            | Anchor-based preview, focus-driven content                                           | `linkDescription` and visible anchor text; do not use the preview as the sole name for an unrelated control.         |
| `SkipToContent`                                         | Skip link behavior                                                                   | Place early in the tab order; `href` target `id` must exist on main content.                                         |
| `Toast` + `Toaster`                                     | `Toaster` wraps the stack in `aria-live="polite"`                                    | Keep messages concise; avoid stacking many simultaneous assertive announcements.                                     |
| `Pagination`                                            | Page / control buttons                                                               | Ensure current page and actions are perceivable (labels / `aria-current` patterns).                                  |
| `FocusTrap`                                             | Escape, outside click, `allowPageInteraction`                                        | Return focus to trigger on close for custom overlays.                                                                |

```jsx
// correct
<IconButton icon={DeleteIcon} tip="Delete item" onClick={handleDelete} />

// wrong — no accessible name, no keyboard semantics
<div onClick={handleDelete}><DeleteIcon /></div>
```

## Dialog / Modal (detail)

Both trap focus, move focus into the surface on open, close on Escape (when enabled), and return focus to the trigger on close. Prefer a visible title; on `Modal`, pass `aria-label` when there's no suitable visible title string.

## Alert (detail)

Renders with `aria-live="polite"` and `role="status"` by default. Override with `aria-live="assertive"` only for time-sensitive errors requiring immediate interruption. Do not nest `Alert` inside another live region.

## Tabs (detail)

Follows the ARIA Tabs pattern: arrow keys navigate tabs, Tab moves focus into the active panel, Home/End jump to first/last tab. The tablist is a composite — only the active tab is in the tab sequence (roving tabindex). No manual `aria-selected` or keyboard handling needed.

## Focus management

`FocusTrap` is for custom overlay patterns not covered by `Dialog` / `Modal`. Key props: `active` (enable/disable dynamically), `onEscapeKey`, `onClickOutside`, `allowPageInteraction`. Always return focus to the trigger on close — custom surfaces must store a ref to the trigger and call `.focus()` on close when the library doesn't do it for you.

## Composite widgets and managed focus

ARIA composite roles (`listbox`, `menu`, `tree`, `grid`, `tablist`) use managed focus: only one element in the composite is in the tab sequence at a time. Tab moves focus to the next element outside the composite; arrow keys move focus within it.

Roving tabindex pattern: `tabIndex={0}` on the currently active item, `tabIndex={-1}` on all others; on arrow key, update which item holds `tabIndex={0}` and call `.focus()` on it. A flat `tabIndex={0}` on every item is wrong — it puts every item in the sequential tab order.

## Device-independent events

Use `click` for activation, not `mousedown`. `click` follows pointer activation; native `<button>` also fires `click` from keyboard (Space and Enter). For custom elements with `role="button"`, handle `keydown` explicitly:

```jsx
const handleKeyDown = (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    handleActivation();
  }
};
```

Prefer Gamut `*Button` components (or `Anchor` with a real `href`) so you don't reimplement this.

## Live regions

| Scenario                                   | Pattern                                     |
| ------------------------------------------ | ------------------------------------------- |
| Status updates, non-critical notifications | `aria-live="polite"`                        |
| Urgent global interruptions                | `aria-live="assertive"` (use sparingly)     |
| Frequently updating counts or progress     | `aria-live="polite"` + `aria-atomic="true"` |

Inject live regions into the DOM before they need to announce — a region added simultaneously with its first announcement may be ignored by some assistive technologies. Do not elevate unrelated inline errors to `assertive`.

## ARIA authoring rules

- No redundant roles: don't set `role="button"` on `<button>` or `role="heading"` on `<h2>`.
- `aria-hidden` cascades: placing it on a parent removes the entire subtree from the accessibility tree, including focusable descendants — never put it on an ancestor of a focusable element.
- `role="presentation"` and `aria-hidden` are both prohibited on focusable elements — they remove semantics while leaving the element keyboard-reachable, producing an operable but unnamed control.
- Labelling vs describing: `aria-label`/`aria-labelledby` name the control; `aria-describedby` provides supplementary context. Both can coexist.
- Required fields: use `aria-required="true"` or `required`. Visual asterisks need explanatory text visible on the page; the asterisk glyph itself should carry `aria-hidden="true"`.
- `display:none` elements are already removed from the accessibility tree; adding `aria-hidden` is redundant. Use `aria-hidden="true"` only when an element is visually present but should be hidden from assistive technology.

## Color and contrast (non-text)

Semantic tokens, `ColorMode`, and `Background` are covered in `overview-color-modes.md` and `components/color-mode.md`. Non-text contrast (focus rings, input borders, icon affordances) should meet ~3:1 against adjacent colors where WCAG 1.4.11 applies.

## Testing checklist

- [ ] Full keyboard navigation: every interactive element reachable and operable without a mouse
- [ ] Focus is always visible and never lost or unexpectedly trapped
- [ ] Dialogs trap focus correctly; Escape closes; focus returns to the trigger
- [ ] Composite widgets (tabs, menus, listboxes) use arrow keys internally, not Tab
- [ ] All form inputs have programmatically associated labels (not placeholder-only)
- [ ] Icon-only controls have accessible names
- [ ] No content relies solely on color to convey meaning

## Common anti-patterns

| Anti-pattern                                      | Fix                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `<div onClick={…}>` for actions                   | `FillButton`, `TextButton`, `StrokeButton`, `CTAButton`, or `IconButton` (with `tip`) |
| `placeholder` as the only label                   | A real label associated via `htmlFor`/`id`                                            |
| `aria-label` on a `<div>` with no role            | Add a meaningful `role` or use a semantic element                                     |
| `role="button"` without Space/Enter handlers      | Use a Gamut `*Button`, `Anchor` with `href`, or add `keydown`                         |
| `tabIndex={0}` on every item in a composite       | Roving tabindex: `0` on active item, `-1` on rest                                     |
| Tooltip as the only accessible name for a control | Set `aria-label` (or visible text) on the control as well                             |
| `aria-hidden="true"` on a focusable element       | Also remove from tab order (`tabIndex={-1}`) or restructure                           |
| `mousedown` for activation                        | Use `click`                                                                           |
| `outline: none` without a replacement             | Use Gamut's built-in focus styles                                                     |
| Multiple `aria-live` regions for the same stream  | One region per logical stream; reuse it across updates                                |
