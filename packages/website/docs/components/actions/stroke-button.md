---
sidebar_position: 2
---

# StrokeButton

An outlined, medium-emphasis button for a secondary action alongside a
primary one.

**Status:** Stable · **Source:** `packages/gamut/src/Button/StrokeButton.tsx`

## Usage

Reach for `StrokeButton` for an action that matters but shouldn't compete
visually with the page's primary action — "Cancel" next to "Save", or a
secondary option like "Preview" next to "Publish".

### Best practices

- Pair it with exactly one [FillButton](./fill-button.md) rather than
  using several `StrokeButton`s side by side for competing primary
  actions.
- Keep the label as short and outcome-focused as a `FillButton`'s — the
  visual weight differs, not the writing style.

### When NOT to use

- This is the single most important action on the view — use
  [FillButton](./fill-button.md).
- This is a low-emphasis, tertiary action like "Cancel" or "Learn more" —
  use [TextButton](./text-button.md).
- You need an icon-only control with no label — use `IconButton` instead.
- The control just navigates with no side effect — use `Anchor` instead.

### Anatomy

```text
┌────────────────────────┐
│  [icon]  Label  [icon]  │
└────────────────────────┘
```

Same anatomy as [FillButton](./fill-button.md#anatomy) — a bordered,
transparent-background button that fills in with color on hover/press.

## Patterns

### Pair with a FillButton for a two-action dialog footer

```jsx live
function DialogFooter() {
  const [status, setStatus] = React.useState('');

  return (
    <>
      <StrokeButton
        onClick={() => setStatus('Cancelled')}
        style={{ marginInlineEnd: 8 }}
      >
        Cancel
      </StrokeButton>
      <FillButton onClick={() => setStatus('Saved')}>Save</FillButton>
      {status && <p>{status}</p>}
    </>
  );
}
```

## Variants

Every `variant` value:

```jsx live
<StrokeButton variant="primary">Primary</StrokeButton>
```

```jsx live
<StrokeButton variant="secondary">Secondary</StrokeButton>
```

```jsx live
<StrokeButton variant="danger">Danger</StrokeButton>
```

```jsx live
<StrokeButton variant="interface">Interface</StrokeButton>
```

Every `size` value:

```jsx live
<StrokeButton size="small">Small</StrokeButton>
```

```jsx live
<StrokeButton size="normal">Normal</StrokeButton>
```

```jsx live
<StrokeButton size="large">Large</StrokeButton>
```

With an icon:

```jsx live
<StrokeButton icon={MiniArrowRightIcon} iconPosition="right">
  Preview
</StrokeButton>
```

Disabled:

```jsx live
<StrokeButton disabled>Disabled</StrokeButton>
```

## Accessibility

Identical mechanics to [FillButton's Accessibility section](./fill-button.md#accessibility):
`disabled` vs `aria-disabled` affect focusability the same way, a disabled
button never renders as a link even with `href` set, and focus is
indicated by the same built-in focus ring.

## Props

| Prop            | Type                                                  | Default     | Notes                                                              |
| --------------- | ----------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `variant`       | `'primary' \| 'secondary' \| 'danger' \| 'interface'` | `'primary'` | Border/text color treatment                                        |
| `size`          | `'small' \| 'normal' \| 'large'`                      | `'normal'`  | Height and type scale                                              |
| `children`      | `ReactNode`                                           | —           | The label                                                          |
| `icon`          | `ComponentType<GamutIconProps>`                       | —           | Renders inline with the label                                      |
| `iconPosition`  | `'left' \| 'right'`                                   | `'left'`    | Side the icon renders on                                           |
| `href`          | `string`                                              | —           | Renders an `<a>` instead of a `<button>` (ignored when `disabled`) |
| `disabled`      | `boolean`                                             | `false`     | Native disabled; removes from tab order                            |
| `aria-disabled` | `boolean`                                             | —           | Visual-only disabled state; stays focusable and in the tab order   |
| `mode`          | `ColorModes`                                          | inherited   | Overrides color mode for this button                               |

`StrokeButton` also accepts Gamut's standard layout/spacing/border system
props (`StyleProps`).

## Playground

```jsx live
<StrokeButton
  variant="primary"
  size="normal"
  icon={MiniArrowRightIcon}
  iconPosition="right"
>
  Edit me
</StrokeButton>
```
