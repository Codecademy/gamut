---
name: gamut-accessibility
description: Use this skill when implementing or auditing accessibility in Gamut UIs — interactive widgets, forms, focus and keyboard flows, live regions, ARIA, or contrast — including fixes for screen readers, WCAG issues, or Gamut + React Aria patterns.
---

# Gamut Accessibility

Source: `@codecademy/gamut` — interactive components wrap `react-aria-components`, `@react-aria/interactions`, and `react-focus-on`.

---

## General rules

Use ARIA sparingly and only when it's the best option available.

### Prefer HTML over ARIA

Unnecessary ARIA can cause harm. If a native HTML element or attribute with the semantics and behavior you need already exists, use it. Reach for ARIA only when native HTML is genuinely insufficient for the pattern.

### A Role is a Promise

ARIA roles modify the accessibility tree and _imply_ behavior. Always ensure that the implied keyboard behavior, focusability, and interactivity exists when a role is used.

### ARIA can both cloak and enhance

ARIA can augment native semantics (`aria-pressed` on a `<button>`) or override them entirely (`role="menuitem"` on an `<a>`). Both capabilities are powerful and dangerous. Override only when native HTML genuinely doesn't fit the pattern; when augmenting, don't contradict the native semantics.

### Align accessible names with visible copy

Prefer wiring names through visible text and native `<label>` / control text / `alt` over using `aria-label`. Point `aria-labelledby` at the visible heading or label that should define the name if it's not possible to name elements from their content. Use bare `aria-label` when there is no suitable visible label.

### Treat missing visible labels as a design smell

When there is no visible text for a nameable element, consider this a sign that the content design could be improved, but not a requirement that it is changed. This is not an accessibility violation.

```html
<!-- smell: this list has no conceptual name, so we have to create one using ARIA -->
<ul aria-label="List heading">
  <li>...</li>
</ul>

<!-- better: the list's name is visible and can be used for its accessible name -->
<h2 id="list-name">List heading</h2>
<ul aria-labelledby="list-name">
  <li>...</li>
</ul>
```

---

## How Gamut handles accessibility

Gamut wraps React Aria for most interactive widget primitives. Roving tabindex, keyboard event handling, and ARIA attribute management are implemented for you in `<Tabs>`, `<Dialog>`, `<Modal>`, and form components. The developer's responsibilities are: supply accessible names, wire labels to inputs, and avoid overriding what the library already provides.

---

## Component reference

### Button / IconButton

`<Button>` renders a semantic `<button>` — no `role` needed. For icon-only buttons use `<IconButton>` with a `tip` prop; `tip` becomes the button's `aria-label`. Do not use `<div onClick>` or `<a>` without `href` for actions.

```tsx
// correct
<IconButton icon={DeleteIcon} tip="Delete item" onClick={handleDelete} />

// wrong — no accessible name, no keyboard semantics
<div onClick={handleDelete}><DeleteIcon /></div>
```

### Dialog / Modal

Both use `<FocusTrap>` (`react-focus-on`) internally. Focus locks to the dialog on open and returns to the trigger on close. Escape closes the dialog automatically.

Always provide an accessible name. **Prefer `aria-labelledby`** when a visible heading or title defines the dialog name; use **`aria-label`** only when there is no suitable visible title string.

```tsx
<Dialog aria-labelledby="confirm-title">
  <h2 id="confirm-title">Confirm deletion</h2>
</Dialog>
```

### Alert

Renders with `aria-live="polite"` and `role="status"` by default. Override with `aria-live="assertive"` only for time-sensitive errors requiring immediate interruption. Do not nest `<Alert>` inside another live region.

### Tabs

Built on `react-aria-components`. Follows the [ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): arrow keys navigate tabs, Tab moves focus into the active panel, Home/End jump to first/last tab. The tablist is a composite — only the active tab is in the tab sequence (roving tabindex). No manual `aria-selected` or keyboard handling needed.

### Forms

`<FormGroup>` + `<FormGroupLabel>` + input element is the complete accessible pattern:

```tsx
<FormGroup
  htmlFor="email-input"
  description="Used for login"
  error={errors.email}
>
  <FormGroupLabel htmlFor="email-input">Email</FormGroupLabel>
  <Input id="email-input" type="email" />
</FormGroup>
```

- `htmlFor` on `<FormGroupLabel>` and `id` on the input must match
- `error` prop on `<FormGroup>` renders into an `aria-live="assertive"` region automatically
- `description` prop renders into an `aria-live="polite"` region automatically
- Do not add `aria-describedby` or `aria-errormessage` manually — `<FormGroup>` manages these

**Checkbox / Radio**: `htmlFor` is required; the input is visually hidden via `screenReaderOnly` from `@codecademy/gamut-styles` but remains in the accessibility tree.

### InfoTip

Unlike `<IconButton>`, `<InfoTip>` has no automatic label fallback. Always provide `ariaLabel` or `ariaLabelledby` (camelCase props).

```tsx
<InfoTip ariaLabel="More information about billing" />
```

### SkipToContent

Include `<SkipToContent>` as the first focusable element in the page shell. The main content region must have a matching `id` for the skip link to target.

### Text (screen-reader-only)

`<Text screenreader>` is the supported pattern for visually hidden but announced content. `<HiddenText>` is deprecated.

```tsx
<Text screenreader>Loading results…</Text>
```

---

## Focus management

`<FocusTrap>` is available for custom overlay patterns not covered by `<Dialog>` or `<Modal>`.

Key props:

- `active` — enable/disable the trap dynamically
- `onEscapeKey` — close handler
- `onClickOutside` — dismiss on outside click
- `allowPageInteraction` — permit scrolling outside the trap without closing

Always return focus to the trigger on close. React Aria components do this automatically; custom implementations must store a ref to the trigger and call `.focus()` on unmount.

---

## Composite widgets and managed focus

ARIA composite roles (`listbox`, `menu`, `tree`, `grid`, `tablist`) use **managed focus**: only one element in the composite is in the tab sequence at a time. Tab moves focus to the next element outside the composite; arrow keys move focus within it.

Implementation pattern — roving tabindex:

- Set `tabIndex={0}` on the currently active item
- Set `tabIndex={-1}` on all other items
- On arrow key, update which item holds `tabIndex={0}` and call `.focus()` on it

Gamut's `<Tabs>` implements this via React Aria. If you build a custom composite widget, you must implement roving tabindex manually. A flat `tabIndex={0}` on every item is wrong — it puts every item in the sequential tab order, which is not the composite pattern.

---

## Device-independent events

Use `click` for activation, not `mousedown`. `click` fires for both pointer and keyboard (Space/Enter on native buttons and links). `mousedown` is pointer-only and silently breaks keyboard access.

For custom elements with `role="button"`, `click` alone is not sufficient — it only fires on keyboard when the element is a native `<button>` or `<a href>`. You must also handle `keydown` for Space and Enter explicitly:

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    handleActivation();
  }
};
```

This is another reason to use `<Button>` — it handles this correctly and you don't.

---

## Live regions

| Scenario                                   | Pattern                                     |
| ------------------------------------------ | ------------------------------------------- |
| Status updates, non-critical notifications | `aria-live="polite"`                        |
| Form validation errors on submit           | `aria-live="assertive"`                     |
| Frequently updating counts or progress     | `aria-live="polite"` + `aria-atomic="true"` |

Inject live regions into the DOM before they need to announce. A region added simultaneously with its first announcement may be ignored by some assistive technologies.

`<FormGroup>` already uses `aria-live="assertive"` for the `error` prop. Don't elevate unrelated inline errors to assertive — reserve it for interruptions the user didn't directly trigger.

---

## ARIA authoring rules

- **No redundant roles**: don't set `role="button"` on `<button>` or `role="heading"` on `<h2>`
- **aria-hidden cascades**: placing `aria-hidden="true"` on a parent removes the entire subtree from the accessibility tree, including focusable descendants — never put it on an ancestor of a focusable element
- **role="presentation" and aria-hidden on focusable elements**: both are prohibited on elements that can receive focus — they remove semantics while leaving the element keyboard-reachable, producing an operable but unnamed control
- **Labelling vs describing**: `aria-label` / `aria-labelledby` name the control. `aria-describedby` provides supplementary context. Both can coexist on the same element
- **Required fields**: use `aria-required="true"` or the HTML `required` attribute. Visual asterisks must have an explanatory text string visible on the page; the asterisk glyph itself should carry `aria-hidden="true"` — `<FormGroupLabel>` already handles this
- **display:none vs aria-hidden**: elements with `display:none` are already removed from the accessibility tree; adding `aria-hidden` is redundant. Use `aria-hidden="true"` only when an element is visually present but should be hidden from assistive technology

---

## Color and contrast

Gamut's `ColorMode` and semantic color tokens are designed to meet WCAG AA (4.5:1 for normal text, 3:1 for large text and non-text UI components). Hardcoding hex values bypasses this guarantee and breaks in dark mode. See the `gamut-color-mode` skill for semantic token usage.

Non-text contrast (focus indicators, input borders, icon-only controls) requires a minimum 3:1 ratio against adjacent colors per WCAG 1.4.11.

---

## Testing checklist

- [ ] Full keyboard navigation: every interactive element reachable and operable without a mouse
- [ ] Focus is always visible and never lost or unexpectedly trapped
- [ ] Dialogs trap focus correctly; Escape closes; focus returns to the trigger
- [ ] Composite widgets (tabs, menus, listboxes) use arrow keys internally, not Tab
- [ ] All form inputs have programmatically associated labels (not placeholder-only)
- [ ] Form errors are announced via live region
- [ ] Icon-only controls have accessible names
- [ ] No content relies solely on color to convey meaning
- [ ] Screen reader matrix: VoiceOver + Safari (iOS), VoiceOver + Chrome (macOS), NVDA + Chrome (Windows)
- [ ] 200% zoom: layout intact, no content overflow or disappearance

---

## Common anti-patterns

| Anti-pattern                                             | Fix                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| `<div onClick={…}>` for actions                          | `<Button>`                                                  |
| `placeholder` as the only label                          | `<FormGroupLabel>` with matching `htmlFor`/`id`             |
| `aria-label` on a `<div>` with no role                   | Add a meaningful `role` or use a semantic element           |
| `role="button"` without Space/Enter handlers             | Use `<Button>`, or add `keydown` handler                    |
| `tabIndex={0}` on every item in a composite              | Roving tabindex: `0` on active item, `-1` on rest           |
| Tooltip as the only accessible name for a control        | Set `aria-label` directly on the control as well            |
| `aria-hidden="true"` on a focusable element              | Also remove from tab order (`tabIndex={-1}`) or restructure |
| `mousedown` for activation                               | Use `click`                                                 |
| `outline: none` without a replacement                    | Use Gamut's built-in focus styles                           |
| Multiple `aria-live` regions for the same content stream | One region per logical stream; reuse it across updates      |
