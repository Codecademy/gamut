/**
 * Semantic z-index scale. A single scale covers both in-flow layers (low values) and
 * portal layers (≥200). Every z-index in Gamut should reference a token here rather than a
 * magic number.
 *
 * The `zIndex` prop is intentionally left numeric/unscaled, and this object is numeric, so
 * tokens are used as `zIndex={zIndices.modal}`. That preserves the escape hatch (a raw
 * in-between number, e.g. `zIndex={550}`) and arithmetic on tokens (e.g. `zIndices.foreground - 2`).
 *
 * Values are spaced by 100 so in-between escape-hatch numbers are available. `floating` (200) is
 * the floor of the portal band and the default for `BodyPortal`.
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
   * underline) and sticky content headers (e.g. a sticky table `thead`).
   */
  foreground: 100,
  /**
   * Portal floor: the default for `BodyPortal`, and the layer for persistent floating page
   * furniture at rest (e.g. an AI chat launcher, help bubble). Above page content, below the
   * app nav and all overlays.
   */
  floating: 200,
  /** Global app header / nav bar. Aliased by the legacy `elements.headerZ` constant. */
  appBar: 300,
  /** Portaled side panel (the `Flyout` component = `Drawer` inside `Overlay`). */
  flyout: 400,
  /** `Overlay`, `Modal`, and `Dialog` (they share one portal primitive). */
  modal: 500,
  /** Portal-mode `Popover` and the portaled `SelectDropdown` menu — above modal. */
  popover: 600,
  /**
   * Top-most transient overlays that must never be clipped: floating tooltips (`FloatingTip`)
   * and toasts / notifications (`Toaster`). Highest layer — nothing in Gamut sits above it.
   */
  topmost: 700,
} as const;
