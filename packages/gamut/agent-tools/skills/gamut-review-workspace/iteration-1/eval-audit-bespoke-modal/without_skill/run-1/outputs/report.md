# Design System Compliance Review: CustomConfirm.tsx

**File:** `/Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-bespoke-modal/fixture/CustomConfirm.tsx`

## Summary

`CustomConfirm` is a fully bespoke confirmation dialog built from raw `<div>`/`<button>` elements and inline `style` objects. Gamut already ships a purpose-built `Dialog` component (`packages/gamut/src/Modals/Dialog.tsx`) that solves exactly this "are you sure?" use case on top of `Overlay`, `FocusTrap`, `BodyPortal`, and the `Button`/`Typography` primitives. `CustomConfirm` re-implements — and regresses — most of what that stack already provides. Nearly every finding below is a symptom of not using the existing component.

## Findings

**1. Reinvents an existing component instead of using `Dialog`/`Modal` (Critical).** `packages/gamut/src/Modals/Dialog.tsx` already implements a confirm/cancel dialog with title, `confirmCta`/`cancelCta`, close button, focus trapping, portal rendering, and token-driven visuals. This should be used instead of hand-rolled markup.

**2. Inline styles violate the `no-inline-style` lint rule (High).** `style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}` and `style={{ background: 'white', padding: 24, margin: '100px auto', width: 400 }}`. `packages/eslint-plugin-gamut/src/no-inline-style.ts` reports an error on any JSX `style` prop ("consider using styled components, design system utilities, or CSS classes instead"). Gamut components express layout via `styled()` + `@codecademy/gamut-styles` system props (see `packages/gamut/src/Modals/elements.tsx`, `packages/gamut/src/Overlay/index.tsx`) rather than raw style objects; the one exception in `FocusTrap/index.tsx` is explicitly annotated with `eslint-disable-next-line gamut/no-inline-style`.

**3. Hardcoded colors, no token usage, no dark-mode support (High).** Backdrop `rgba(0,0,0,0.5)` vs. Gamut's `Overlay` shroud which uses themed token `bg: 'navy-600'` (`Overlay/index.tsx`). Panel `background: 'white'` is a raw literal; Gamut renders inside a `ColorMode`-aware tree (`BodyPortal`'s `PortalWrapper.withComponent(ColorMode)`), so this won't adapt to dark mode.

**4. Hardcoded spacing/sizing instead of the token-driven size-variant scale (High).** `padding: 24`, `margin: '100px auto'`, `width: 400` are magic numbers. `ModalContainer` (`Modals/elements.tsx`) instead defines a `size` variant (`small`=400px/`medium`=540px/`large`=680px/`fluid`) with `maxWidth: calc(100vw - 4rem)` / `maxHeight: calc(100vh - 4rem)` viewport guards, `p: 24` via the spacing scale, and `borderRadius: 'sm'` (CustomConfirm has no border radius at all). The fixed `width: 400` + `margin: '100px auto'` has no overflow guard, so it can clip/overflow on short or narrow viewports.

**5. Not rendered through `BodyPortal`, no explicit z-index (High).** Gamut's `Overlay` always portals to `document.body` via `BodyPortal` (default `zIndex=3`) unless `inline`. `CustomConfirm` renders in place, so it's vulnerable to clipping by ancestor `overflow:hidden`/transformed containers, and has no defined stacking order relative to headers/toasts since no `z-index` is set at all on the backdrop.

**6. No focus trap / focus management — accessibility regression (High).** `Overlay`/`Modal`/`Dialog` wrap content in `FocusTrap` (`packages/gamut/src/FocusTrap/index.tsx`, built on `react-focus-on`), trapping Tab focus and restoring it on close. `CustomConfirm` has none of this — keyboard users can Tab out of the dialog into the page behind it, and focus isn't moved into the dialog on open or restored to the trigger on close.

**7. Duplicated, less robust escape/outside-click handling (Medium).** Hand-rolled `useEffect` keydown listener plus `onClick`/`stopPropagation()` duplicate what `Overlay`'s `escapeCloses`/`clickOutsideCloses` props already provide via `FocusTrap`'s `onEscapeKey`/`onClickOutside` — and are less correct (e.g., won't correctly classify portaled children like tooltips/menus as "inside").

**8. Raw `<button>` elements instead of Gamut `Button` components (Medium).** `Dialog`/`Modal` use `TextButton` (secondary/cancel) and `FillButton` (primary/confirm, with `variant="primary"|"danger"`). Plain `<button>`s lose consistent typography, hover/focus-visible states, disabled styling, and the primary/secondary visual hierarchy — notably no way to signal a destructive confirm via `variant="danger"`.

**9. Body text not using `Text`/`Typography` (Medium).** `<p>Are you sure?</p>` bypasses `Text` (from `packages/gamut/src/Typography`), which ties font size/line height/color to the type scale and theming, as used for both title and content in `Dialog`/`Modal`.

**10. Missing dialog title / heading semantics (Medium).** `Dialog`/`Modal` always render a heading (`title`, default `headingLevel="h2"`) tied to `aria-labelledby`. `CustomConfirm` has no heading — "Are you sure?" is unlabelled body copy, and no `aria-label` is supplied either, so the dialog has no accessible name.

**11. Incomplete ARIA wiring (Medium).** `role="dialog"` is present but `aria-modal="true"` is missing, and `role="dialog"` is placed on the backdrop `div` rather than the inner panel (Gamut's convention, per `ModalContainer` usage in `Dialog.tsx`/`Modal.tsx`, is role/aria attributes on the panel, not the shroud).

**12. No close (X) button affordance (Low/Medium).** Every Gamut modal/dialog also provides a dismiss `IconButton` (`MiniDeleteIcon`) per the `CloseButtonProps` pattern; `CustomConfirm` only offers "Cancel."

**13. No overflow handling for long content (Low).** `Dialog`/`Modal` manage content overflow (`overflowY: scrollable ? 'auto' : 'visible'`); `CustomConfirm`'s content has none, so longer copy would blow out the fixed 400px panel.

## Recommendation

Replace `CustomConfirm` with Gamut's `Dialog`:

```tsx
<Dialog
  isOpen={isOpen}
  title="Are you sure?"
  onRequestClose={onClose}
  confirmCta={{ children: 'Confirm', onClick: onConfirm }}
  cancelCta={{ children: 'Cancel' }}
/>
```

This inherits correct tokens, portal rendering with managed z-index, focus trapping/restoration, escape/outside-click handling, ARIA wiring, and standard button hierarchy in one change — eliminating essentially every finding above.
