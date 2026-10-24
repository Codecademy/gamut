# Accessibility

- Follow WCAG guidelines for contrast, touch target size, and text legibility.
- Interactive elements must have clearly distinguishable focus, hover, and active states using system tokens — never `outline: none` without a replacement.
- Use only accessible color pairings defined in the Gamut color system — do not introduce untested combinations.
- Prefer native HTML and Gamut primitives over custom markup: `FillButton`/`StrokeButton`/`TextButton`/`IconButton` instead of `<div onClick>`, real `<label>`/`FormGroupLabel` association instead of placeholder-only labels.
- **Trap focus inside modals, dialogs, drawers, flyouts, and any other focus-confined region** using `FocusTrap`. Without focus trapping, keyboard users can tab out of a modal into background content — a WCAG violation.
- Use `click` for activation, not `mousedown` — it's what fires from both pointer and keyboard activation on native controls.
- For component-specific accessibility behavior (what each component handles for you vs. what you must still supply) and the full ARIA authoring rules, see `components/accessibility.md`.
