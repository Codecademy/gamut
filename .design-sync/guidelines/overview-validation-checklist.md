# Validation Checklist

Before considering output final, verify:

- [ ] Every color resolves to a Gamut semantic or core color token — no raw hex values. Status colors (success/error/warning) use `feedback-*` tokens, never brand green/red hex. Page and section backgrounds use `background-*` tokens or `<Background bg>`, never a styled `div`.
- [ ] The whole tree renders inside `ColorMode` so semantic tokens resolve.
- [ ] All spacing and sizing values match the spacing token scale.
- [ ] Border radius values use one of the defined radius tokens.
- [ ] Typography uses only accepted font families, sizes, weights, and line heights.
- [ ] UI elements map to existing Gamut components where applicable — a purpose-built component (`List`, `DataList`, `DataTable`, `Toggle`, `Menu`, etc.) was used instead of recreating the pattern from `Box`/`FlexBox`. Status labels, counts, pills, and chips use `Badge`/`Tag` — not a hand-styled `Box`.
- [ ] Icons, illustrations, and patterns are sourced from the Gamut libraries.
- [ ] Icon selection was determined by visual appearance and contextual clues (tooltip text, element purpose) — not by Figma layer names, which may be stale.
- [ ] The design meets WCAG accessibility requirements for contrast and target size.
- [ ] All component imports reference the real `window.CodecademyGamut` bundle — no local shim/reimplementation exists.
- [ ] No inline `style` attributes, `className`, or SCSS/CSS modules are used on Gamut components — all styling uses system props, `css()`/`variant()`/`states()`, or Gamut tokens.
- [ ] All system props use shorthand notation (e.g., `mb` instead of `marginBottom`).
- [ ] No nested selectors (bare tag selectors, `${Component} { }`) inside styled/Emotion template literals.
- [ ] Any unavoidable departure from a rule above (forced `className`, no matching token) is called out explicitly, not shipped silently.
- [ ] Gamut component inventory was inspected before writing any custom markup for a UI pattern.
- [ ] Any custom markup includes a comment confirming no suitable Gamut component exists.
- [ ] Dark/light regions use `ColorMode` or `Background` — no custom CSS color overrides for mode switching.
- [ ] Every `DataTable` / `DataList` with `sortable: true` columns also provides `query` and `onQueryChange` props, and passes pre-sorted rows.
- [ ] Every `Menu` has an explicit `variant` prop — `fixed` for persistent navigation (sidebars, primary nav, footer nav), `popover` for temporary surfaces (overflow menus, action menus). `fixed` menus render as `<nav>` via `as="nav"`.
- [ ] All functional forms use `GridForm` or `ConnectedForm` — bare form atoms (`Input`, `Select`, `Checkbox`, etc.) are only used as standalone display elements outside of form submission contexts.
- [ ] `GamutProvider` uses `percipioTheme` unless a different theme was explicitly requested by the user.
- [ ] All color references use semantic tokens (e.g., `background-primary`) rather than core-theme-specific values (e.g., `beige`).
- [ ] All component sizing, variant, and display props match the Figma design — no props left at defaults when the design specifies otherwise.
- [ ] Focus is trapped inside modals, dialogs, drawers, and flyouts via `FocusTrap`; keyboard users cannot tab into background content.
