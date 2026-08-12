# Design System Compliance Review: `CustomConfirm.tsx`

**File reviewed:** `packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-bespoke-modal/fixture/CustomConfirm.tsx`

## Summary

This component reimplements a confirmation dialog entirely from scratch using raw HTML, inline styles, and native `<button>`/`<p>` elements. Gamut already ships a purpose-built component for exactly this use case — **`Dialog`** (`packages/gamut/src/Modals/Dialog.tsx`), built on top of `Overlay`, `ModalContainer`, `FocusTrap`, `BodyPortal`, `Text`, and `FillButton`/`TextButton`. Nearly every line of `CustomConfirm.tsx` duplicates behavior that `Dialog` (or its sibling `Modal`) already provides in a themed, accessible, token-driven way. The biggest issue is architectural (bespoke component instead of the existing primitive); the rest of the findings are the concrete symptoms of that choice — hard-coded colors/spacing/radii instead of tokens, and missing accessibility/interaction behavior that the shared primitives already solve.

## Findings

### 1. Reinvents an existing component (`Dialog`) instead of using it

Gamut's `Dialog` component (`src/Modals/Dialog.tsx`) is designed specifically for confirm/cancel flows: it accepts `title`, `confirmCta`, `cancelCta`, `variant` (`'primary' | 'danger'`), and `onRequestClose`, and internally wires up the overlay, focus trap, portal, close button, and CTA buttons with correct styling and grid layout (`gridArea="cancel"` / `gridArea="confirm"`, `columnGap: 16`). `CustomConfirm` re-solves the same problem with bespoke markup, so it won't visually or behaviorally match any other confirm dialog in the product, and any future design update to `Dialog` (spacing, radius, animation, a11y fix) won't propagate here.

### 2. Raw inline `style` objects instead of the token-based style-prop system

```tsx
style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}
...
style={{ background: 'white', padding: 24, margin: '100px auto', width: 400 }}
```

Every Gamut surface (`Box`, `Overlay`, `ModalContainer`, etc.) is styled through `styled-components`/`variance` style props (e.g. `bg`, `p`, `position`, `inset`, `borderRadius`) that resolve to theme tokens. Using the `style` attribute bypasses the entire theming system — no dark-mode/color-mode support, no responsive scale, no design-token enforcement.

### 3. Hard-coded, non-token color values

- `background: 'rgba(0,0,0,0.5)'` for the scrim: Gamut's own `Overlay` shroud (`OverlayContainer`, via `states({ shroud: { bg: 'navy-600' } })`) uses the themed color token `navy-600` (a semi-transparent navy derived from the palette in `packages/gamut-styles/src/variables/colors.ts`), not literal black. Flat black at 50% opacity will look visibly different from every other overlay/modal scrim in the app and won't respond to color-mode changes.
- `background: 'white'` for the panel: should be a theme color token rather than the raw CSS keyword, again bypassing dark-mode support.

### 4. Hard-coded spacing instead of the spacing scale

`padding: 24` and `margin: '100px auto'` use raw pixel numbers. Gamut's spacing scale (`packages/gamut-styles/src/variables/spacing.ts`) is a fixed token set — `0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 96` (rem-based) — consumed via style props (e.g. `ModalContainer`'s `layoutVariant` uses `p: 24`, `columnGap: 16`). `padding: 24` happens to coincide with a valid token value but is disconnected from the scale via inline style, and `margin: '100px auto'` is a one-off magic number with no token equivalent — vertical centering should come from layout (flex/grid), which is exactly what `Overlay`'s `OverlayContainer` already provides via its `center` prop instead of margin hacks.

### 5. No border radius applied

Every modal-like surface in the system (`ModalContainer`) applies `borderRadius: 'sm'` (2px, from `borderRadii` tokens) as part of its base layout variant. The custom panel has square corners, inconsistent with any real Gamut modal/dialog rendered elsewhere in the same app.

### 6. Fixed pixel width instead of the `size` variant scale

`width: 400` is a raw number. `ModalContainer`'s `sizeVariant` defines standardized widths (`small: 400px`, `medium: 540px`, `large: 680px`, `fluid`) plus a `maxWidth: calc(100vw - 4rem)` safety rail on the base variant so no modal overflows the viewport. `CustomConfirm` matches "small" width by coincidence but has no viewport-relative max-width, so on narrow/mobile viewports it can overflow or get clipped (compounded by the `100px auto` margin, which reserves no horizontal gutter).

### 7. No z-index management / not rendered through a portal

Gamut's `Overlay` explicitly manages stacking (`zIndex` prop, default `3`, documented as appearing above common UI elements like headers) and renders through `BodyPortal`, which mounts content at `document.body` with its own `zIndex` (default `1`) specifically to avoid ancestor stacking-context/overflow/z-index problems. `CustomConfirm` sets no z-index and renders inline wherever mounted; if a parent has `overflow: hidden`, a transform, or a competing z-index, this dialog can be clipped or misordered relative to other content, and has no defined stacking relationship with any real Gamut overlay on the same page.

### 8. No focus trap / focus management

`Overlay` wraps children in `FocusTrap` (`src/FocusTrap/index.tsx`, built on `react-focus-on`), trapping Tab focus inside the dialog while open and — via `ModalContainer`'s `data-autofocus` attribute — auto-focusing the container on open, then restoring focus on close. `CustomConfirm` does none of this: keyboard users can Tab out of the "modal" into background content, and focus is never programmatically moved into the dialog when it opens.

### 9. Escape-key and click-outside handling are manually reimplemented, duplicating existing system behavior

```tsx
useEffect(() => {
  if (!isOpen) return;
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  document.addEventListener('keydown', handleKey);
  return () => document.removeEventListener('keydown', handleKey);
}, [isOpen, onClose]);
```

and

```tsx
<div ... onClick={onClose}>
  <div ... onClick={(e) => e.stopPropagation()}>
```

`Overlay` already exposes `escapeCloses` and `clickOutsideCloses` props, implemented correctly through `FocusTrap`'s `onEscapeKey`/`onClickOutside` (which handle portalled content correctly). Reimplementing this with a raw `document` listener and a `stopPropagation` click-catcher duplicates centrally-maintained logic, is more fragile (bubbling-based rather than a true outside-click detector), and offers no way to disable click-outside-to-close the way `clickOutsideCloses={false}` does.

### 10. Missing modal accessibility attributes and heading structure

The div has `role="dialog"` but is missing `aria-modal="true"`, `aria-label`/`aria-labelledby`, and any heading element. Gamut's `Modal`/`Dialog` always set `aria-modal="true"`, `aria-hidden="false"`, and `aria-labelledby` pointing at a rendered title (`<Text as="h2" ...>`). `CustomConfirm` has no title/heading — just `<p>Are you sure?</p>` — so there's nothing to serve as the dialog's accessible name; screen reader users get an unlabeled dialog.

### 11. Raw `<p>` instead of the `Text` typography component

Gamut components consistently render copy through `Text` (`src/Typography`) with tokenized `fontSize`/`lineHeight` (e.g. `<Text as="h2" fontSize={20} lineHeight="base">`). A raw `<p>` bypasses the type scale, line-height tokens, and any centrally-controlled font family/color.

### 12. Raw `<button>` elements instead of Gamut `Button` variants

The most visible divergence. `Dialog`/`Modal` render actions as `TextButton` (secondary/cancel, `variant="secondary"`) and `FillButton` (primary confirm, supporting `variant: 'primary' | 'danger'` for destructive confirmations). `CustomConfirm`'s `<button>Cancel</button>` / `<button>Confirm</button>` have no variant styling, no focus-visible treatment, no consistent sizing/padding, and no way to express a destructive/danger action. There's also no defined spacing between the two buttons (relying on default browser margins) versus the `columnGap: 16` token used by `ModalContainer`.

### 13. No close ("X") button

Every Gamut `Modal`/`Dialog` renders a dismiss `IconButton` (`MiniDeleteIcon`) by default (optionally hidden via `closeButtonProps.hidden`). `CustomConfirm` provides no equivalent, so the only way to dismiss it is clicking the scrim or hitting Escape — a smaller/less discoverable affordance than the rest of the system's dialogs.

### 14. API shape diverges from the established `Dialog` contract

Gamut's existing pattern for this exact scenario uses `confirmCta` / `cancelCta` (each `{ children, onClick, href? }`) and `onRequestClose`. `CustomConfirm` instead exposes `onConfirm` / `onClose` with no label flexibility (button text is hard-coded to "Cancel"/"Confirm"). This introduces a second, parallel confirm-dialog API that solves the same problem the system already solves, increasing cognitive overhead for engineers who know the real `Dialog` contract.

## Suggested remediation

Replace this component entirely with Gamut's `Dialog`:

```tsx
import { Dialog } from '@codecademy/gamut';

<Dialog
  title="Are you sure?"
  onRequestClose={onClose}
  confirmCta={{ children: 'Confirm', onClick: onConfirm }}
  cancelCta={{ children: 'Cancel' }}
/>;
```

This alone resolves items 1–13 by inheriting the system's token-based colors/spacing/radius, portal + z-index handling, focus trap, escape/outside-click handling, ARIA wiring, typography, and button variants for free.
