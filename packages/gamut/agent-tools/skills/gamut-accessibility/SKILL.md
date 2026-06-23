---
name: gamut-accessibility
description: Use this skill when implementing accessibility for a specific Gamut component, building a custom overlay or composite widget, or auditing component usage against WCAG — complements the always-loaded `accessibility.mdc` with Gamut component-specific patterns. Form wiring lives in `gamut-forms`.
---

# Gamut Accessibility

Source: `@codecademy/gamut` — `react-aria-components` is used only in [`packages/gamut/src/Tabs/`](../../../src/Tabs/) (`Tabs.tsx`, `TabList.tsx`, `Tab.tsx`, `TabPanel.tsx`). `react-focus-on` powers `FocusTrap` ([`packages/gamut/src/FocusTrap/index.tsx`](../../../src/FocusTrap/index.tsx)), used by overlays such as `Overlay` ([`packages/gamut/src/Overlay/index.tsx`](../../../src/Overlay/index.tsx)) and `Popover`. Other widgets (e.g. `Menu`, `DatePicker`) implement keyboard and ARIA in Gamut code.

Product-oriented button variants and props: [`gamut-buttons`](../gamut-buttons/SKILL.md)

---

## Universal rules

Prefer native HTML, minimal ARIA, correct roles, visible names, focus visibility, semantic color / `ColorMode`, and Gamut primitives — see the always-loaded Gamut Accessibility Rules: [`accessibility.mdc`](../../rules/accessibility.mdc). This skill adds Gamut component behavior and audit detail below.

---

## How Gamut handles accessibility

Tabs use `react-aria-components` (see `packages/gamut/src/Tabs/*.tsx`) for roving tabindex and keyboard navigation. Overlays (e.g. `Overlay`, `Popover`) use `FocusTrap` → `react-focus-on` for focus containment and Escape/outside close. Other interactive components (`Menu`, `DatePicker`, `Modal`, `Dialog`, etc.) rely on in-repo implementations — supply accessible names, wire labels to controls, and avoid duplicating what a component already sets (`aria-live`, `aria-describedby`, tabindex, etc.); confirm in source when auditing.

---

## Component reference (index)

There is no exported `<Button>` — use `FillButton`, `TextButton`, `StrokeButton`, `CTAButton`, and `IconButton` (shared `ButtonProps` type). Prefer these over `<div onClick>` or `<span role="button">`.

Forms — `FormGroup`, `ConnectedForm` / `ConnectedFormGroup`, `GridForm`, field atoms (`Select`, `Checkbox`, `Radio`), validation, `aria-live` / `aria-describedby`: canonical reference is [`gamut-forms`](../gamut-forms/SKILL.md).

| Component(s)                                            | Handled in library                                                                                                       | App / author responsibilities                                                                                                                                                                                                                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FillButton`, `TextButton`, `StrokeButton`, `CTAButton` | Render `<button>` (or `<a>` when `href` is set); native click + keyboard activation                                      | Visible text or `href` purpose; follow [`gamut-buttons`](../gamut-buttons/SKILL.md) for variants and `disabled` vs `aria-disabled`.                                                                                                                                                        |
| `IconButton`                                            | `tip` feeds the accessible name for icon-only controls                                                                   | Always pass `tip` when the button has no visible text.                                                                                                                                                                                                                                     |
| `Dialog`                                                | `Overlay` (shroud, Escape, focus), `role="dialog"`, `aria-modal`, close control with configurable `closeButtonProps.tip` | Provide a clear `title` (and meaningful body copy). Confirm naming with [Molecules / Modals / Dialog](https://gamut.codecademy.com/?path=/docs-molecules-modals-dialog--docs).                                                                                                             |
| `Modal`                                                 | Same overlay/focus stack; optional `aria-label`; multi-`views` support                                                   | `title` / view titles; pass `aria-label` when there is no visible title string. [Molecules / Modals / Modal](https://gamut.codecademy.com/?path=/docs-molecules-modals-modal--docs).                                                                                                       |
| `Alert`                                                 | Default `aria-live="polite"`, `role="status"`                                                                            | Use `aria-live="assertive"` only for urgent interruptions; do not nest inside another live region.                                                                                                                                                                                         |
| `Tabs`, `Tab`, `TabList`, `TabPanel`                    | `react-aria-components` in `packages/gamut/src/Tabs/` — roving tabindex, arrows, Home/End                                | Name each tab; Tab moves into the active panel per APG.                                                                                                                                                                                                                                    |
| Forms                                                   | See Forms above                                                                                                          | [`gamut-forms`](../gamut-forms/SKILL.md)                                                                                                                                                                                                                                                   |
| `DatePicker` + `DatePickerInput`                        | Segmented input + calendar behavior inside `FormGroup`                                                                   | Provide `label` / `name` / `form` as for any input; keep `DatePickerInput` inside `DatePicker`. When embedded in `FormGroup` / `GridForm`, follow [`gamut-forms`](../gamut-forms/SKILL.md). [Organisms / DatePicker](https://gamut.codecademy.com/?path=/docs-organisms-datepicker--docs). |
| `Menu`, `MenuItem`, `MenuSeparator`                     | List + `MenuProvider` (keyboard / roles depend on variant)                                                               | Label `Menu` / menubar per pattern; follow Storybook [Molecules / Menu](https://gamut.codecademy.com/?path=/docs-molecules-menu--docs).                                                                                                                                                    |
| `Popover`                                               | `FocusTrap` when open (unless `skipFocusTrap`), positioning                                                              | `onRequestClose`, meaningful `role` when needed; do not trap focus unnecessarily when `skipFocusTrap`.                                                                                                                                                                                     |
| `Flyout`                                                | `Overlay`, `Drawer`, visible `title`, close `IconButton` with `tip={closeLabel}`                                         | Pass `title` and `closeLabel`; name panel content.                                                                                                                                                                                                                                         |
| `Drawer`                                                | Focuses container when `expanded`, `tabIndex={-1}` on shell                                                              | Drawer is a surface, not a full dialog — supply headings/labels inside for screen readers.                                                                                                                                                                                                 |
| `Disclosure`                                            | `DisclosureButton` drives expand/collapse                                                                                | Provide `heading` / structure so the control’s purpose is clear.                                                                                                                                                                                                                           |
| `Toggle`                                                | `ToggleLabel` + `htmlFor` wired to control `id`                                                                          | With no visible `label`, pass `ariaLabel` (or use `as="button"` pattern per props).                                                                                                                                                                                                        |
| `ToolTip`                                               | Floating mode renders a screen-reader `role="tooltip"` branch with `id`                                                  | Pass the same `id` to the trigger’s `aria-describedby` when you rely on the tooltip as supplementary description (see component `id` JSDoc).                                                                                                                                               |
| `InfoTip`                                               | —                                                                                                                        | `ariaLabel` or `ariaLabelledby` (camelCase) — no automatic fallback.                                                                                                                                                                                                                       |
| `PreviewTip`                                            | `Anchor`-based preview, focus-driven content                                                                             | `linkDescription` and visible anchor text; do not use the preview as the sole name for an unrelated control.                                                                                                                                                                               |
| `SkipToContent`                                         | Skip link behavior                                                                                                       | Place early in the tab order; `href` target `id` must exist on main content.                                                                                                                                                                                                               |
| `Toast` + `Toaster`                                     | `Toaster` wraps the stack in `aria-live="polite"`                                                                        | Keep messages concise; avoid stacking many simultaneous assertive announcements.                                                                                                                                                                                                           |
| `Pagination`                                            | Page / control buttons                                                                                                   | Ensure current page and actions are perceivable (labels / `aria-current` patterns per Storybook). [Molecules / Pagination](https://gamut.codecademy.com/?path=/docs-molecules-pagination--docs).                                                                                           |
| `FocusTrap`                                             | Escape, outside click, `allowPageInteraction`                                                                            | Return focus to trigger on close for custom overlays.                                                                                                                                                                                                                                      |

```tsx
// correct
<IconButton icon={DeleteIcon} tip="Delete item" onClick={handleDelete} />

// wrong — no accessible name, no keyboard semantics
<div onClick={handleDelete}><DeleteIcon /></div>
```

### Dialog / Modal (detail)

Both use `Overlay` and `FocusTrap` (`react-focus-on`) patterns: focus moves into the surface, Escape closes (when enabled), focus should return to the trigger on close.

Prefer a visible title so the dialog has a clear name; on `Modal`, pass `aria-label` when there is no suitable visible title string. Close control: `IconButton` with `closeButtonProps.tip` (defaults documented in source).

```tsx
<Dialog
  title="Confirm deletion"
  confirmCta={{ children: 'Delete', onClick: handleDelete }}
  onRequestClose={handleClose}
  isOpen={open}
/>
```

### Alert (detail)

Renders with `aria-live="polite"` and `role="status"` by default. Override with `aria-live="assertive"` only for time-sensitive errors requiring immediate interruption. Do not nest `<Alert>` inside another live region.

### Tabs (detail)

Built on `react-aria-components`. Follows the [ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): arrow keys navigate tabs, Tab moves focus into the active panel, Home/End jump to first/last tab. The tablist is a composite — only the active tab is in the tab sequence (roving tabindex). No manual `aria-selected` or keyboard handling needed.

### InfoTip (example)

`<InfoTip>` needs `ariaLabel` or `ariaLabelledby` — see also the always-loaded rules.

```tsx
<InfoTip ariaLabel="More information about billing" />
```

### ToolTip (detail)

When `placement="floating"`, the component renders a screen-reader-only branch with `role="tooltip"` and an optional `id`. Pass the same `id` to the described element’s `aria-describedby` so assistive tech associates the tooltip copy with the trigger. Inline placement uses the wrapper differently — see [Molecules / Tips / ToolTip](https://gamut.codecademy.com/?path=/docs-molecules-tips-tooltip--docs).

### SkipToContent (detail)

Include `<SkipToContent>` as the first focusable element in the page shell. The main content region must expose a matching `id` for the skip target.

---

## Focus management

`<FocusTrap>` is for custom overlay patterns not covered by `Dialog` / `Modal`.

Key props:

- `active` — enable/disable the trap dynamically
- `onEscapeKey` — close handler
- `onClickOutside` — dismiss on outside click
- `allowPageInteraction` — permit scrolling outside the trap without closing

Always return focus to the trigger on close. `react-focus-on` (via `FocusTrap`) and overlay flows handle much of this for dialogs/popovers; `Tabs` inherit focus behavior from `react-aria-components`. Custom surfaces must store a ref to the trigger and call `.focus()` on close when the library does not.

---

## Composite widgets and managed focus

ARIA composite roles (`listbox`, `menu`, `tree`, `grid`, `tablist`) use managed focus: only one element in the composite is in the tab sequence at a time. Tab moves focus to the next element outside the composite; arrow keys move focus within it.

Implementation pattern — roving tabindex:

- Set `tabIndex={0}` on the currently active item
- Set `tabIndex={-1}` on all other items
- On arrow key, update which item holds `tabIndex={0}` and call `.focus()` on it

`Tabs` (`react-aria-components`) implement roving tabindex for the tablist pattern. `Menu` and other composites implement focus in Gamut — if you build a custom composite, implement roving tabindex yourself. A flat `tabIndex={0}` on every item is wrong — it puts every item in the sequential tab order.

---

## Device-independent events

Use `click` for activation, not `mousedown`. `click` follows pointer activation; native `<button>` (and similar controls) also fire `click` from keyboard (Space and Enter). A focused `<a href>` is usually activated with Enter, which fires `click` — Space often scrolls the page instead of activating the link. `mousedown` does not represent keyboard activation, so relying on it alone breaks keyboard-only use.

For custom elements with `role="button"`, do not assume the browser will synthesize `click` from the keyboard the way it does for native interactive elements (`<button>`, `<a href>`, and other built-ins). Handle `keydown` for Space and Enter explicitly:

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    handleActivation();
  }
};
```

Prefer Gamut `*Button` components (or `Anchor` with a real `href`) so you do not reimplement this.

---

## Live regions

| Scenario                                   | Pattern                                     |
| ------------------------------------------ | ------------------------------------------- |
| Status updates, non-critical notifications | `aria-live="polite"`                        |
| Urgent global interruptions                | `aria-live="assertive"` (use sparingly)     |
| Frequently updating counts or progress     | `aria-live="polite"` + `aria-atomic="true"` |

Form-bound `aria-live` and `FormError` patterns: see Forms above (do not assume assertive on every field error).

Inject live regions into the DOM before they need to announce. A region added simultaneously with its first announcement may be ignored by some assistive technologies.

Do not elevate unrelated inline errors to `assertive` — reserve assertive for urgent interruptions the user did not directly trigger.

---

## ARIA authoring rules

- No redundant roles: don't set `role="button"` on `<button>` or `role="heading"` on `<h2>`
- `aria-hidden` cascades: placing `aria-hidden="true"` on a parent removes the entire subtree from the accessibility tree, including focusable descendants — never put it on an ancestor of a focusable element
- `role="presentation"` and `aria-hidden` on focusable elements: both are prohibited on elements that can receive focus — they remove semantics while leaving the element keyboard-reachable, producing an operable but unnamed control
- Labelling vs describing: `aria-label` / `aria-labelledby` name the control. `aria-describedby` provides supplementary context. Both can coexist on the same element
- Required fields: use `aria-required="true"` or the HTML `required` attribute. Visual asterisks must have an explanatory text string visible on the page; the asterisk glyph itself should carry `aria-hidden="true"` — `<FormGroupLabel>` already handles this
- `display:none` vs `aria-hidden`: elements with `display:none` are already removed from the accessibility tree; adding `aria-hidden` is redundant. Use `aria-hidden="true"` only when an element is visually present but should be hidden from assistive technology

---

## Color and contrast (non-text)

Semantic tokens, `ColorMode`, and `<Background>` are covered in the always-loaded `accessibility.mdc` rule and the `gamut-color-mode` skill. Here: non-text contrast (focus rings, input borders, icon affordances) should meet ~3:1 vs adjacent colors where WCAG 1.4.11 applies — validate in your layout.

---

## Testing checklist

- [ ] Full keyboard navigation: every interactive element reachable and operable without a mouse
- [ ] Focus is always visible and never lost or unexpectedly trapped
- [ ] Dialogs trap focus correctly; Escape closes; focus returns to the trigger
- [ ] Composite widgets (tabs, menus, listboxes) use arrow keys internally, not Tab
- [ ] All form inputs have programmatically associated labels (not placeholder-only)
- [ ] Form errors surface through the library’s `FormError` / live-region patterns (Forms above)
- [ ] Icon-only controls have accessible names
- [ ] No content relies solely on color to convey meaning
- [ ] Screen reader matrix: VoiceOver + Safari (iOS), VoiceOver + Chrome (macOS), NVDA + Chrome (Windows)
- [ ] 200% zoom: layout intact, no content overflow or disappearance

---

## Common anti-patterns

| Anti-pattern                                             | Fix                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `<div onClick={…}>` for actions                          | `FillButton`, `TextButton`, `StrokeButton`, `CTAButton`, or `IconButton` (with `tip`) |
| `placeholder` as the only label                          | `FormGroupLabel` with matching `htmlFor` / `id`                                       |
| `aria-label` on a `<div>` with no role                   | Add a meaningful `role` or use a semantic element                                     |
| `role="button"` without Space/Enter handlers             | Use a Gamut `*Button`, `Anchor` with `href`, or add `keydown`                         |
| `tabIndex={0}` on every item in a composite              | Roving tabindex: `0` on active item, `-1` on rest                                     |
| Tooltip as the only accessible name for a control        | Set `aria-label` (or visible text) on the control as well                             |
| `aria-hidden="true"` on a focusable element              | Also remove from tab order (`tabIndex={-1}`) or restructure                           |
| `mousedown` for activation                               | Use `click`                                                                           |
| `outline: none` without a replacement                    | Use Gamut’s built-in focus styles                                                     |
| Multiple `aria-live` regions for the same content stream | One region per logical stream; reuse it across updates                                |
