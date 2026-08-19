---
sidebar_position: 3
---

# TextButton

A borderless, low-emphasis button for a tertiary action.

**Status:** Stable · **Source:** `packages/gamut/src/Button/TextButton.tsx`

## Usage

Reach for `TextButton` for actions that need to be available but shouldn't
draw the eye — "Cancel," "Skip," "Learn more" next to a page's primary and
secondary actions.

### Best practices

- Use for the least important action in a group, never as the only action
  on a view — if it's the only action, it's probably a
  [FillButton](./fill-button.md).
- Don't rely on `TextButton` alone to signal "this is clickable" in dense
  text — pair with clear labeling, since it has no border or fill to
  separate it from surrounding content.

### When NOT to use

- This is the primary action on the view — use
  [FillButton](./fill-button.md).
- This is a secondary action that should still read as a button — use
  [StrokeButton](./stroke-button.md).
- You need an icon-only control with no label — use `IconButton` instead.
- The control is really just a navigational link inside body copy — use
  `Anchor` instead.

### Anatomy

```text
┌────────────────────────┐
│  [icon]  Label  [icon]  │
└────────────────────────┘
```

Same anatomy as [FillButton](./fill-button.md#anatomy), rendered with no
border or background — only text color signals the variant, and it fills
in a background on hover/press.

## Patterns

### Tertiary action alongside a form

```jsx live
function FormActions() {
  const [status, setStatus] = React.useState('');

  return (
    <>
      <FillButton
        onClick={() => setStatus('Saved')}
        style={{ marginInlineEnd: 8 }}
      >
        Save
      </FillButton>
      <TextButton onClick={() => setStatus('Cancelled')}>Cancel</TextButton>
      {status && <p>{status}</p>}
    </>
  );
}
```

## Variants

Every `variant` value:

```jsx live
<TextButton variant="primary">Primary</TextButton>
```

```jsx live
<TextButton variant="secondary">Secondary</TextButton>
```

```jsx live
<TextButton variant="danger">Danger</TextButton>
```

```jsx live
<TextButton variant="interface">Interface</TextButton>
```

Every `size` value:

```jsx live
<TextButton size="small">Small</TextButton>
```

```jsx live
<TextButton size="normal">Normal</TextButton>
```

```jsx live
<TextButton size="large">Large</TextButton>
```

With an icon:

```jsx live
<TextButton icon={MiniArrowRightIcon} iconPosition="right">
  Learn more
</TextButton>
```

Disabled:

```jsx live
<TextButton disabled>Disabled</TextButton>
```

## Accessibility

Identical mechanics to [FillButton's Accessibility section](./fill-button.md#accessibility):
`disabled` vs `aria-disabled` affect focusability the same way, a disabled
button never renders as a link even with `href` set, and focus is
indicated by the same built-in focus ring. Because `TextButton` has no
border or fill, its focus ring is the primary visual signal that it's
interactive — don't override it.

## Props

| Prop            | Type                                                  | Default     | Notes                                                              |
| --------------- | ----------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `variant`       | `'primary' \| 'secondary' \| 'danger' \| 'interface'` | `'primary'` | Text color treatment                                               |
| `size`          | `'small' \| 'normal' \| 'large'`                      | `'normal'`  | Height and type scale                                              |
| `children`      | `ReactNode`                                           | —           | The label                                                          |
| `icon`          | `ComponentType<GamutIconProps>`                       | —           | Renders inline with the label                                      |
| `iconPosition`  | `'left' \| 'right'`                                   | `'left'`    | Side the icon renders on                                           |
| `href`          | `string`                                              | —           | Renders an `<a>` instead of a `<button>` (ignored when `disabled`) |
| `disabled`      | `boolean`                                             | `false`     | Native disabled; removes from tab order                            |
| `aria-disabled` | `boolean`                                             | —           | Visual-only disabled state; stays focusable and in the tab order   |
| `mode`          | `ColorModes`                                          | inherited   | Overrides color mode for this button                               |

`TextButton` also accepts Gamut's standard layout/spacing/border system
props (`StyleProps`).

## Playground

```jsx live
<TextButton
  variant="primary"
  size="normal"
  icon={MiniArrowRightIcon}
  iconPosition="right"
>
  Edit me
</TextButton>
```
