# FillButton

A button that has a solid background color and is used for primary actions.

**Status:** Current · [Figma](https://www.figma.com/file/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=1106%3A0) · [Source](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Button/FillButton.tsx)

## Usage

Use `FillButton` for the primary action on a screen or in a group of actions — the one thing you most want someone to do next (submit, save, continue). Include a leading or trailing icon from the mini icon set when it helps clarify the action.

### Best practices

- Use exactly one `FillButton` per group of actions. If two actions in the same group look equally important, that's a sign one of them should be a [StrokeButton](./stroke-button) or [TextButton](./text-button) instead.
- Don't override `color` or `bg` — hover, active, and disabled states are handled by the `variant` prop.
- Pair with a leading or trailing icon (via the `icon` prop) rather than adding a separate icon element next to the button.

### When NOT to use

- The action is secondary or lower-emphasis in its group — use [StrokeButton](./stroke-button).
- The action is low-emphasis or sits inline with body text — use [TextButton](./text-button).
- The action has no text label, only an icon — use [IconButton](./icon-button).
- The action is a marketing or high-visibility promotional CTA — use [CTAButton](./cta-button).

### Anatomy

- **Container** — solid background fill in the `variant` color, `borderRadius: md`, transitions color/background/box-shadow on state change.
- **Label** — bold text, sized by the `size` prop.
- **Icon** _(optional)_ — leading or trailing, 12px at `size="small"`, 16px at `normal`/`large`.
- **Focus ring** — a `::before` outline shown on `:focus-visible`, independent of the fill color.

## Patterns

### Show a busy state while an async action completes

Own the request's status as component state, and swap the label (and disable the button) while it's in flight — don't rely on the button's own `disabled` styling to communicate progress.

```tsx
const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

<FillButton
  variant="primary"
  disabled={status === 'saving'}
  icon={status === 'saved' ? MiniCheckCircleIcon : undefined}
  onClick={() => {
    setStatus('saving');
    save().then(() => setStatus('saved'));
  }}
>
  {status === 'idle' && 'Save changes'}
  {status === 'saving' && 'Saving…'}
  {status === 'saved' && 'Saved'}
</FillButton>;
```

<ClientOnly>
  <ReactDemo name="fill-button-submit" />
</ClientOnly>

### Use FillButton as a link

Pass `href` and `FillButton` renders an `<a>` instead of a `<button>`, keeping identical styling — useful when the primary action navigates rather than mutates.

```tsx
<FillButton
  variant="primary"
  href="https://gamut.codecademy.com"
  icon={MiniArrowRightIcon}
  iconPosition="right"
>
  View the component library
</FillButton>
```

<ClientOnly>
  <ReactDemo name="fill-button-link" />
</ClientOnly>

## Variants

Every `variant` value, exhaustively:

<ClientOnly>
  <ButtonVariantGrid component="FillButton" />
</ClientOnly>

Sizes (`small` / `normal` / `large`) apply the same way across every variant — try them together in the Playground below.

## Accessibility

- Renders a native `<button>` (or `<a>` when `href` is set), so Enter/Space activation and tab order work without extra wiring.
- The `disabled` prop renders the native `disabled` attribute, which removes the button from the tab order. When it must stay reachable by keyboard — for example so a `ToolTip` explaining why it's disabled can still be focused — use `aria-disabled` instead of `disabled`. Gamut's disabled styling matches `[aria-disabled='true']` too.
- If both `href` and `disabled` are set, `disabled` wins: the component drops `href` and renders a disabled `<button>` rather than an inert link.
- Give the button an accessible name via its text content. If you need an icon-only trigger, use [IconButton](./icon-button) instead, which requires a `tip`.

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
  <ButtonPlayground component="FillButton" />
</ClientOnly>
