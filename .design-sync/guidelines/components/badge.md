# Badge

Status indicator — see `components/index.md`: `Badge` = status, `Tag` = categorization.

## Variant examples

```jsx
const { Badge } = window.CodecademyGamut;

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="tertiary">Tertiary</Badge>
<Badge variant="accent">Accent</Badge>
```

## Sizes

```jsx
<Badge>default size</Badge>
<Badge size="sm" variant="tertiary">sm size</Badge>
```

## With icon

Icon comes from `guidelines/components/icons.md` — pick the exact export name, don't guess:

```jsx
const { MiniStarIcon, MiniWarningTriangleIcon } = window.CodecademyGamut;

<Badge variant="tertiaryFill" icon={MiniStarIcon}>sample icon</Badge>
<Badge size="sm" variant="accent" icon={MiniWarningTriangleIcon}>sm icon</Badge>
```

## Status colors (success/error/warning) — none of the built-in variants do this

`primary`/`secondary`/`tertiary`/`tertiaryFill`/`accent` are all neutral (text/background/border tones) — **none map to green/red/warning colors**. For a status badge, use `variant="custom"` with a semantic `bg` token, never a raw hex or an invented color-name variant:

```jsx
<Badge variant="custom" bg="feedback-error" textColor="background">Overdue</Badge>
<Badge variant="custom" bg="feedback-success" textColor="background">Completed</Badge>
<Badge variant="custom" bg="feedback-warning" textColor="background">Due soon</Badge>
```

See `guidelines/recipes/data-list-with-status.md` for this in a full `DataList` column.
