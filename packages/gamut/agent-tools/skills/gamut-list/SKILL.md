---
name: gamut-list
description: Use this skill when building list or table layouts with List, ListRow, ListCol, and TableHeader — including variant and spacing selection, expandable row patterns, ordered/table layouts, and the rule that a list of disclosure-style items must use List's expandable row pattern (not multiple Disclosure components). See gamut-accessibility for ARIA and focus guidance.
---

# Gamut List

Structured, repeating layouts built from `List`, `ListRow`, `ListCol`, and `TableHeader`. Colors, borders, and spacing are wired through the `variant` and `spacing` props — consumers do not override these with raw CSS values.

Source: `@codecademy/gamut` — [List.tsx](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/List/List.tsx)

See also: [`gamut-accessibility`](../gamut-accessibility/SKILL.md) — ARIA, focus, and keyboard interaction rules. [`gamut-layout`](../gamut-layout/SKILL.md) — spacing tokens and system props.

Storybook:

- [Organisms / Lists & Tables / List](https://gamut.codecademy.com/?path=/docs-organisms-lists-tables-list-list--docs)
- [ListRow](https://gamut.codecademy.com/?path=/docs-organisms-lists-tables-list-listrow--docs)
- [ListCol](https://gamut.codecademy.com/?path=/docs-organisms-lists-tables-list-listcol--docs)

## Components

```tsx
import { List, ListRow, ListCol, TableHeader } from '@codecademy/gamut';
```

| Component     | Role                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| `List`        | Root wrapper; sets `variant`, `spacing`, `as`, and context for children |
| `ListRow`     | Single row; handles expandable content and click interactions           |
| `ListCol`     | Column cell; controls `type`, `size`, `fill`, and justification         |
| `TableHeader` | Sticky header row; use only with `List as="table"`                      |

## When to use List

- Displaying repetitive content where individual rows may contain interactive elements, metrics, or controls — use List, not Card.
- Comparing data across rows — use `variant="table"` (or `as="table"`) rather than a plain `<table>`.
- Needing numbered rows — use `as="ol"`.
- **Needing multiple expandable/disclosure-style items** — use List's expandable row pattern (see [Expandable rows](#expandable-rows)), not multiple standalone `Disclosure` components.

## Variants

```tsx
<List variant="default" />
```

| `variant` | Use for                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `default` | Rows with abstract content (buttons, custom renders); bordered, no gutter                               |
| `table`   | Metrics or comparable data; alternating row backgrounds                                                 |
| `card`    | Content that doesn't need to be adjacent (e.g. curriculum progress); bordered rows with vertical gutter |
| `block`   | Feature-forward designs or page scaffolding; always on a colored background                             |
| `plain`   | Minimal styling — no borders or backgrounds; apply custom styles per row via Emotion `styled`           |

## Spacing

```tsx
<List spacing="condensed" />
```

| `spacing`   | Use for                                      |
| ----------- | -------------------------------------------- |
| `normal`    | Mixed content that needs room for components |
| `condensed` | Default choice; reduced padding between rows |
| `compact`   | Tightest layout; data-dense views            |

## `as` prop

Default is `ul`. Pass `as="ol"` for numbered rows or `as="table"` for semantic table output.

```tsx
// ordered list — always include one ListCol with type="header" so numbering renders correctly
<List as="ol">
  <ListRow>
    <ListCol type="header">Step one</ListCol>
    <ListCol>Details</ListCol>
  </ListRow>
</List>

// semantic table with sticky header
<List as="table">
  <TableHeader>
    <ListCol columnHeader>Name</ListCol>
    <ListCol columnHeader>Role</ListCol>
  </TableHeader>
  <ListRow>
    <ListCol type="header">Worf</ListCol>
    <ListCol>Lieutenant Commander</ListCol>
  </ListRow>
</List>
```

## Key props

### List

| Prop                    | Type                                                   | Default     | Effect                                                   |
| ----------------------- | ------------------------------------------------------ | ----------- | -------------------------------------------------------- |
| `variant`               | `'default' \| 'table' \| 'card' \| 'block' \| 'plain'` | `'default'` | Row styling                                              |
| `spacing`               | `'normal' \| 'condensed' \| 'compact'`                 | `'normal'`  | Row padding                                              |
| `as`                    | `'ul' \| 'ol' \| 'table'`                              | `'ul'`      | Rendered element and semantic meaning                    |
| `header`                | `React.ReactNode`                                      | —           | Node rendered above the row list                         |
| `emptyMessage`          | `React.ReactNode`                                      | —           | Shown when children is empty                             |
| `loading`               | `boolean`                                              | —           | Shows placeholder while data loads                       |
| `scrollable`            | `boolean`                                              | `false`     | Enables horizontal scroll with sticky first column       |
| `shadow`                | `boolean`                                              | `false`     | Right-side shadow when scrollable content overflows      |
| `disableContainerQuery` | `boolean`                                              | `false`     | Falls back to media queries instead of container queries |
| `rowBreakpoint`         | `'xs' \| 'sm' \| 'md'`                                 | `'xs'`      | Breakpoint at which columns stack                        |

### ListRow

| Prop                       | Type                    | Notes                                                                   |
| -------------------------- | ----------------------- | ----------------------------------------------------------------------- |
| `expanded`                 | `boolean`               | Required when `renderExpanded` is set                                   |
| `renderExpanded`           | `() => React.ReactNode` | Content revealed when `expanded` is true; animates in/out               |
| `expandedRowAriaLabel`     | `string`                | `aria-label` for the revealed region                                    |
| `keepSpacingWhileExpanded` | `boolean`               | Maintains row spacing while content is expanded                         |
| `onClick`                  | mouse event handler     | Makes the full row interactive (adds `role="button"`, keyboard support) |

### ListCol `type`

| `type`          | Use for                                                |
| --------------- | ------------------------------------------------------ |
| `header`        | Primary label column; sticky when `List` is scrollable |
| `content`       | Secondary text content                                 |
| `control`       | Action controls (buttons, menus)                       |
| `expand`        | Expanded content area                                  |
| `expandControl` | The toggle button column (no right-padding)            |
| `select`        | Checkbox / selection column                            |

### ListCol `size`

`'content'` (default, fits content) | `'sm'` | `'md'` | `'lg'` | `'xl'`

Pass `fill` to grow a column to fill remaining space.

## Expandable rows

List provides two patterns for rows that reveal content. Both animate open/closed via framer-motion.

### Expand on button click

Use `ExpandControl` in a `type="expandControl"` column to toggle a specific row.

```tsx
const [isExpanded, setExpanded] = useState(false);

<ListRow
  expanded={isExpanded}
  renderExpanded={() => <Text>Revealed content</Text>}
  expandedRowAriaLabel="Row details"
>
  <ListCol type="header">Row label</ListCol>
  <ListCol type="content">Secondary detail</ListCol>
  <ListCol type="expandControl">
    <ExpandControl
      expanded={isExpanded}
      onExpand={() => setExpanded(!isExpanded)}
    />
  </ListCol>
</ListRow>;
```

### Expand on row click

Pass `onClick` to `ListRow` to make the entire row the toggle target. The row receives `role="button"` and keyboard Enter support automatically.

```tsx
const [isExpanded, setExpanded] = useState(false);

<ListRow
  expanded={isExpanded}
  onClick={() => setExpanded(!isExpanded)}
  renderExpanded={() => <Text>Revealed content</Text>}
>
  <ListCol type="header">Row label</ListCol>
  <ListCol type="content">Secondary detail</ListCol>
  <ListCol type="control">
    <Rotation rotated={isExpanded}>
      <ArrowChevronDownIcon color="text-disabled" />
    </Rotation>
  </ListCol>
</ListRow>;
```

## List of disclosure-style items

When you need multiple expandable items (an FAQ, an accordion, a list of sections), **use List's expandable row pattern above — do not render multiple standalone `Disclosure` components**.

`Disclosure` is designed for a single, isolated expandable container. For two or more expandable items, the correct pattern is `List` + `ListRow` with `expanded` / `renderExpanded`:

```tsx
// correct — list of expandable items
<List variant="default" spacing="normal">
  {items.map(({ id, title, body }) => {
    const [isExpanded, setExpanded] = useState(false);
    return (
      <ListRow
        key={id}
        expanded={isExpanded}
        renderExpanded={() => <Box p={16}>{body}</Box>}
        expandedRowAriaLabel={`${title} details`}
      >
        <ListCol type="header" fill>{title}</ListCol>
        <ListCol type="expandControl">
          <ExpandControl
            expanded={isExpanded}
            onExpand={() => setExpanded(!isExpanded)}
          />
        </ListCol>
      </ListRow>
    );
  })}
</List>

// wrong — multiple Disclosure components
<Disclosure heading="Item 1" body="..." />
<Disclosure heading="Item 2" body="..." />
```

## Empty state and loading

```tsx
// custom empty message
<List emptyMessage={<Text>No results found.</Text>}>
  {rows}
</List>

// loading placeholder
<List loading>{rows}</List>
```

## Scrollable layout

Use `scrollable` when a list has many columns and collapsing would lose information. The first (`type="header"`) column sticks to the left.

```tsx
<List scrollable shadow>
  <TableHeader>
    <ListCol type="header" columnHeader>
      Name
    </ListCol>
    <ListCol size="md" columnHeader>
      Score
    </ListCol>
    <ListCol size="md" columnHeader>
      Progress
    </ListCol>
  </TableHeader>
  {rows}
</List>
```

## Container queries

By default `List` uses CSS container queries for responsive column stacking. Disable only when:

- The `List` lives in a container narrower than its breakpoint
- You are managing your own responsive logic
- The list has very few rows and container query overhead is unwanted

```tsx
<List disableContainerQuery spacing="condensed">
  {rows}
</List>
```

## Accessibility

- `ListRow` sets `aria-live="polite"` automatically when `renderExpanded` is present — do not add a duplicate live region.
- Pass `expandedRowAriaLabel` to label the revealed `role="region"`.
- `onClick` on `ListRow` adds `role="button"` and keyboard Enter support automatically.
- For sortable columns pass `aria-sort` on the relevant `ListCol`.
- Ordered lists (`as="ol"`) must include at least one `ListCol type="header"` per row for numbering to render correctly.
