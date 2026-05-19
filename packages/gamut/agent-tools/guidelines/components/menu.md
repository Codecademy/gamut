# Menu

`Menu` and `MenuItem` from `@codecademy/gamut` are stateless — the consumer manages `active` and `disabled` state.

Related: [`skills/gamut-accessibility/SKILL.md`](../../skills/gamut-accessibility/SKILL.md)

Storybook: [Molecules / Menu](https://gamut.codecademy.com/?path=/docs-molecules-menu--docs)

## Variants — always set explicitly

Always pass the `variant` prop. Relying on the default produces the wrong variant for persistent navigation.

| Variant   | Use for                                                                                                             | Rendering                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `fixed`   | Persistent inline navigation — sidebars, primary nav, footer nav, any menu that does not open/close on interaction. | Must use `as="nav"` for accessible navigation. |
| `popover` | Temporary surfaces — overflow menus, action menus, kebab menus, dismiss on outside click.                           | Default popover surface.                       |

### Fixed (sidebar / persistent navigation)

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

### Popover (overflow / action menu)

```tsx
<Menu variant="popover">
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem disabled label="Owner permissions required" onClick={handleDelete}>
    Delete
  </MenuItem>
</Menu>
```

## `MenuItem` state

- `active: boolean` — currently selected item; drive from your state.
- `disabled: boolean` — unavailable for interaction.
- `label: string` — when `disabled`, renders a `ToolTip` explaining why. Provide for any disabled item users might question.

## Do not stretch `Menu` in flex layouts

`Menu` is a flex column sized to its content. If an ancestor is a flex child that stretches (`flex={1}`, `height: 100%`, `alignSelf: stretch`), the menu expands and items spread apart.

Rule: Wrap `Menu` in a block-level container with intrinsic height (`as="nav"` on a fixed menu, `Box`, or `div`). Do not use `FlexBox` as the immediate wrapper, and do not apply stretch on ancestors between `Menu` and the sidebar scroll container.
