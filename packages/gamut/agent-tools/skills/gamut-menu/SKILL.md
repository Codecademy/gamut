---
name: gamut-menu
description: Use this skill when building action menus, navigation menus, floating/popover menus, or icon-only menus with `Menu`, `MenuItem`, and `MenuSeparator` — including variant and role selection, active/disabled state, icon + tooltip patterns, and floating menus via `PopoverContainer`; not for form option lists (see gamut-select-dropdown), expandable nav sections (use `LayoutMenu`), or tab switching (use `Tabs`).
---

# Gamut Menu

`Menu`, `MenuItem`, and `MenuSeparator` compose lists of actions, options, or navigation links.

Source: `@codecademy/gamut` — [Menu.tsx](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Menu/Menu.tsx)

See also: [`gamut-accessibility`](../gamut-accessibility/SKILL.md) — ARIA roles and focus rules. [`gamut-list`](../gamut-list/SKILL.md) — lower-level List primitives when `Menu` is too opinionated.

Storybook: [Molecules / Menu](https://gamut.codecademy.com/?path=/docs-molecules-menu--docs)

## Components

```tsx
import { Menu, MenuItem, MenuSeparator } from '@codecademy/gamut';
```

| Symbol          | Role                                                          |
| --------------- | ------------------------------------------------------------- |
| `Menu`          | `<ul>` container; sets variant, spacing, and role via context |
| `MenuItem`      | Renders as `<a>`, `<button>`, or `<li>` depending on props    |
| `MenuSeparator` | Horizontal divider (`role="separator"`) for grouping items    |

## When to use Menu

- Presenting a list of actions or options (assign `role="menu"`)
- Persistent navigation links in a sidebar or page nav (wrap in `<nav>`, use `variant="fixed"`)
- Floating contextual menus opened by a trigger (pair with `PopoverContainer`)
- Icon-only menus where each item needs a visible label on hover

**Do not use Menu when:**

- Selecting a value inside a form → use [`SelectDropdown`](https://gamut.codecademy.com/?path=/docs-molecules-selectdropdown--docs)
- Organizing collapsible nav sections → use `LayoutMenu`
- Switching between content panels → use `Tabs`

## Variants

| `variant` | Use for                                                | Border | Active style         |
| --------- | ------------------------------------------------------ | ------ | -------------------- |
| `popover` | Temporary surfaces: dropdowns, context menus (default) | Yes    | Bold text            |
| `fixed`   | Persistent sidebars and page navigation                | No     | Bold + bg + left bar |

`fixed` menus must be wrapped in `<nav>` for semantic navigation.

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

When `role="menu"` is set, `MenuItem` children automatically receive `role="menuitem"`. Nested `Menu` components receive `role="group"` automatically via `MenuContext`.

## Props — Menu

| Prop      | Type                      | Default     | Notes                             |
| --------- | ------------------------- | ----------- | --------------------------------- |
| `variant` | `"popover" \| "fixed"`    | `"popover"` | Controls border and active styles |
| `spacing` | `"normal" \| "condensed"` | `"normal"`  | Item height and font size         |
| `role`    | `"menu" \| undefined`     | —           | Set for action/option menus       |
| `as`      | `"ul" \| "ol"`            | `"ul"`      |                                   |

## Props — MenuItem

| Prop       | Type                                  | Default | Notes                                                        |
| ---------- | ------------------------------------- | ------- | ------------------------------------------------------------ |
| `href`     | string                                | —       | Renders as `<a>`; disabled href renders as `<button>`        |
| `onClick`  | MouseEventHandler                     | —       | Renders as `<button>` (takes precedence over plain `<li>`)   |
| `active`   | boolean                               | —       | Marks current page/action; adds screen-reader text           |
| `disabled` | boolean                               | —       | Sets `aria-disabled` and `isDisabled` styles; not `disabled` |
| `icon`     | `React.ComponentType<GamutIconProps>` | —       | Leading icon; 24px normal, 16px condensed                    |
| `label`    | `string \| Omit<ToolTipProps, "id">`  | —       | Required when `icon`-only; also optional for disabled reason |
| `target`   | string                                | —       | Passed through to `<a>`                                      |

> **Stateless component**: `Menu` does not track which item is `active` or `disabled`. Manage these states in the parent component and pass them as props.

> **Disabled links**: passing `href` + `disabled` together renders a `<button>` (not `<a>`) with `aria-disabled`. The click handler is suppressed automatically.

## Basic usage

```tsx
// Popover action menu
<Menu role="menu" variant="popover">
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem active onClick={handleView}>View</MenuItem>
  <MenuSeparator />
  <MenuItem disabled onClick={handleDelete}>Delete</MenuItem>
</Menu>

// Fixed nav menu
<nav>
  <Menu variant="fixed">
    <MenuItem href="/dashboard">Dashboard</MenuItem>
    <MenuItem active href="/settings">Settings</MenuItem>
  </Menu>
</nav>
```

## Icon-only menus

When `icon` is provided and `children` is omitted, `label` is required.

- Interactive items: `label` populates a `ToolTip`
- Non-interactive items: `label` is used as `aria-label` — do not add a ToolTip; use an `InfoTip` instead for supplemental context

```tsx
// correct — interactive icon-only with tooltip
<MenuItem icon={FileIcon} label="Open file" onClick={handleOpen} />

// correct — custom tooltip alignment
<MenuItem
  icon={PeopleIcon}
  label={{ info: 'Manage team', alignment: 'right-center' }}
  href="/team"
/>

// wrong — icon-only with no label (no accessible name)
<MenuItem icon={FileIcon} onClick={handleOpen} />
```

## Disabled items with tooltip

Pass `label` on a `disabled` `MenuItem` to explain why it is unavailable.

```tsx
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

```tsx
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

Nested `Menu` components inherit `variant`, `spacing`, and `role` from the root via `MenuContext`. The nested `Menu` receives `role="group"` automatically when the root has `role="menu"`. Indentation is applied automatically via `pl: 24` on non-root lists.
