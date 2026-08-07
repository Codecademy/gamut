---
name: gamut-z-index
description: Use this skill when something needs to float, stick, or portal above other UI and you're picking or debugging a z-index — Modal/Dialog, Popover/PopoverContainer, Menu, SelectDropdown, DatePicker calendar, Tip (InfoTip/ToolTip/PreviewTip), sticky List/TableHeader rows, DataList EmptyRows, Tabs, or the global header — and deciding whether to reuse an existing value or add a new one. Not for colors, spacing, or other non-stacking tokens.
---

# Gamut z-index

There is no single documented z-index scale. `DESIGN.md` names exactly one token — `headerZ`. Everything else that floats, sticks, or portals is a small ad hoc integer (0–5) baked into component internals, split across two isolated stacking tiers by `AppWrapper` and `BodyPortal`. Read this before reaching for a bigger number.

Source: `packages/gamut-styles/src/variables/elements.ts` · `packages/gamut/src/AppWrapper/index.tsx` · `packages/gamut/src/BodyPortal/index.tsx` · `packages/gamut/src/Overlay/index.tsx` · `packages/gamut/src/Popover/elements.tsx` · `packages/gamut/src/PopoverContainer/PopoverContainer.tsx` · `packages/gamut/src/Toaster/index.tsx`

See also: [`gamut-modal`](../gamut-modal/SKILL.md) — Modal/Dialog composition (this skill covers what happens when something else floats above or inside one). [`gamut-menu`](../gamut-menu/SKILL.md) — floating menus via `PopoverContainer`. [`gamut-datalist`](../gamut-datalist/SKILL.md) / [`gamut-datatable`](../gamut-datatable/SKILL.md) — sticky headers, `EmptyRows`, row-menu-opens-Modal pattern.

---

## The only real token: `headerZ`

| Token     | Value | Use                |
| --------- | ----- | ------------------ |
| `headerZ` | `15`  | Global page header |

Defined in `packages/gamut-styles/src/variables/elements.ts`; access it via `theme.elements.headerZ` (object styles / `css()`) or `themed('elements.headerZ')` (Emotion template literals) — never hardcode `15`. `SkipToContent`'s focus-revealed link uses `headerZ + 1` (`16`) so it can clear the header once focused (`packages/gamut/src/SkipToContent/index.tsx`) — that's the only other place `headerZ` is referenced.

Everything below this line is **not** a token — it's a component default you can read in source, not a name you can import.

---

## Two stacking tiers, not one scale

**Tier 1 — in-page**, inside `AppWrapper`. `AppWrapper` (`packages/gamut/src/AppWrapper/index.tsx`) wraps the app root in `position: relative; z-index: 1` specifically to "safely reset the stacking context" — its own comment warns: **do not change its `position`/`z-index` or extend it with overrides to those properties.** Every non-portalled component (sticky List headers, inline Tips, Tabs, inline Popovers, SelectDropdown menus, …) only has to out-rank its _local_ siblings inside this one context. `headerZ` (15) sits comfortably above all of them (the highest non-portalled value in the table below is 5).

**Tier 2 — body portals**, via `BodyPortal` (`ReactDOM.createPortal(..., document.body)`). `Overlay` (used by `Modal`/`Dialog`), floating `Tip` (`ToolTip`/`InfoTip`/`PreviewTip` with `placement="floating"`, via `Popover`), any non-`inline` `PopoverContainer` (floating menus, `DatePicker` calendar, portalling `SelectDropdown` usage), and `Toaster` all render as a **sibling of `AppWrapper`**, not a descendant of it. Their z-index only has to out-rank _other portals_ — it never has to clear `headerZ`, which is why a plain `Modal` reliably covers a sticky global header without needing `zIndex > 15`.

`BodyPortal`'s default (`1`) is called out in its own source comment as **"a TEMPORARY stopgap solution to avoid zIndex conflicts... will be reworked with GM-624"** — treat every Tier 2 number here as fragile plumbing, not settled design intent. As of this writing, the current Tier 2 ordering is:

```
Overlay (3) < Toaster (4) < Popover / PopoverContainer, portalled (5, tied)
```

This isn't derived from any scale — it's a hand-picked, hardcoded stopgap (each override is marked `// TEMPORARY: ... until GM-624 lands a shared z-index scale`) chosen to satisfy exactly the constraints known at patch time: `Toaster` must clear `Overlay` (a toast should never be hidden by a modal/flyout behind it), and `Popover`/`PopoverContainer` must clear `Toaster` (a tooltip or menu — including a toast's own close-button tooltip — must never render behind the toast it belongs to) while staying **tied with each other**, not just above it, because a `Popover`-based tip and a `PopoverContainer`-based menu can be open and overlapping at the same time, and their relative order needs to fall back to DOM mount order (whichever opened later paints on top) rather than a fixed winner. Any new Tier 2 consumer needs a deliberate, explicit `zIndex` fit into this chain — the plain `BodyPortal` default of `1` is now strictly _below_ everything in active use, so silently relying on the default (as `Popover`, `PopoverContainer`, and `Toaster` used to) will render behind an open `Overlay`.

---

## Component reference

| Component / element                                                 | Default z-index                                                                     | Tier                                                     | Override                                                                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Global header (`headerZ`)                                           | `15`                                                                                | 1                                                        | Token — `theme.elements.headerZ`                                                                                      |
| `SkipToContent`                                                     | `headerZ + 1` = `16`                                                                | 1                                                        | Computed, not a prop                                                                                                  |
| `Overlay` (used by `Modal`, `Dialog`)                               | `3`                                                                                 | 2 (via `BodyPortal`)                                     | `zIndex` prop — Modal/Dialog pass it straight through                                                                 |
| `BodyPortal` (default, e.g. non-`inline` `PopoverContainer`)        | `1`                                                                                 | 2                                                        | `zIndex` prop on `BodyPortal` itself — not exposed by `PopoverContainer`                                              |
| `PopoverContainer` (`inline`)                                       | `5`                                                                                 | 1 (renders in place)                                     | Fixed — not a prop                                                                                                    |
| `PopoverContainer` (portalled, not `inline`)                        | `'initial'` → inherits `BodyPortal`'s `1`                                           | 2                                                        | Not exposed                                                                                                           |
| `SelectDropdown` control                                            | `3`                                                                                 | 1                                                        | Not a prop                                                                                                            |
| `SelectDropdown` menu                                               | `2`                                                                                 | 1 (or 2 if portalled — same rules as `PopoverContainer`) | `zIndex` prop (`SharedProps.zIndex`)                                                                                  |
| `DatePicker` calendar                                               | Same as `PopoverContainer` (`5` inline / `1` portalled)                             | same                                                     | Same as `PopoverContainer`                                                                                            |
| `Menu` item (focus-outline layer)                                   | `1` / `-1`                                                                          | 1, local only                                            | Not a prop — `Menu` doesn't manage its own float; wrap in `PopoverContainer` ([`gamut-menu`](../gamut-menu/SKILL.md)) |
| Tip (`InfoTip`/`ToolTip`/`PreviewTip`), `placement="inline"`        | `1` (body), `auto` (content), `zIndex - 2` or `-1` (`PreviewTip` decorative shadow) | 1, local only                                            | `zIndex` prop — **not available when `placement="floating"`** (typed `zIndex?: never`)                                |
| `List` / `TableHeader` sticky header row                            | `2`                                                                                 | 1                                                        | Not a prop                                                                                                            |
| `List` sticky first column                                          | `1` (cell), `-1` (decorative pseudo-elements)                                       | 1                                                        | Not a prop                                                                                                            |
| `DataList` `EmptyRows` (and the pattern in a custom `emptyMessage`) | `1`                                                                                 | 1                                                        | Only by copying the pattern in your own `emptyMessage` — no prop                                                      |
| `Tabs` active-tab / underline layer                                 | `0` (focus outline), `1` (tab button)                                               | 1, local only                                            | Not a prop — purely internal to the tab's own focus-ring stacking                                                     |

---

## Reusing an existing value vs. adding a new one

1. **Reach for an existing prop first.** `SelectDropdown` (`zIndex` on the dropdown menu) and inline-placement `Tip` (`zIndex` on the tip body) are the two components actually built to be tuned this way — use them instead of wrapping in an extra `Box` with a literal `zIndex`.
2. **`Overlay`'s `zIndex` (default `3`, passed through by `Modal`/`Dialog`) is explicitly documented as overridable** ("Can be overridden when needed for custom stacking orders") — this is the one you're most likely to legitimately need to touch, e.g. layering two independent `Overlay`-based surfaces (a `Toast` over a `Modal`).
3. **Never touch `AppWrapper`'s `position`/`z-index`.** Its own source comment forbids it — it's the seam that makes Tier 1 predictable for everything else in this table.
4. **If nothing existing fits**, decide which tier the new element belongs to first (does it portal to `document.body`, or does it render in place?), then place it relative to the nearest documented neighbor above rather than picking a round number in isolation (e.g. "must clear a sticky `List` header (2)" → something above `2`, safely below `headerZ` if it's Tier 1).
5. **Only promote a number to a named token** (next to `headerZ` in `gamut-styles/src/variables/elements.ts`, documented in `DESIGN.md`) when the value must be shared across products/themes — not for a one-off layout tweak. A one-off stays a local `zIndex` prop or style.

---

## Layering order against Modal

`Modal`/`Dialog`'s `Overlay` portal defaults to `zIndex={3}` — Tier 2. That's _why_ a `Modal` reliably sits above the sticky global header: `headerZ` (15) lives in Tier 1, the `Modal` lives in Tier 2, and the two tiers never compete.

What this does **not** protect against: opening a **second, non-`inline` portal from inside an already-open `Modal`** — a portalling `SelectDropdown` menu, a non-`inline` `PopoverContainer`/`Menu`, or a `DatePicker` calendar that isn't `inline`. That opens a **new sibling `BodyPortal`** (default `zIndex={1}`) alongside the Modal's own portal (`zIndex={3}`). Because `1 < 3`, the thing you just opened from inside the Modal can render **behind** it.

**Fix:**

- Keep nested floating elements `inline` wherever the API allows it — `PopoverContainer`, and anything built on it (`Menu`, `DatePicker`), supports `inline`, which renders in place inside the Modal's own Tier-2 stacking context instead of opening a second portal. Inline `PopoverContainer`'s fixed `zIndex={5}` already clears everything else inside a Modal.
- If a component can't render `inline` and exposes a `zIndex` prop (`SelectDropdown`), raise it above whatever it's nested in — its own default of `2` for the dropdown menu is not automatically aware of the Modal it's inside.

This is exactly why `gamut-datatable`'s row-menu pattern works: `Menu` inside an `inline` `PopoverContainer`, opening a `Modal` from a menu item, renders the `Modal` at `zIndex={3}` "above the table header" — the popover menu stays inline (Tier 1, inside the table), so it never has to fight the Modal's own portal.

```tsx
// risky — SelectDropdown's floating menu (zIndex 2, Tier 1 default) opened inside a Modal
// (Overlay's own content is Tier 2, but the SelectDropdown menu still needs to clear
// whatever else is stacked around it inside the Modal — don't assume the Modal's zIndex helps it)
<Modal isOpen={isOpen} onRequestClose={onClose} title="Edit">
  <SelectDropdown options={options} />
</Modal>

// safer — nested floating UI stays inline
<Modal isOpen={isOpen} onRequestClose={onClose} title="Actions">
  <PopoverContainer inline isOpen={menuOpen} targetRef={triggerRef}>
    <Menu role="menu">
      <MenuItem onClick={handleAction}>Action</MenuItem>
    </Menu>
  </PopoverContainer>
</Modal>
```
