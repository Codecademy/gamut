# Components

52 components have Figma ↔ code mappings via Figma Code Connect (`packages/code-connect/`). Live code snippets appear in Figma's inspect panel when you select a component.

## Atoms — foundational, single-purpose

Badge, Button (FillButton, StrokeButton, CTAButton, TextButton, IconButton), ButtonBase, Card, Checkbox, CodeBlock, ColorMode, Drawer, FlexBox, FormGroup, GridBox, HiddenText, Icon, Input, Label, Loader, Radio, Select, Spinner, Tag, TextArea, Toggle, Tooltip

## Molecules — composed of atoms

Alert, Anchor, Breadcrumbs, Coachmark, Disclosure, GridForm, Markdown, Menu, Modal, Pagination, Popover, ProgressBar, Table, Tabs, Toast, Toaster, Video

## Organisms — page-level compositions

ContentContainer, GridContainer, Layout, LayoutGrid

## Key patterns

### Buttons

See [buttons.md](buttons.md) for full reference. Use `FillButton` for primary actions, `StrokeButton` for secondary.

### Forms and accessibility

`FormGroup`, `GridForm`, `ConnectedForm`, tips, dialogs, composite widgets: [`skills/gamut-forms/SKILL.md`](../../skills/gamut-forms/SKILL.md) (forms) · [`skills/gamut-accessibility/SKILL.md`](../../skills/gamut-accessibility/SKILL.md) (overlays, composites, checklists) · Storybook [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page).

### Cards

- Background variants: `default` (ColorMode-responsive), `white`, `yellow`, `beige`, `navy`, `hyper`
- Shadow variants: `none` (default), `outline`, `patternLeft`, `patternRight`
- Add `isInteractive` when wrapping in `<Anchor>` — enables hover shadow + `borderRadius: md`
- Default `borderRadius` is `none`; override with `borderRadius` prop

### Color-aware components

- `<ColorMode mode="light|dark|system">` — scopes a subtree to an explicit color mode
- `<Background bg="<color>">` — applies background color + auto-switches inner color mode for contrast

### Alerts

| Variant | Tokens                                    |
| ------- | ----------------------------------------- |
| Error   | `feedback-error` + `background-error`     |
| Success | `feedback-success` + `background-success` |
| Warning | `feedback-warning` + `background-warning` |

## Global tokens

| Token          | Value                   | Use                            |
| -------------- | ----------------------- | ------------------------------ |
| `headerHeight` | 64px (base), 80px (md+) | Global page header height      |
| `headerZ`      | 15                      | Z-index for global page header |
