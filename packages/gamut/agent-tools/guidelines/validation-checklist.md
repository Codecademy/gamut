# Validation checklist

Run before considering Gamut UI output final. Automated checks: `/gamut-review` (see [`commands/gamut-review.md`](../commands/gamut-review.md)).

## Tokens and styling

- [ ] Every color uses Gamut semantic or palette tokens — no raw hex in adaptive UI.
- [ ] Spacing and sizing use the spacing scale from [`foundations/spacing.md`](foundations/spacing.md).
- [ ] Border radius uses defined radius tokens.
- [ ] Typography uses theme font families, sizes, weights, and line heights from [`foundations/typography.md`](foundations/typography.md) and root `DESIGN.md`.
- [ ] No inline `style` attributes — system props or `css` / `variant` / `states` from `@codecademy/gamut-styles`.
- [ ] System props use shorthand (`mb`, `p`, `bg`) not long-form (`marginBottom`).

## Components and assets

- [ ] UI maps to existing Gamut components where applicable — inventory checked before custom markup.
- [ ] Custom markup includes a comment when no suitable Gamut component exists.
- [ ] Icons from `@codecademy/gamut-icons` (visual/context selection, not stale Figma layer names — see [`overview-icons.md`](overview-icons.md)).
- [ ] Illustrations from `@codecademy/gamut-illustrations`; patterns from `@codecademy/gamut-patterns`.
- [ ] Component sizing, variant, and display props match the design — no silent defaults when the source specifies values.

## Color modes and theme

- [ ] Dark/light regions use `ColorMode` or `Background` from `@codecademy/gamut-styles` — no custom CSS overrides for mode switching ([`foundations/modes.md`](foundations/modes.md)).
- [ ] Semantic tokens and fonts match the active theme in root `DESIGN.md` and `<GamutProvider>` (see [`skills/gamut-theming/SKILL.md`](../skills/gamut-theming/SKILL.md)).

## Component guardrails

- [ ] `DataTable` / `DataList` with `sortable: true` also provide `query`, `onQueryChange`, and pre-sorted `rows` ([`components/data-table.md`](components/data-table.md)).
- [ ] Every `Menu` has explicit `variant` — `fixed` + `as="nav"` for persistent nav, `popover` for temporary menus ([`components/menu.md`](components/menu.md)).
- [ ] Functional forms use `GridForm` or `ConnectedForm`; bare atoms only for standalone/live controls ([`components/forms.md`](components/forms.md)).

## Accessibility

- [ ] WCAG contrast and target size validated for non-standard compositions.
- [ ] Modals, dialogs, drawers, and focus-confined regions use `FocusTrap` ([`skills/gamut-accessibility/SKILL.md`](../skills/gamut-accessibility/SKILL.md)).

## Dependencies

- [ ] `@codecademy/*` packages in `package.json` are not modified, shimmed, or aliased away from published APIs.
- [ ] Imports use package roots — no deep `@codecademy/gamut/dist/` or `src/` paths.
