# ToolTip and InfoTip

**Related:** [`skills/gamut-accessibility/SKILL.md`](../../skills/gamut-accessibility/SKILL.md) (`aria-describedby`, `InfoTip` labeling)

**Storybook:** [Molecules / ToolTip](https://gamut.codecademy.com/?path=/docs-molecules-tips-tooltip--docs) · [InfoTip](https://gamut.codecademy.com/?path=/docs-molecules-tips-infotip--docs)

## Use `placement: 'floating'` inside overflow containers

`ToolTip` defaults to `placement: 'inline'`, which is clipped by ancestors with `overflow: hidden` (e.g. `DataTable` rows).

When an `IconButton` or `ToolTip` is inside a table, card, or clipping container:

- `tipProps={{ placement: 'floating' }}` on `IconButton`
- `placement="floating"` on `ToolTip` directly

This renders the tooltip in a floating layer above surrounding content.

## Use `alignment="bottom-*"` near the top of the viewport

Tips default to opening above the trigger. Near the page top (e.g. in a heading), the tip can clip.

Pass `alignment="bottom-right"` or `"bottom-left"` so the tip opens downward.
