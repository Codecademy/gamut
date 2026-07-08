/**
 * Semantic z-index scale. A single scale covers both in-flow layers (low values) and
 * portal layers (≥100). Every z-index in Gamut should reference a token here rather than a
 * magic number.
 *
 * The `zIndex` prop is intentionally left numeric/unscaled, and this object is numeric, so
 * tokens are used as `zIndex={zIndices.modal}`. That preserves the escape hatch (a raw
 * in-between number, e.g. `zIndex={605}`) and arithmetic on tokens (e.g. `zIndices.foreground - 2`).
 *
 * Portal-band values are spaced by 100 so in-between escape-hatch numbers are available.
 * `portal` (200) is the floor of the portal band and the default for `BodyPortal`.
 *
 * @remarks PLEASE talk to web platform before adding new z-index tokens.
 */
export const zIndices = {
  /** Decorative layer behind content (underlines, backdrops, shadows). */
  underlay: -100,
  /** Ground layer — establishes a local stacking context without lifting above siblings. */
  base: 0,
  /**
   * The raised in-flow layer: an element in front of what sits/scrolls behind it, but below
   * all portal overlays. Covers content lifted above an `underlay` (e.g. text over its
   * underline) and sticky content headers (e.g. a sticky table `thead`). Set to 100 so it
   * clears common ad-hoc low z-index values.
   */
  foreground: 100,
  /** Portal floor / `BodyPortal` default — un-tokenized portal content lands here. */
  portal: 200,
  /** Persistent floating page furniture at rest (e.g. an AI chat launcher, help bubble). */
  widget: 300,
  /** Global app header / nav bar. Aliased by the legacy `elements.headerZ` constant. */
  appBar: 400,
  /** Portaled side panel (the `Flyout` component = `Drawer` inside `Overlay`). */
  flyout: 500,
  /** `Overlay`, `Modal`, and `Dialog` (they share one portal primitive). */
  modal: 600,
  /** Portal-mode `Popover` and the portaled `SelectDropdown` menu — above modal. */
  popover: 700,
  /** Toasts / notifications — visible above modals. */
  toaster: 800,
  /** Floating tooltips (`FloatingTip`) — highest, so they are never clipped. */
  tooltip: 900,
} as const;
