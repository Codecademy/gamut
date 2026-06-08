---
name: gamut-buttons
description: Use this skill when choosing Gamut button atoms (FillButton, StrokeButton, TextButton, IconButton, CTAButton), variant and size props, or disabled vs aria-disabled patterns — not for custom styled controls (see gamut-color-mode and gamut-style-utilities).
---

# Gamut Buttons

Which button component and which `variant` to use. Colors are wired inside each atom — consumers do not pass `color`, `bg`, hex, or semantic token names on stock buttons.

See also: [`gamut-color-mode`](../gamut-color-mode/SKILL.md) — semantic tokens for custom styled controls only, not stock button atoms; ColorMode / `<Background>` when placing buttons on colored surfaces. [`gamut-accessibility`](../gamut-accessibility/SKILL.md) — universal action and naming rules.

Storybook:

- [Atoms / Buttons / Button](https://gamut.codecademy.com/?path=/docs-atoms-buttons-button--docs) — variants, light/dark examples
- [FillButton](https://gamut.codecademy.com/?path=/docs-atoms-buttons-fillbutton--docs) · [StrokeButton](https://gamut.codecademy.com/?path=/docs-atoms-buttons-strokebutton--docs) · [TextButton](https://gamut.codecademy.com/?path=/docs-atoms-buttons-textbutton--docs) · [IconButton](https://gamut.codecademy.com/?path=/docs-atoms-buttons-iconbutton--docs) · [CTAButton](https://gamut.codecademy.com/?path=/docs-atoms-buttons-ctabutton--docs)
- [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) — semantic tokens for custom `css` / `variant` / `states`, not prebuilt atoms
- [UX Writing / Component guidelines / Buttons](https://gamut.codecademy.com/?path=/docs-ux-writing-component-guidelines-buttons--docs) — label copy

## Component selection

| Component      | Use for                                       | Default `variant`                                |
| -------------- | --------------------------------------------- | ------------------------------------------------ |
| `FillButton`   | Primary / high-emphasis actions               | `primary`                                        |
| `StrokeButton` | Secondary / outlined actions                  | `primary` (often pass `secondary` per Storybook) |
| `TextButton`   | Low-emphasis, inline actions                  | `primary`                                        |
| `IconButton`   | Icon-only; requires `tip` and accessible name | `secondary`                                      |
| `CTAButton`    | Marketing / high-visibility CTA only          | `primary` (only option)                          |

## `variant` prop

Shared by `FillButton`, `StrokeButton`, `TextButton`, and `IconButton`. `CTAButton` only supports `primary`.

| `variant`   | Typical use                    |
| ----------- | ------------------------------ |
| `primary`   | Submit, main CTA               |
| `secondary` | Close, cancel, low priority    |
| `danger`    | Destructive actions            |
| `interface` | Controls styled like UI chrome |

```tsx
<FillButton variant="primary">Submit</FillButton>
<StrokeButton variant="secondary">Cancel</StrokeButton>
<IconButton icon={SearchIcon} tip="Search" variant="secondary" />
<CTAButton>Try Pro for free</CTAButton>
```

## Sizes

`small` | `normal` (default) | `large`

## Key props

| Prop           | Type                                                  | Effect                                           |
| -------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `variant`      | `"primary" \| "secondary" \| "danger" \| "interface"` | Color emphasis (see table above)                 |
| `size`         | `"small" \| "normal" \| "large"`                      | Padding and font size                            |
| `icon`         | Icon component                                        | Leading or trailing icon (Fill, Stroke, Text)    |
| `iconPosition` | `"left" \| "right"`                                   | Defaults to left                                 |
| `disabled`     | boolean                                               | Disabled state styling                           |
| `href`         | string                                                | Renders as `<a>` tag                             |
| `tip`          | string                                                | Required on `IconButton` (tooltip + hover label) |

## States

Hover, active, and disabled colors are handled by the component. Do not override state colors with `color` / `bg` props.

## Accessibility — `disabled` vs `aria-disabled`

| Situation                                                       | Use                                                | Why                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button should not be activatable (default)                      | `disabled` prop                                    | Renders native `disabled` on `<button>`; removed from tab order; correct for most forms and actions                                                                                                                                                 |
| Disabled button with a tooltip that must stay readable on focus | `aria-disabled` only — do not also pass `disabled` | Native `disabled` blocks keyboard focus, so the tooltip cannot be reached. Gamut disabled styles also match `[aria-disabled='true']`. See [ToolTip — With a disabled Button](https://gamut.codecademy.com/?path=/docs-molecules-tips-tooltip--docs) |

```tsx
// Default — not interactive
<FillButton disabled>Submit</FillButton>

// Disabled but focusable (e.g. wrapped in ToolTip explaining why)
<ToolTip id="why-disabled" info="Complete the lesson first">
  <FillButton aria-describedby="why-disabled" aria-disabled>
    Submit
  </FillButton>
</ToolTip>
```

- `href` + `disabled`: `ButtonBase` (internal) drops `href` and renders a `<button disabled>` — link-style buttons cannot stay anchors while disabled.
- `IconButton`: provide an accessible name via `tip` (used as `aria-label` when `aria-label` is omitted). See ToolTip / IconButton Storybook pages.
- `ButtonBase` is not exported from `@codecademy/gamut` (only the `ButtonBaseElements` type is). Prefer stock atoms; custom button styling belongs in Gamut itself or via `css` / `variant` from `gamut-styles`, not by importing `ButtonBase`.

## Focus management — buttons with ToolTip

`ToolTip` opens on **hover or focus** and closes when neither is active. The two rendering paths behave differently:

- **Inline (default):** CSS-only via `:hover` and `:focus-within` on the wrapper. No JS involved; tooltip visibility tracks pointer and focus state automatically.
- **Floating (`placement="floating"`):** JS-driven. Tracks hover (`mouseenter`/`mouseleave`) and focus (`focus`/`blur`) separately with a small delay on each. Escape key always closes the tooltip by calling `.blur()` on the trigger automatically.

**When the tooltip lingers after a click:** This only occurs with `FloatingTip` when the button was **keyboard-focused before the click**. `FloatingTip` keeps an `isFocused` flag; while that flag is true, `mouseleave` does not close the tooltip. If the click action does not naturally move DOM focus elsewhere, the button stays focused and the tooltip stays open.

Mouse-initiated clicks do not have this problem: `TargetContainer` has `onMouseDown={(e) => e.preventDefault()}` which prevents the button from gaining focus via mouse, so `isFocused` stays `false` and the tooltip closes when the pointer moves away.

**Pattern — explicit blur when focus won't move naturally:**

```tsx
const handleClick = () => {
  (document.activeElement as HTMLElement)?.blur();
  openPanel();
};

<IconButton icon={SettingsIcon} tip="Settings" onClick={handleClick} />;
```

Or with a ref:

```tsx
const ref = useRef<HTMLButtonElement>(null);

<IconButton
  ref={ref}
  icon={SettingsIcon}
  tip="Settings"
  onClick={() => {
    ref.current?.blur();
    openPanel();
  }}
/>;
```

**When to apply (floating placement, keyboard-triggered clicks only):**

- Click opens a modal, drawer, or panel that does NOT auto-focus an element inside it
- Click triggers an in-place state toggle (e.g. show/hide inline editor)
- Click dispatches a mutation with no focus side-effect

**When NOT needed:**

- Click opens a modal with a proper focus trap — the trap moves focus automatically, blurring the button
- Click navigates to a new route — component unmounts
- Click reveals a `Popover` or `FloatingTip`-managed dropdown — focus is moved by that system
- Tooltip uses the default inline (non-floating) placement — CSS handles visibility, no lingering issue
- User pressed Escape — built-in `escapeKeyPressHandler` already calls `.blur()`

Call `.blur()` synchronously before the action; this keeps tooltip dismissal atomic with the user interaction.

## Rules

- Use `FillButton` for primary actions and `StrokeButton` for secondary — do not use both at equal weight on the same screen.
- Reserve `CTAButton` for marketing / high-visibility promotions; do not use it for standard UI actions.
- Avoid placing buttons in the wrong color-mode context (e.g. light-mode buttons on a navy band without `<Background>`). See [`gamut-color-mode`](../gamut-color-mode/SKILL.md).
- Every interactive `Card` wrapped in `<Anchor>` should have `isInteractive` — not a button inside.
- Do not set `color`, `bg`, or hex on stock button components. For custom styled controls, follow [`gamut-color-mode`](../gamut-color-mode/SKILL.md) and `gamut-styles` utilities — do not import internal `ButtonBase`.
