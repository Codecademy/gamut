# Menu

`Menu` and `MenuItem` from `@codecademy/gamut` are stateless — the consumer manages `active` and `disabled` state. Reference: https://gamut.codecademy.com (Menu component documentation).

## Variants — always set explicitly

`Menu` has two variants: `popover` and `fixed`. **Always pass the `variant` prop explicitly.** Relying on the default produces the wrong variant for persistent navigation, which engineering will refactor before shipping.

| Variant   | Use for                                                                                                                                                | Rendering                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `fixed`   | Persistent inline navigation that is always visible — sidebars, primary nav, footer navigation, any menu that does not open/close on user interaction. | **Must** be rendered as `<nav>` for semantic and accessible navigation. Pass `as="nav"`. |
| `popover` | Temporary surfaces that appear on click and dismiss on outside interaction — overflow menus, action menus, "more" dropdowns, kebab menus.              | Default popover surface.                                                                 |

### Examples

Fixed (sidebar / persistent navigation):

```tsx
<Menu variant="fixed" as="nav">
  <MenuItem
    active={activeId === 'overview'}
    onClick={() => setActive('overview')}
  >
    Overview
  </MenuItem>
  <MenuItem
    active={activeId === 'settings'}
    onClick={() => setActive('settings')}
  >
    Settings
  </MenuItem>
</Menu>
```

Popover (overflow / action menu):

```tsx
<Menu variant="popover">
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem onClick={handleArchive}>Archive</MenuItem>
  <MenuItem disabled label="Owner permissions required" onClick={handleDelete}>
    Delete
  </MenuItem>
</Menu>
```

## `MenuItem` state

`Menu` is stateless — implement the logic to manage `active` and `disabled` state on `MenuItem` yourself.

- **`active: boolean`** — marks the currently selected item. Drive from your own state.
- **`disabled: boolean`** — marks an item as unavailable for interaction.
- **`label: string`** — when `disabled`, renders a `ToolTip` explaining _why_ the item is unavailable. Provide this for any disabled item the user might want context on.

## Do not make ancestors of `Menu` participate in flex stretching

`Menu` is a flex column that sizes to its content. If any ancestor between the `Menu` and the outermost layout container is a flex child that stretches to fill available space (e.g., a `FlexBox` with `flex={1}`, or a `<nav>` rendered via `FlexBox as="nav"`), the `Menu` will expand to fill that space, pushing items apart.

### Rule

Wrap `Menu` in a plain block-level element (`<nav>` via `as="nav"` on a `fixed` Menu, `<Box>`, or `<div>`) that uses intrinsic height. Do not use `FlexBox` as the immediate wrapper, and do not apply `height: 100%`, `flex: 1`, or `alignSelf: stretch` on any ancestor between the `Menu` and the sidebar's scrollable container.

## Spacing

| `spacing`   | Item height    | Font size |
| ----------- | -------------- | --------- |
| `normal`    | 48px (default) | 16px      |
| `condensed` | 40px           | 14px      |

## Roles

| Scenario                   | Markup                         |
| -------------------------- | ------------------------------ |
| Actions / options          | `<Menu role="menu">`           |
| Navigation links           | `<nav><Menu variant="fixed">…` |
| No semantic role (display) | `<Menu>` with no `role`        |

When `role="menu"` is set, `MenuItem` children automatically receive `role="menuitem"`. Nested `Menu` components receive `role="group"` automatically.

## Props — Menu

| Prop      | Type                      | Default     | Notes                             |
| --------- | ------------------------- | ----------- | --------------------------------- |
| `variant` | `"popover" \| "fixed"`    | `"popover"` | Controls border and active styles |
| `spacing` | `"normal" \| "condensed"` | `"normal"`  | Item height and font size         |
| `role`    | `"menu" \| undefined`     | —           | Set for action/option menus       |
| `as`      | `"ul" \| "ol"`            | `"ul"`      |                                   |

## Props — MenuItem

| Prop       | Type                     | Default | Notes                                                        |
| ---------- | ------------------------ | ------- | ------------------------------------------------------------ |
| `href`     | string                   | —       | Renders as `<a>`; disabled `href` renders as `<button>`      |
| `onClick`  | mouse event handler      | —       | Renders as `<button>` (takes precedence over plain `<li>`)   |
| `active`   | boolean                  | —       | Marks current page/action; adds screen-reader text           |
| `disabled` | boolean                  | —       | Sets `aria-disabled`; not native `disabled`                  |
| `icon`     | icon component           | —       | Leading icon; 24px normal, 16px condensed                    |
| `label`    | string or tooltip config | —       | Required when `icon`-only; also optional for disabled reason |
| `target`   | string                   | —       | Passed through to `<a>`                                      |

> **Disabled links**: passing `href` + `disabled` together renders a `<button>` (not `<a>`) with `aria-disabled`. The click handler is suppressed automatically.

## Icon-only menus

When `icon` is provided and `children` is omitted, `label` is required.

```jsx
// correct — interactive icon-only with tooltip
<MenuItem icon={FileIcon} label="Open file" onClick={handleOpen} />

// wrong — icon-only with no label (no accessible name)
<MenuItem icon={FileIcon} onClick={handleOpen} />
```

## Disabled items with tooltip

Pass `label` on a `disabled` `MenuItem` to explain why it's unavailable:

```jsx
<MenuItem
  disabled
  label={{ info: 'Requires admin access', alignment: 'right-center' }}
  onClick={handleAction}
>
  Admin action
</MenuItem>
```

## Floating menus with PopoverContainer

Offset the `PopoverContainer` y-axis by `48` (normal spacing) or `32` (condensed) per item to align the popover with the triggering item. Floating menus with actions should use `role="menu"`.

```jsx
<PopoverContainer
  alignment="top-right"
  inline
  isOpen={isOpen}
  targetRef={triggerRef}
  y={-48}
>
  <Background bg="background" borderRadius="lg">
    <Menu role="menu" variant="popover">
      <MenuItem onClick={handleAction}>Action</MenuItem>
    </Menu>
  </Background>
</PopoverContainer>
```

## Nesting

Nested `Menu` components inherit `variant`, `spacing`, and `role` from the root. The nested `Menu` receives `role="group"` automatically when the root has `role="menu"`. Indentation is applied automatically (`pl: 24` on non-root lists).
