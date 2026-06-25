# ToolTip focus management — buttons with floating placement

`ToolTip` opens on hover or focus and closes when neither is active. Two rendering paths:

- **Inline (default):** CSS-only via `:hover` and `:focus-within`. No JS involved; tooltip tracks pointer and focus automatically.
- **Floating (`placement="floating"`):** JS-driven. Tracks hover (`mouseenter`/`mouseleave`) and focus (`focus`/`blur`) separately with a small delay. Escape key calls `.blur()` on the trigger automatically.

## When the tooltip lingers after a click

Only occurs with `FloatingTip` when the button was **keyboard-focused before the click**. `FloatingTip` keeps an `isFocused` flag; while true, `mouseleave` does not close the tooltip. If the click action does not naturally move DOM focus elsewhere, the button stays focused and the tooltip stays open.

Mouse-initiated clicks do not have this problem: `TargetContainer` has `onMouseDown={(e) => e.preventDefault()}` which prevents the button from gaining focus via mouse, so `isFocused` stays `false` and the tooltip closes when the pointer moves away.

## Pattern — explicit blur when focus won't move naturally

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

Call `.blur()` synchronously before the action; this keeps tooltip dismissal atomic with the user interaction.

## When to apply (floating placement, keyboard-triggered clicks only)

- Click opens a modal, drawer, or panel that does NOT auto-focus an element inside it
- Click triggers an in-place state toggle (e.g. show/hide inline editor)
- Click dispatches a mutation with no focus side-effect

## When NOT needed

- Click opens a modal with a proper focus trap — the trap moves focus automatically, blurring the button
- Click navigates to a new route — component unmounts
- Click reveals a `Popover` or `FloatingTip`-managed dropdown — focus is moved by that system
- Tooltip uses the default inline (non-floating) placement — CSS handles visibility, no lingering issue
- User pressed Escape — built-in `escapeKeyPressHandler` already calls `.blur()`
