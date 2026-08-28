# ToolTip and InfoTip

## Use `placement: 'floating'` on tooltips inside overflow containers

Gamut's `ToolTip` defaults to `placement: 'inline'`, which positions the tooltip within the DOM flow and gets clipped by ancestors with `overflow: hidden` (e.g., `DataTable` rows).

When an `IconButton` or `ToolTip` is inside a table, card, or any container that clips overflow, pass:

- `tipProps={{ placement: 'floating' }}` on `IconButton`
- `placement="floating"` on `ToolTip` directly

This renders the tooltip in a floating layer above all content.

## Use `alignment="bottom-*"` on `InfoTip` / `ToolTip` near the top of the viewport

Gamut tips default to opening above their trigger. When the trigger is near the top of the page (e.g., inside a page heading), the tip will be clipped by the viewport edge.

Always pass `alignment="bottom-right"` (or `"bottom-left"`) so the tip opens downward instead.
