# Buttons

**There is no generic `Button` component in Gamut.** Always use the specific button variant that matches the design intent.

## Component selection

| Component      | Use when                                                         | Default `variant`                         |
| -------------- | ---------------------------------------------------------------- | ----------------------------------------- |
| `FillButton`   | Primary / high-emphasis actions                                  | `primary`                                 |
| `StrokeButton` | Secondary / outlined actions                                     | `primary` (often `secondary` in practice) |
| `TextButton`   | Tertiary / low-emphasis, inline actions                          | `primary`                                 |
| `IconButton`   | Icon-only; requires `icon` prop + `tip` for accessibility        | `secondary`                               |
| `CTAButton`    | Marketing / high-visibility CTA only — never standard UI actions | `primary` (only option)                   |

## `variant` prop

Shared by `FillButton`, `StrokeButton`, `TextButton`, `IconButton`. `CTAButton` only supports `primary`.

| `variant`   | Typical use                    |
| ----------- | ------------------------------ |
| `primary`   | Submit, main CTA               |
| `secondary` | Close, cancel, low priority    |
| `danger`    | Destructive actions            |
| `interface` | Controls styled like UI chrome |

```jsx
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
| `icon`         | icon component                                        | Leading or trailing icon                         |
| `iconPosition` | `"left" \| "right"`                                   | Defaults to left                                 |
| `disabled`     | boolean                                               | Disabled state styling                           |
| `href`         | string                                                | Renders as `<a>` tag                             |
| `tip`          | string                                                | Required on `IconButton` (tooltip + hover label) |

## States

Hover, active, and disabled colors are handled by the component. Do not override state colors with `color`/`bg` props.

## Accessibility — `disabled` vs `aria-disabled`

| Situation                                                       | Use                                                | Why                                                                                                                                   |
| --------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Button should not be activatable (default)                      | `disabled` prop                                    | Renders native `disabled` on `<button>`; removed from tab order; correct for most forms and actions                                   |
| Disabled button with a tooltip that must stay readable on focus | `aria-disabled` only — do not also pass `disabled` | Native `disabled` blocks keyboard focus, so the tooltip cannot be reached. Gamut disabled styles also match `[aria-disabled='true']`. |

```jsx
// Default — not interactive
<FillButton disabled>Submit</FillButton>

// Disabled but focusable (e.g. wrapped in ToolTip explaining why)
<ToolTip id="why-disabled" info="Complete the lesson first">
  <FillButton aria-describedby="why-disabled" aria-disabled>
    Submit
  </FillButton>
</ToolTip>
```

- `href` + `disabled`: internally drops `href` and renders `<button disabled>` — link-style buttons cannot stay anchors while disabled.
- `IconButton`: provide an accessible name via `tip` (used as `aria-label` when `aria-label` is omitted).

## Focus management — buttons with ToolTip

When a button uses `placement="floating"` and the click doesn't naturally move DOM focus elsewhere, the tooltip may linger after a keyboard-triggered click. See `components/tooltips.md` for when to call `.blur()`.

## Rules

- **Never import `Button` from `@codecademy/gamut`** — it does not exist.
- **Match the variant to the source intent.** Filled buttons map to `FillButton`, outlined to `StrokeButton`, text-only to `TextButton`, icon-only to `IconButton`.
- **`IconButton` requires `tip` for accessibility.** Always pass a descriptive `tip` prop so screen readers can announce the button's purpose.
- **Never set the `mode` prop on buttons** — they inherit color context from parent wrappers.
- Use `FillButton` for primary actions and `StrokeButton` for secondary — do not use both at equal weight on the same screen.
- Reserve `CTAButton` for marketing/high-visibility promotions; do not use it for standard UI actions.
- Do not set `color`, `bg`, or hex on stock button components — see `overview-styling.md`.
