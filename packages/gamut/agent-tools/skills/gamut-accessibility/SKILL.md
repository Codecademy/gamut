---
name: gamut-accessibility
description: ARIA authoring patterns and Gamut-specific accessibility guidance. Apply when implementing or reviewing interactive components, forms, focus management, live regions, or color contrast in Gamut-based apps.
---

# Gamut Accessibility

Source: `@codecademy/gamut` — interactive components wrap `react-aria-components`, `@react-aria/interactions`, and `react-focus-on`.

---

## APG foundational principles

### No ARIA is better than bad ARIA

The [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) opens with this. Incorrect ARIA is worse than no ARIA — it actively misleads AT users about the identity, function, and state of controls. When in doubt, remove the ARIA rather than guess.

### A Role is a Promise

ARIA roles modify the accessibility tree. They do not add keyboard behavior, focusability, or interactivity. `role="button"` on a `<div>`:

- Makes screen readers announce it as a button
- Does **not** make it focusable or put it in the tab sequence
- Does **not** make Space or Enter trigger the click handler
- Does **not** provide any of the state signaling (`aria-pressed`, `aria-disabled`) a real button gives you

When you add an ARIA role you are making a promise that the element behaves exactly as that role implies. You must implement everything the native element provides for free. This is precisely why Gamut uses React Aria — it keeps the promise automatically.

### ARIA can both cloak and enhance

ARIA can augment native semantics (`aria-pressed` on a `<button>`) or override them entirely (`role="menuitem"` on an `<a>`). Both capabilities are powerful and dangerous. Override only when native HTML genuinely doesn't fit the pattern; when augmenting, verify you aren't contradicting the semantics the native element already exposes.

### The First Rule of ARIA Use

If a native HTML element or attribute with the semantics and behavior you need already exists, use it. Reach for ARIA only when native HTML is genuinely insufficient for the pattern.

### AT support is not uniform

APG patterns represent what assistive technology *should* support per specification. Real-world support across browser/AT combinations varies and drifts. For production features, test with the combinations your users rely on. A minimal matrix: VoiceOver + Safari (iOS), VoiceOver + Chrome (macOS), NVDA + Chrome (Windows), JAWS + Chrome (Windows).

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

Always provide an accessible name via `aria-label` (non-visible title) or `aria-labelledby` (references a visible heading id).

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

| Anti-pattern | Fix |
|---|---|
| `<div onClick={…}>` for actions | `<Button>` |
| `placeholder` as the only label | `<FormGroupLabel>` with matching `htmlFor`/`id` |
| `aria-label` on a `<div>` with no role | Add a meaningful `role` or use a semantic element |
| `role="button"` without Space/Enter handlers | Use `<Button>`, or add `keydown` handler |
| `tabIndex={0}` on every item in a composite | Roving tabindex: `0` on active item, `-1` on rest |
| Tooltip as the only accessible name for a control | Set `aria-label` directly on the control as well |
| `aria-hidden="true"` on a focusable element | Also remove from tab order (`tabIndex={-1}`) or restructure |
| `mousedown` for activation | Use `click` |
| `outline: none` without a replacement | Use Gamut's built-in focus styles |
| Multiple `aria-live` regions for the same content stream | One region per logical stream; reuse it across updates |
