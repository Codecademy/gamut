---
name: gamut-accessibility
description: ARIA authoring patterns and Gamut-specific accessibility guidance. Apply when implementing or reviewing interactive components, forms, focus management, live regions, or color contrast in Gamut-based apps.
---

# Gamut Accessibility

Source: `@codecademy/gamut` — interactive components wrap `react-aria-components`, `@react-aria/interactions`, and `react-focus-on`.

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

Always provide an accessible name via `aria-label` (non-visible title) or `aria-labelledby` (references a visible heading id).

```tsx
<Dialog aria-labelledby="confirm-title">
  <h2 id="confirm-title">Confirm deletion</h2>
</Dialog>
```

### Alert

Renders with `aria-live="polite"` and `role="status"` by default. Override with `aria-live="assertive"` only for time-sensitive errors requiring immediate interruption. Do not nest `<Alert>` inside another live region.

### Tabs

Built on `react-aria-components`. Follows the [ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): arrow keys navigate tabs, Tab moves focus into the active panel, Home/End jump to first/last tab. No manual `aria-selected` or keyboard handling needed.

### Forms

`<FormGroup>` + `<FormGroupLabel>` + input element is the complete accessible pattern:

```tsx
<FormGroup htmlFor="email-input" description="Used for login" error={errors.email}>
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

## Live regions

| Scenario | Pattern |
|---|---|
| Status updates, non-critical notifications | `aria-live="polite"` |
| Form validation errors on submit | `aria-live="assertive"` |
| Frequently updating counts or progress | `aria-live="polite"` + `aria-atomic="true"` |

Inject live regions into the DOM before they need to announce. A region added simultaneously with its first announcement may be ignored by some assistive technologies.

`<FormGroup>` already uses `aria-live="assertive"` for the `error` prop. Don't elevate unrelated inline errors to assertive — reserve it for interruptions the user didn't directly trigger.

---

## ARIA authoring rules

- **No redundant roles**: don't set `role="button"` on `<button>` or `role="heading"` on `<h2>`
- **aria-hidden cascades**: placing `aria-hidden="true"` on a parent removes the entire subtree from the accessibility tree, including focusable descendants — never put it on an ancestor of a focusable element
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
- [ ] All form inputs have programmatically associated labels (not placeholder-only)
- [ ] Form errors are announced via live region
- [ ] Icon-only controls have accessible names
- [ ] No content relies solely on color to convey meaning
- [ ] Screen reader smoke test: VoiceOver (macOS/iOS) or NVDA + Chrome (Windows)
- [ ] 200% zoom: layout intact, no content overflow or disappearance

---

## Common anti-patterns

| Anti-pattern | Fix |
|---|---|
| `<div onClick={…}>` for actions | `<Button>` |
| `placeholder` as the only label | `<FormGroupLabel>` with matching `htmlFor`/`id` |
| `aria-label` on a `<div>` with no role | Add a meaningful `role` or use a semantic element |
| Tooltip as the only accessible name for a control | Set `aria-label` directly on the control as well |
| `aria-hidden="true"` on a focusable element | Also remove from tab order (`tabIndex={-1}`) or restructure |
| `outline: none` without a replacement | Use Gamut's built-in focus styles |
| Multiple `aria-live` regions for the same content stream | One region per logical stream; reuse it across updates |
