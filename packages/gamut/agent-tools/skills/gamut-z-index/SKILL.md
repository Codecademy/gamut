---
name: gamut-z-index
description: Use this skill when something needs to float, stick, or portal above other UI and you're picking or debugging a z-index — Modal/Dialog, Popover/PopoverContainer, Menu, SelectDropdown, DatePicker calendar, Tip (InfoTip/ToolTip/PreviewTip), sticky List/TableHeader rows, DataList EmptyRows, Tabs, or the global header — and deciding whether to reuse an existing value or add a new one. Not for colors, spacing, or other non-stacking tokens.
---

# Gamut z-index

Gamut coordinates stacking order through one semantic scale, `zIndexes`, exported from `@codecademy/gamut-styles`. Every `zIndex` in Gamut should reference a token from this scale rather than a magic number — a repo-wide eslint rule, `gamut/no-raw-z-index`, enforces it.

Source: `packages/gamut-styles/src/variables/zIndexes.ts` (scale + `ZIndexType`) · `packages/gamut-styles/src/variance/config.ts` (`zIndex` system prop config) · `packages/eslint-plugin-gamut/src/no-raw-z-index.ts` (lint rule).

See also: [`gamut-system-props`](../gamut-system-props/SKILL.md) (`system.positioning`, the rest of the `zIndex` prop group). [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) (`css()`, `variant()`, `states()`). [`gamut-modal`](../gamut-modal/SKILL.md) — Modal/Dialog composition (this skill covers what happens when something else floats above or inside one). [`gamut-menu`](../gamut-menu/SKILL.md) — floating menus via `PopoverContainer`. [`gamut-datalist`](../gamut-datalist/SKILL.md) / [`gamut-datatable`](../gamut-datatable/SKILL.md) — sticky headers, `EmptyRows`, row-menu-opens-Modal pattern. Storybook: [Foundations / Z-Index](https://gamut.codecademy.com/?path=/docs-foundations-z-index--page), [Meta / ESLint rules](https://gamut.codecademy.com/?path=/docs-meta-eslint-rules--page).

---

## The scale

Tokens are spaced by 100, low to high, leaving room for in-between escape-hatch numbers. This is **one flat scale** shared by both in-page content and portaled overlays — there is no separate "portal tier"; a `modal` (500) always outranks an `appBar` (300) numerically, wherever each happens to render in the DOM.

| Token        | Value | Use for                                                                                                           |
| ------------ | ----- | ----------------------------------------------------------------------------------------------------------------- |
| `underlay`   | -100  | Decorative layer behind content (underlines, backdrops, shadows)                                                  |
| `base`       | 0     | Ground layer — local stacking context without lifting above siblings                                              |
| `foreground` | 100   | Raised in-flow layer above `underlay`/siblings, below all portal overlays; also sticky headers                    |
| `floating`   | 200   | Portal floor — `BodyPortal` default; persistent floating page furniture (AI chat launcher, help bubble)           |
| `appBar`     | 300   | Global app header/nav bar (aliased by the legacy `elements.headerZ` constant)                                     |
| `flyout`     | 400   | Portaled side panel (`Flyout` = `Drawer` inside `Overlay`)                                                        |
| `modal`      | 500   | `Overlay`, `Modal`, `Dialog` (share one portal primitive)                                                         |
| `popover`    | 600   | Portal-mode `Popover`, the portaled `SelectDropdown` menu/control, and portalled `PopoverContainer` — above modal |
| `topmost`    | 700   | Top-most transient overlays: floating tooltips, toasts/notifications — nothing in Gamut sits above this           |

**Talk to web platform before adding a new token to the scale.** Third-party widgets (injected marketing/chat scripts) set their own z-index and are outside Gamut's control — `topmost` is the ceiling for anything Gamut owns.

`AppWrapper` (`packages/gamut/src/AppWrapper/index.tsx`) still hardcodes `position: relative; z-index: 1` in a plain CSS template literal, outside the scale — its own source comment forbids changing it ("do not change the values of position or z-index here"). This is a structural implementation detail (it resets the stacking context for the app root), not a token; `1` sits below every real token except `base` (0), so it never competes with anything in the table above.

---

## Usage

### `zIndex` system prop

Available on `Box`/`FlexBox`/`GridBox` and any styled component composing `system.positioning`. Accepts, in order of preference:

1. A token name: `zIndex="popover"`
2. The scale's numeric value: `zIndex={zIndexes.popover}`
3. Arithmetic on a token, for a deliberate offset within a layer: `zIndex={zIndexes.foreground - 2}`
4. A raw number as an escape hatch for a genuine one-off: `zIndex={550}` — leave a comment justifying it

```tsx
<Box position="absolute" zIndex="popover">
  …
</Box>
```

### In `css()` / `variant()` / `states()`

Token names resolve the same way inside these — including in nested pseudo-selector objects — because they share the same scale-aware property config as the `zIndex` prop:

```tsx
import { css, variant } from '@codecademy/gamut-styles';

const styles = css({
  position: 'absolute',
  zIndex: 'popover',
  '&::before': {
    content: '""',
    zIndex: 'underlay',
  },
});

const cardVariants = variant({
  base: { zIndex: 'base' },
  variants: { raised: { zIndex: 'foreground' } },
});
```

### Typing a component's `zIndex` prop

Use `ZIndexType` (a token name, a raw number, or a CSS global like `'inherit'`) instead of `number` so consumers can pass a token:

```tsx
import { ZIndexType } from '@codecademy/gamut-styles';

export interface OverlayProps {
  zIndex?: ZIndexType;
}
```

---

## Component reference

Every component below composes onto the one scale above — no separate tiers to reason about.

| Component / element                                            | Default                                                                                                                                                    | Notes                                                                                                                                     |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Global header (`elements.headerZ`)                             | `zIndexes.appBar` (300)                                                                                                                                    | Legacy alias — new code should reference `zIndexes.appBar` directly.                                                                      |
| `SkipToContent`                                                | `zIndexes.appBar + 1`                                                                                                                                      | Computed, not a prop — clears the header once focused.                                                                                    |
| `BodyPortal`                                                   | `"floating"` (200)                                                                                                                                         | Base portal primitive several others build on.                                                                                            |
| `Overlay` (→ `Modal`, `Dialog`)                                | `"modal"` (500)                                                                                                                                            | `zIndex` prop, passed straight through by `Modal`/`Dialog`.                                                                               |
| `Flyout`                                                       | `"flyout"` (400)                                                                                                                                           | Passes `zIndex="flyout"` to its internal `Overlay` — sits below `modal`.                                                                  |
| `PopoverContainer`, `Popover` (portalled)                      | `"popover"` (600)                                                                                                                                          | Portals via `<BodyPortal zIndex="popover">` — already clears `modal`.                                                                     |
| `PopoverContainer` (`inline`)                                  | `5` (raw, pre-scale legacy value)                                                                                                                          | Renders in place inside the parent's own stacking context instead of portaling; not yet migrated to a token — flag if touching this file. |
| `SelectDropdown` control and menu                              | `"popover"` (600)                                                                                                                                          | Menu portals via `react-select`'s `menuPortal`, portaled to `document.body`; both default through `ZIndexType`.                           |
| `DatePicker` calendar                                          | Same as `PopoverContainer`                                                                                                                                 | Built on `PopoverContainer`; `inline` by default.                                                                                         |
| `Toaster`                                                      | `"topmost"` (700)                                                                                                                                          | Always clears everything else Gamut owns.                                                                                                 |
| Tip (`InfoTip`/`ToolTip`/`PreviewTip`), `placement="inline"`   | `"foreground"` (body); `PreviewTip`'s decorative shadow sits 2 below whatever the body resolves to, falling back to `"underlay"` if no override was passed | `zIndex` prop.                                                                                                                            |
| `List`/`TableHeader` sticky header row, `DataList` `EmptyRows` | `"foreground"`                                                                                                                                             | Sticky in-flow layer, not a portal.                                                                                                       |
| `List` sticky first column                                     | `"foreground"` (cell), `"underlay"` (decorative pseudo-elements)                                                                                           | Not a prop.                                                                                                                               |
| `Menu` item (focus-outline layer)                              | `"foreground"` / `"underlay"`                                                                                                                              | Local only — `Menu` doesn't manage its own float; wrap in `PopoverContainer` ([`gamut-menu`](../gamut-menu/SKILL.md)).                    |
| `Tabs` active-tab / underline layer                            | `"base"` (focus outline), `"foreground"` (tab button)                                                                                                      | Local to the tab's own focus-ring stacking.                                                                                               |

One known gap: `PopoverContainer`'s `inline` path still has a raw `zIndex={inline ? 5 : 'initial'}` (`packages/gamut/src/PopoverContainer/PopoverContainer.tsx`) that predates this scale and wasn't part of the migration — the eslint rule doesn't currently catch it because the literal is nested inside a ternary. Treat `5` there as "same idea as `foreground`," not a token you can import.

---

## Reusing an existing value vs. adding a new one

1. **Reach for the token first.** `zIndex="modal"`, `zIndex="popover"`, etc. — the name documents intent far better than a number, and most floating/portal components already default to the right one.
2. **Component `zIndex` props are the intended override point.** `Overlay`/`Modal`/`Dialog`, `Flyout`, `SelectDropdown`'s menu, and inline-placement `Tip` all accept a `zIndex` prop for a deliberate custom stacking order — use them instead of wrapping in an extra `Box` with a literal `zIndex`.
3. **Never touch `AppWrapper`'s `position`/`z-index`.** Its own source comment forbids it.
4. **If nothing existing fits**, pick the nearest token and offset from it (`zIndexes.foreground - 2`), or use a raw number with a justifying comment and an inline eslint-disable. Only promote a number to a named scale token when the value must be shared across products/themes — talk to web platform first.

---

## Nesting floating content inside a Modal

Before this scale existed, `Overlay` defaulted to a raw `zIndex={3}` and `BodyPortal` defaulted to `zIndex={1}` — so a _second_, non-`inline` portal opened from inside an already-open Modal (a portalling `SelectDropdown` menu, a non-`inline` `PopoverContainer`/`Menu`, a non-`inline` `DatePicker` calendar) created a new sibling `BodyPortal` at `1`, which rendered **behind** the Modal's own portal at `3`. That's the bug this scale was built to fix.

With the scale, `Overlay`/`Modal` default to `"modal"` (500) and the popover-family portals (`PopoverContainer`, `Popover`, `SelectDropdown`'s menu) default to `"popover"` (600) — 600 > 500, so nested floating UI now clears an open Modal **by default**, with no extra work:

```tsx
// fine by default now — SelectDropdown's menu portals at "popover" (600), above the Modal's "modal" (500)
<Modal isOpen={isOpen} onRequestClose={onClose} title="Edit">
  <SelectDropdown options={options} />
</Modal>
```

`inline` is still worth using on `PopoverContainer`/`Menu`/`DatePicker` for layout/positioning reasons (it renders in place instead of opening a portal), but it is **no longer required purely to avoid a stacking bug** — don't cite "it'll render behind the Modal" as the reason to force `inline` anymore.

The one case that still needs attention: if you deliberately override a nested component's `zIndex` to something below `"modal"` (500), you've reintroduced the old bug yourself — keep overrides at or above the layer they need to clear.

This is exactly why `gamut-datatable`'s row-menu pattern works: `Menu` inside an `inline` `PopoverContainer`, opening a `Modal` from a menu item, renders the `Modal` at `"modal"` — the popover menu stays inline (rendering in the table's own stacking context), so it never has to compete with the Modal's portal.
