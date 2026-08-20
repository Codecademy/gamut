# TextButton

A button that usually only has text and is used for tertiary actions.

**Status:** Current · [Figma](https://www.figma.com/file/ReGfRNillGABAj5SlITalN/%F0%9F%93%90-Gamut?node-id=1106%3A0) · [Source](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Button/TextButton.tsx)

## Usage

Use `TextButton` for tertiary, low-emphasis actions — often inline with other content. Include a leading or trailing icon from the mini icon set to clarify the action or to distinguish the button from other bold text nearby.

### Best practices

`TextButton` uses bold formatting to differentiate itself from body text, because color alone doesn't meet the 3:1 contrast ratio required for accessibility. Bold formatting alone may not be enough in every context — for example, next to a bold heading.

- When a `TextButton` sits next to other bold text, include a leading or trailing icon so it's still identifiable as interactive.

### When NOT to use

- The action is the primary one in its group — use [FillButton](./fill-button).
- The action is secondary, or needs more visual weight than plain text — use [StrokeButton](./stroke-button).
- The action has no text label, only an icon — use [IconButton](./icon-button).

### Anatomy

- **Label** — bold text in the `variant` color; no container fill or border.
- **Icon** _(optional)_ — leading or trailing, 12px at `size="small"`, 16px at `normal`/`large`.
- **Focus ring** — a `::before` outline shown on `:focus-visible`.

## Patterns

### Place a low-emphasis action inline with body copy

Because `TextButton` has no border or fill, it reads naturally inside a sentence — use it for actions that are secondary to the surrounding text, not for the primary action on the page.

```tsx
<p>
  Your changes are saved automatically.{' '}
  <TextButton variant="primary" size="small">
    View version history
  </TextButton>
</p>
```

<ClientOnly>
  <ReactDemo name="text-button-inline" />
</ClientOnly>

### Toggle a piece of UI open or closed

Let the button own the open/closed state itself and flip an icon's position to signal direction, rather than encoding state only in the label text.

```tsx
const [expanded, setExpanded] = useState(false);

<TextButton
  variant="primary"
  icon={MiniArrowRightIcon}
  iconPosition={expanded ? 'left' : 'right'}
  onClick={() => setExpanded((value) => !value)}
>
  {expanded ? 'Hide details' : 'Show details'}
</TextButton>;
```

<ClientOnly>
  <ReactDemo name="text-button-toggle" />
</ClientOnly>

## Variants

Every `variant` value, exhaustively:

<ClientOnly>
  <ButtonVariantGrid component="TextButton" />
</ClientOnly>

Sizes (`small` / `normal` / `large`) apply the same way across every variant — try them together in the Playground below.

## Accessibility

- Renders a native `<button>` (or `<a>` when `href` is set).
- Because it has no border or fill, its only affordance is the bold label — pair it with an icon whenever it sits next to other bold text (like a heading) so it doesn't read as plain emphasis.
- `disabled` renders the native attribute and removes the button from the tab order. Use `aria-disabled` instead when it must stay focusable, following the same pattern shown on [StrokeButton](./stroke-button).

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
  <ButtonPlayground component="TextButton" />
</ClientOnly>
