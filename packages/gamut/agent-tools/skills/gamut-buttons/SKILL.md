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

## Rules

- Use `FillButton` for primary actions and `StrokeButton` for secondary — do not use both at equal weight on the same screen.
- Reserve `CTAButton` for marketing / high-visibility promotions; do not use it for standard UI actions.
- Avoid placing buttons in the wrong color-mode context (e.g. light-mode buttons on a navy band without `<Background>`). See [`gamut-color-mode`](../gamut-color-mode/SKILL.md).
- Every interactive `Card` wrapped in `<Anchor>` should have `isInteractive` — not a button inside.
- Do not set `color`, `bg`, or hex on stock button components. For custom styled controls, follow [`gamut-color-mode`](../gamut-color-mode/SKILL.md) and `gamut-styles` utilities — do not import internal `ButtonBase`.
