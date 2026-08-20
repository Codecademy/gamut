# StrokeButton

A button that has an outline around its text and is used for secondary actions.

**Status:** Current · [Figma](https://www.figma.com/file/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=1106%3A0) · [Source](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Button/StrokeButton.tsx)

## Usage

Use `StrokeButton` for secondary actions — the option next to the primary one, like "Cancel" beside "Save". Include a leading or trailing icon from the mini icon set when it helps clarify the action.

### Best practices

- Pair a `StrokeButton` with a [FillButton](./fill-button) rather than using two `StrokeButton`s (or two `FillButton`s) at equal weight — the pairing itself signals which action is primary.
- Don't override `borderColor` directly — use `variant`; the border, hover, and disabled colors are handled together.
- When a `StrokeButton` must remain reachable by keyboard while disabled (for example, to keep an explanatory `ToolTip` focusable), use `aria-disabled` instead of `disabled` — see Patterns below.

### When NOT to use

- The action is the primary one in its group — use [FillButton](./fill-button).
- The action is low-emphasis or sits inline with body text — use [TextButton](./text-button).
- The action has no text label, only an icon — use [IconButton](./icon-button).

### Anatomy

- **Container** — transparent background with a 2px border in the `variant` color, `borderRadius: md`.
- **Label** — bold text in the `variant` color, sized by `size`.
- **Icon** _(optional)_ — leading or trailing, 12px at `size="small"`, 16px at `normal`/`large`.
- **Focus ring** — an outer `::before` outline shown on `:focus-visible`, offset from the border.

## Patterns

### Pair Cancel and Save in a dialog footer

Group a `StrokeButton` and a `FillButton` together for the two-action case, and resolve both from the same handler so the pairing can't get out of sync.

```tsx
const [open, setOpen] = useState(true);

<div style={{ display: 'flex', gap: 8 }}>
  <StrokeButton variant="secondary" onClick={() => setOpen(false)}>
    Cancel
  </StrokeButton>
  <FillButton variant="primary" onClick={() => setOpen(false)}>
    Save
  </FillButton>
</div>;
```

<ClientOnly>
  <ReactDemo name="stroke-button-footer" />
</ClientOnly>

### Keep a disabled button focusable to explain why

Native `disabled` removes a button from the tab order, which also makes an explanatory `ToolTip` unreachable by keyboard. Use `aria-disabled` alone — without `disabled` — so focus (and the tooltip) still works.

```tsx
<ToolTip id="why-disabled" info="Complete the previous step first">
  <StrokeButton
    variant="secondary"
    aria-describedby="why-disabled"
    aria-disabled
  >
    Continue
  </StrokeButton>
</ToolTip>
```

<ClientOnly>
  <ReactDemo name="stroke-button-disabled-tooltip" />
</ClientOnly>

## Variants

Every `variant` value, exhaustively:

<ClientOnly>
  <ButtonVariantGrid component="StrokeButton" />
</ClientOnly>

Sizes (`small` / `normal` / `large`) apply the same way across every variant — try them together in the Playground below.

## Accessibility

- Renders a native `<button>` (or `<a>` when `href` is set).
- `disabled` renders the native attribute and removes the button from the tab order. Use `aria-disabled` instead when the button must stay focusable — see Patterns above for the exact wiring with `ToolTip`.
- If both `href` and `disabled` are set, `disabled` wins and the component renders a disabled `<button>` rather than an inert link.

## Props

| Prop           | Type                                                  | Default     | Description                                                                                                                            |
| -------------- | ----------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'danger' \| 'interface'` | `'primary'` | Color emphasis.                                                                                                                        |
| `size`         | `'small' \| 'normal' \| 'large'`                      | `'normal'`  | Padding and font size.                                                                                                                 |
| `icon`         | `React.ComponentType<GamutIconProps>`                 | —           | Leading or trailing icon.                                                                                                              |
| `iconPosition` | `'left' \| 'right'`                                   | `'left'`    | Where `icon` renders relative to the label.                                                                                            |
| `disabled`     | `boolean`                                             | `false`     | Renders a native disabled `<button>`; removes it from the tab order.                                                                   |
| `href`         | `string`                                              | —           | Renders an `<a>` instead of a `<button>`.                                                                                              |
| `onClick`      | `(event) => void`                                     | —           | Click handler for either element type.                                                                                                 |
| `mode`         | `'light' \| 'dark'`                                   | —           | Overrides color mode for this instance.                                                                                                |
| …              | —                                                     | —           | Plus `space`, `layout`, `positioning`, and `border` system props from `@codecademy/gamut-styles` (`m`, `p`, `width`, `position`, etc). |

## Playground

<ClientOnly>
  <ButtonPlayground component="StrokeButton" />
</ClientOnly>
