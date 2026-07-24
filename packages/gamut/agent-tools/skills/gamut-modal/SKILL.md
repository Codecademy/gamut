---
name: gamut-modal
description: Use this skill when implementing or auditing `Modal` or `Dialog` — single vs. multi-view composition, size/layout, close button wiring, and how dismiss (Escape/outside-click) and focus-trap/autofocus actually work under the hood via `Overlay`/`FocusTrap`. Not for building a custom overlay from scratch (see gamut-accessibility Focus management) or floating popovers/menus (see gamut-z-index).
---

# Gamut Modal

`Modal` and `Dialog` are the two dialog surfaces in Gamut. Both are thin wrappers around the same `Overlay` → `FocusTrap` → `ModalContainer` stack — `Dialog` is `Modal` pre-configured for a single confirm/cancel action.

Source: `packages/gamut/src/Modals/Modal.tsx` · `Dialog.tsx` · `elements.tsx` · `types.ts` · `packages/gamut/src/Overlay/index.tsx` · `packages/gamut/src/FocusTrap/index.tsx`

See also: [`gamut-accessibility`](../gamut-accessibility/SKILL.md) — universal ARIA/focus rules and the shorter Dialog/Modal summary. [`gamut-z-index`](../gamut-z-index/SKILL.md) — stacking order when something floats above or inside an open Modal.

Storybook: [Molecules / Modals / Modal](https://gamut.codecademy.com/?path=/docs-molecules-modals-modal--docs) · [Molecules / Modals / Dialog](https://gamut.codecademy.com/?path=/docs-molecules-modals-dialog--docs)

---

## Modal vs Dialog — when to use which

| Use                                                                                   | Component |
| ------------------------------------------------------------------------------------- | --------- |
| Single yes/no or confirm/cancel action (delete, discard, leave page)                  | `Dialog`  |
| Free-form content, a multi-step wizard (`views`), or no default action buttons at all | `Modal`   |

`Dialog` always renders `layout="dialog"` (title + content + cancel/confirm row) and always requires `confirmCta`. `Modal` defaults to `layout="standard"` (title + content, no buttons) unless you pass `views`, which switches it to `layout="dialog"` automatically.

---

## Props — `Modal`

Two variants of `ModalProps`, distinguished by whether `views` is passed:

| Prop                 | Type                                                | Default   | Notes                                                                                                                                      |
| -------------------- | --------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `isOpen`             | `boolean`                                           | —         | Required in practice — `Overlay` renders `null` when falsy. Controls mount/unmount; there is no exit animation.                            |
| `onRequestClose`     | `() => void`                                        | —         | Required. Called by Escape, outside-click, and the built-in close button. Must actually flip `isOpen` — the component never closes itself. |
| `title`              | `ReactNode`                                         | —         | Renders as `headingLevel` inside the dialog and feeds the accessible name (see caveat below).                                              |
| `aria-label`         | `string`                                            | —         | Pass this when `title` is not a plain string, or there is no visible title.                                                                |
| `headingLevel`       | `'h1' \| 'h2'`                                      | `'h2'`    | Use `h1` only when the Modal effectively takes over the page.                                                                              |
| `size`               | `'small' \| 'medium' \| 'large' \| 'fluid'`         | `'fluid'` | `fluid` sizes to content; the others are fixed widths (400/540/680px).                                                                     |
| `scrollable`         | `boolean`                                           | `false`   | Enables `overflow-y: auto` on the content area instead of letting the dialog grow.                                                         |
| `closeButtonProps`   | `{ hidden?, ref?, tip?, tipAlignment?, disabled? }` | —         | `tip` defaults to `"Close modal"`. Set `hidden: true` only if you supply your own close control in `children`.                             |
| `containerFocusRef`  | `Ref<HTMLDivElement>`                               | —         | Ref to the dialog's outer container — see Focus management below. Does **not** change what receives initial focus.                         |
| `image`              | `ReactNode`                                         | —         | Rendered above content via `ImageContainer`, sized to match `size`.                                                                        |
| `views`              | `ModalViewProps[]`                                  | —         | Switches to multi-view wizard mode — see below. Mutually exclusive with `children`/`image` at the top level.                               |
| `clickOutsideCloses` | `boolean`                                           | `true`    | Passed through to `Overlay`.                                                                                                               |
| `escapeCloses`       | `boolean`                                           | `true`    | Passed through to `Overlay`.                                                                                                               |
| `shroud`             | `boolean`                                           | `true`    | `Modal` always passes `shroud` to `Overlay`; darkens the backdrop.                                                                         |
| `zIndex`             | `number`                                            | `3`       | Passed through to `Overlay` → `BodyPortal`. See [`gamut-z-index`](../gamut-z-index/SKILL.md) before overriding.                            |

## Props — `Dialog`

Same overlay/focus mechanics as `Modal`, with a fixed single-action layout:

| Prop         | Type                                                    | Notes                                                                            |
| ------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `title`      | `ReactNode`                                             | Required.                                                                        |
| `confirmCta` | `{ children, href?, onClick? }`                         | Required. Rendered as `FillButton`; `onRequestClose` fires before its `onClick`. |
| `cancelCta`  | `{ children, href?, onClick? }`                         | Optional `TextButton`; same close-then-callback order as `confirmCta`.           |
| `variant`    | `Extract<FillButton['variant'], 'primary' \| 'danger'>` | Styles `confirmCta`; use `'danger'` for destructive confirmations.               |
| `size`       | `'small' \| 'medium' \| 'large'`                        | Default `'small'`. No `'fluid'` — `Dialog` is always a fixed size.               |

```tsx
<Dialog
  title="Delete this project?"
  variant="danger"
  confirmCta={{ children: 'Delete', onClick: handleDelete }}
  cancelCta={{ children: 'Cancel' }}
  isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)}
/>
```

---

## Multi-view `Modal` (wizard)

Pass `views: ModalViewProps[]` instead of `children`. Each view gets its own `title`/`children`/`image`, plus a `primaryCta`/`secondaryCta` pair keyed by `actionType`:

| `actionType` (primary) | Behavior                                                          |
| ---------------------- | ----------------------------------------------------------------- |
| `'next'`               | Advances `currentView`; auto-disables on the last view.           |
| `'confirm'`            | Terminal action; `variant` restricted to `'primary' \| 'danger'`. |

| `actionType` (secondary) | Behavior                                                 |
| ------------------------ | -------------------------------------------------------- |
| `'back'`                 | Retreats `currentView`; auto-disables on the first view. |
| `'cancel'`               | Calls `onRequestClose`.                                  |

```tsx
<Modal
  isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)}
  views={[
    {
      title: 'Step 1',
      children: <StepOne />,
      primaryCta: { actionType: 'next', children: 'Next' },
      secondaryCta: { actionType: 'cancel', children: 'Cancel' },
    },
    {
      title: 'Step 2',
      children: <StepTwo />,
      primaryCta: {
        actionType: 'confirm',
        children: 'Finish',
        onClick: handleFinish,
      },
      secondaryCta: { actionType: 'back', children: 'Back' },
    },
  ]}
/>
```

View-level `headingLevel` and `onRequestClose` are not supported per-view — they apply to the whole `Modal`.

---

## Dismiss and focus-trap — how it actually works

`Modal`/`Dialog` render `<Overlay shroud onRequestClose={...}>` around `ModalContainer`. Nothing here is bespoke to Modal — it's the same stack every Gamut overlay uses:

1. **Mount gating** — `Overlay` returns `null` when `isOpen` is falsy. There's no unmount transition; if you need an exit animation, animate your own trigger, not the Modal.
2. **Portal** — content renders into `BodyPortal` (a `ReactDOM.createPortal` to `document.body`), not inline where `<Modal>` is declared. This is why a Modal reliably renders above in-page content regardless of surrounding `overflow`/`position` — but it also means a _second_ portal (a non-inline `PopoverContainer`, `SelectDropdown` menu, or `DatePicker` calendar) opened from inside the Modal is a **separate** sibling portal, not a descendant of the Modal's — see [`gamut-z-index`](../gamut-z-index/SKILL.md) for why that can render behind the Modal.
3. **Focus trap** — `FocusTrap` (`react-focus-on` → `focus-lock`) wraps `ModalContainer` and constrains Tab/Shift+Tab to elements inside it while `active` (mirrors `Overlay`'s `inline` — always active for Modal/Dialog since they're never `inline`).
4. **Initial focus** — `ModalContainer` carries `data-autofocus` and `tabIndex={-1}`. `focus-lock`'s autofocus engine reads that attribute and focuses the container element itself (not the first focusable child) as soon as the trap activates — this is why the dialog's role and label get announced immediately instead of jumping straight to, say, the close button. `containerFocusRef` gives you a ref to that same node for later imperative `.focus()` calls (e.g. re-focusing after an in-modal validation error) — passing it does **not** change what receives focus on open.
5. **Dismiss paths** — Escape (`escapeCloses`, default `true`), click on the shroud outside `ModalContainer` (`clickOutsideCloses`, default `true`), and the built-in close `IconButton` (suppress with `closeButtonProps.hidden`) all call `onRequestClose`. `Dialog`'s `confirmCta`/`cancelCta` call `onRequestClose` first, then their own `onClick`.
6. **Return focus** — `react-focus-on` returns focus to whatever triggered the Modal when it unmounts (default `returnFocus` behavior) — you don't need to store/restore the trigger ref yourself.

```tsx
// wrong — Modal can't close itself; nothing flips isOpen
<Modal isOpen={isOpen} onRequestClose={() => {}} title="Confirm" />;

// correct
const [isOpen, setIsOpen] = useState(false);
<Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} title="Confirm">
  ...
</Modal>;
```

### Caveat — `aria-labelledby` uses the title text directly

`Modal`/`Dialog` set `aria-labelledby={String(title)}` rather than pointing at an element `id`. This works fine for a plain string `title`, but stringifying a non-text `ReactNode` title (icons, nested markup) will not produce a useful accessible name. Pass an explicit `aria-label` on `Modal` whenever `title` isn't plain text (`Dialog`'s `title` has no such escape hatch — keep it plain text).

---

## Stacking order — floating content inside a Modal

`Overlay`'s portal (what `Modal`/`Dialog` render into) defaults to `zIndex={3}`. That default is only safe for what's _outside_ the Modal (it reliably clears a sticky global header, for example) — it says nothing about floating content you put _inside_ the Modal's own `children`/`views`.

Concretely: if content inside a `Modal` opens a **second, non-`inline` portal** — a portalling `SelectDropdown` menu, a non-`inline` `PopoverContainer`/`Menu`, or a `DatePicker` calendar that isn't `inline` — that creates a brand-new sibling `BodyPortal` (default `zIndex={1}`) next to the Modal's own portal (`zIndex={3}`). Because `1 < 3`, the thing you just opened _from inside_ the Modal can render **behind** it.

```tsx
// risky — if SelectDropdown's menu portals, it can render behind this Modal
<Modal isOpen={isOpen} onRequestClose={onClose} title="Edit">
  <SelectDropdown options={options} />
</Modal>

// safer — keep nested floating UI inline, inside the Modal's own stacking context
<Modal isOpen={isOpen} onRequestClose={onClose} title="Actions">
  <PopoverContainer inline isOpen={menuOpen} targetRef={triggerRef}>
    <Menu role="menu">
      <MenuItem onClick={handleAction}>Action</MenuItem>
    </Menu>
  </PopoverContainer>
</Modal>
```

Full component-by-component z-index reference, the `AppWrapper`/`BodyPortal` stacking-tier explanation, and when it's actually safe to add a new value: [`gamut-z-index`](../gamut-z-index/SKILL.md).

---

## Basic usage — single-view `Modal`

```tsx
<Modal
  isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)}
  title="Notification settings"
  size="medium"
>
  <FormGroup htmlFor="email-opt-in" label="Email me updates">
    <Toggle id="email-opt-in" />
  </FormGroup>
</Modal>
```
