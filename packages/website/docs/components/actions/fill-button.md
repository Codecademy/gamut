---
sidebar_position: 1
---

# FillButton

A solid, high-emphasis button for the primary action in a given context.

**Status:** Stable · **Source:** `packages/gamut/src/Button/FillButton.tsx`

## Usage

Reach for `FillButton` when there's one action you want the reader to take
above all others on the page or in a section — submitting a form,
confirming a destructive action, starting a flow.

### Best practices

- Use at most one `FillButton` per view for a given decision; if two
  actions compete for the reader's eye, one of them should be a
  [StrokeButton](./stroke-button.md) or [TextButton](./text-button.md)
  instead.
- Label with a verb describing the outcome ("Save changes"), not the
  mechanism ("Submit").
- Pick `variant="danger"` only for destructive, hard-to-reverse actions —
  not simply to draw attention.

### When NOT to use

- The action is secondary to another action on the same view — use
  [StrokeButton](./stroke-button.md).
- The action is the lowest-emphasis option (e.g. "Cancel") — use
  [TextButton](./text-button.md).
- You need an icon-only control with no label — use `IconButton` instead.
- The control just navigates to another page with no side effect — use
  `Anchor` instead; reserve buttons for actions.
- You're building a marketing/landing-page call to action — use
  `CTAButton`, which carries its own visual treatment.

### Anatomy

```text
┌────────────────────────┐
│  [icon]  Label  [icon]  │
└────────────────────────┘
```

- **Label** — the `children` content
- **Icon** — optional, from the `icon` prop; `iconPosition` (`'left'` by
  default, or `'right'`) controls which side it renders on

## Patterns

### Disable until a form is valid

The interesting part is the state driving `disabled`, not a prop value —
that's what makes this a Pattern.

```jsx live
function ValidatedSubmit() {
  const [agreed, setAgreed] = React.useState(false);

  return (
    <>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />{' '}
        I agree to the terms
      </label>
      <FillButton disabled={!agreed} onClick={() => alert('Submitted')}>
        Submit
      </FillButton>
    </>
  );
}
```

### Render as a link

Passing `href` renders an `<a>` instead of a `<button>` — useful when the
"action" is really navigation styled as a primary button (e.g. "Get
started" linking to a signup page).

```jsx live
<FillButton href="https://www.codecademy.com">Get started</FillButton>
```

## Variants

Every `variant` value:

```jsx live
<FillButton variant="primary">Primary</FillButton>
```

```jsx live
<FillButton variant="secondary">Secondary</FillButton>
```

```jsx live
<FillButton variant="danger">Danger</FillButton>
```

```jsx live
<FillButton variant="interface">Interface</FillButton>
```

Every `size` value:

```jsx live
<FillButton size="small">Small</FillButton>
```

```jsx live
<FillButton size="normal">Normal</FillButton>
```

```jsx live
<FillButton size="large">Large</FillButton>
```

With an icon, on either side:

```jsx live
<FillButton icon={MiniArrowRightIcon} iconPosition="right">
  Continue
</FillButton>
```

Disabled:

```jsx live
<FillButton disabled>Disabled</FillButton>
```

## Accessibility

- **Disabled state is not one thing.** Native `disabled` removes the
  button from the tab order entirely. If the reader needs to discover
  _why_ an action is unavailable (e.g. via a `ToolTip`), pass
  `aria-disabled="true"` instead of `disabled` — `ButtonBase` applies the
  same disabled visual styling to both, but only native `disabled` affects
  focusability. Pick deliberately; don't default to `disabled` out of
  habit.
- A disabled button never renders as a link — even with `href` set,
  `disabled` forces a plain `<button disabled>` rather than a disabled
  anchor, since anchors have no native disabled semantics.
- Focus is indicated by a visible focus ring (`:focus-visible`); this is
  built into `ButtonBase` and shouldn't be overridden.
- The icon is decorative reinforcement of the label; it does not carry
  meaning on its own, so no separate `aria-label` is needed for it.
- No RTL-specific behavior beyond Gamut's standard logical-property layout
  (see [Migrating to logical properties](../../guides/migrating-to-logical-properties.md)).

## Props

| Prop            | Type                                                  | Default     | Notes                                                              |
| --------------- | ----------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `variant`       | `'primary' \| 'secondary' \| 'danger' \| 'interface'` | `'primary'` | Color treatment                                                    |
| `size`          | `'small' \| 'normal' \| 'large'`                      | `'normal'`  | Height and type scale                                              |
| `children`      | `ReactNode`                                           | —           | The label                                                          |
| `icon`          | `ComponentType<GamutIconProps>`                       | —           | Renders inline with the label                                      |
| `iconPosition`  | `'left' \| 'right'`                                   | `'left'`    | Side the icon renders on                                           |
| `href`          | `string`                                              | —           | Renders an `<a>` instead of a `<button>` (ignored when `disabled`) |
| `disabled`      | `boolean`                                             | `false`     | Native disabled; removes from tab order                            |
| `aria-disabled` | `boolean`                                             | —           | Visual-only disabled state; stays focusable and in the tab order   |
| `mode`          | `ColorModes`                                          | inherited   | Overrides color mode for this button                               |

`FillButton` also accepts Gamut's standard layout/spacing/border system
props (`StyleProps`).

## Playground

```jsx live
<FillButton
  variant="primary"
  size="normal"
  icon={MiniArrowRightIcon}
  iconPosition="right"
>
  Edit me
</FillButton>
```
