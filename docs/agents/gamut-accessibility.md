# Gamut accessibility

## Principles

1. **Gamut first** — Use documented Gamut components and props for alerts, forms, navigation, and layout before custom DOM.
2. **Semantics + behavior** — Correct role, name, state, and keyboard interaction; styling follows via semantic tokens from `@codecademy/gamut-styles`.
3. **No accessibility regressions** — Avoid `tabIndex={-1}` on primary actions, click-only handlers without keyboard equivalents, and placeholder-only labels.

## Keyboard and focus

- Tab order follows visual order; custom widgets need arrow-key patterns where applicable (listbox, tabs, grid).
- Preserve or replace `:focus-visible` styles; match platform conventions for focus rings.
- After closing overlays, return focus to the triggering control.

## Forms

Gamut’s styleguide ([Form elements — About](https://gamut.codecademy.com/?path=/docs-atoms-form-elements-about--page), [ConnectedForm — About](https://gamut.codecademy.com/?path=/docs-organisms-connectedform-about--page)) tells consumers to build forms with **`GridForm`** or **`ConnectedForm`**, not the `Form` / `FormGroup` atoms, unless the UI truly does not need full form behavior (validation, submission, accessible wiring).

- **`GridForm`** — Use when the design fits a **12-column grid** with consistent vertical rhythm. It composes form elements inside `LayoutGrid`, uses **react-hook-form** for validation, and documents **accessibility behaviors out of the box** ([GridForm — Usage](https://gamut.codecademy.com/?path=/docs-organisms-gridform-usage--page)).
- **`ConnectedForm`** — Use for **flexible layouts** (same reliability as GridForm without the rigid grid). Typical stack: **`useConnectedForm`** → **`ConnectedForm`** → **`ConnectedFormGroup`** → **`ConnectedFormInputs`** (via the `component` prop) and **`SubmitButton`**. **`ConnectedFormGroup`** ties labels, errors, and disabled state to fields with proper accessibility ([ConnectedFormGroup](https://gamut.codecademy.com/?path=/docs-organisms-connectedform-connectedformgroup--docs)).
- **Do not use `ConnectedFormInputs` outside `ConnectedFormGroup`** — the ConnectedFormInputs docs state that bypasses much of the accessibility and type-safety ([ConnectedFormInputs](https://gamut.codecademy.com/?path=/docs-organisms-connectedform-connectedforminputs--docs)).
- From **`useConnectedForm`**, render **`FormRequiredText`** before the form unless every field is optional ([ConnectedForm — Usage](https://gamut.codecademy.com/?path=/docs-organisms-connectedform-connectedform--docs)).
- **`GridForm` `custom-group`** — If you supply a custom `FormGroup`, you own label and error surfacing; follow accessible form patterns (Gamut links to [Deque’s accessible forms guide](https://www.deque.com/blog/anatomy-of-accessible-forms-best-practices/) from GridForm Fields).
- **Escape hatch** — If neither organism applies, still meet WCAG: visible labels or programmatic names, text for errors (not color alone), logical reading order. See [UX Writing — Accessibility guidelines](https://gamut.codecademy.com/?path=/docs-ux-writing-accessibility-guidelines--page) and [Meta — Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) for composition habits.

## Overlays

- Dialogs: focus trap, `aria-modal`, labelled (`aria-labelledby` / `aria-label`), Escape closes, focus restoration.
- Menus and listboxes: roving tabindex or `aria-activedescendant` patterns per WAI-ARIA.

## When you need custom components

If no Gamut primitive fits, base behavior on **[MDN accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)** and **[ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)** guidance, and on **[keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)**. Prefer native HTML elements and built-in keyboard behavior; add ARIA only when semantics or state cannot be expressed otherwise (see MDN’s ARIA guides for roles, properties, and live regions).

Style custom UI with **`@codecademy/gamut-styles`** semantic tokens and **`ColorMode` / `Background`** per [gamut-theming.md](./gamut-theming.md), not one-off hex or raw theme object drilling.

### React focus management

- Attach **`useRef`** to elements that should receive focus; call **`focus()`** in **event handlers** or **effects tied to open/close/mount**, not on every render ([refs](https://react.dev/learn/manipulating-the-dom-with-refs), [`useRef`](https://react.dev/reference/react/useRef)).
- Prefer **`useLayoutEffect`** when moving focus immediately after a DOM update (e.g. panel just opened) to reduce flicker for sighted users and assistive tech; use **`useEffect`** when synchronous paint is not required.
- When dismissing transient UI (custom overlay, popover, in-page “dialog”), **restore focus** to the element that opened it; store **`document.activeElement`** in a ref on open if the platform does not do this for you.
- Use **`forwardRef`** (or an explicit ref prop) on reusable wrappers so parents can focus inner controls when the UX requires it.
- Reserve **`tabIndex={-1}`** for **programmatic** focus targets (e.g. skip-link destination, focus container), not for hiding primary actions from the tab order.
- Use **`useId`** for stable **`id`** values when wiring **`aria-labelledby`**, **`aria-describedby`**, **`aria-controls`**, or **`htmlFor`**, matching the relationships described in MDN/WAI-ARIA patterns.

## Docs

- Styleguide Meta and component pages on [gamut.codecademy.com](https://gamut.codecademy.com/) — check the specific component story for a11y notes.
- Forms: [Form elements — About](https://gamut.codecademy.com/?path=/docs-atoms-form-elements-about--page), [GridForm — Usage](https://gamut.codecademy.com/?path=/docs-organisms-gridform-usage--page), [ConnectedForm](https://gamut.codecademy.com/?path=/docs-organisms-connectedform-connectedform--docs).
- [Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) for general composition.

## Checklists (quick)

**Dialog:** labelled, focus trap, Escape, restore focus, scroll lock if needed.  
**Menu:** keyboard navigation, typeahead, dismiss on blur where correct.  
**Form:** prefer `GridForm` or `ConnectedForm` + `ConnectedFormGroup`; `FormRequiredText` when required fields exist; no color-only errors.  
**Live region:** politeness level appropriate for the update frequency.
