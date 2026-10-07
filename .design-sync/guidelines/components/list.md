# List

Structured, repeating layouts built from `List`, `ListRow`, `ListCol`, and `TableHeader`. Colors, borders, and spacing are wired through the `variant` and `spacing` props — do not override these with raw CSS values.

## When to use List

List is for **fully custom, manually composed layouts**. Reach for a higher-level component first:

- Data that needs **sorting, filtering, or query state** → use `DataTable` or `DataList` instead of wiring these up manually in List (see `components/data-table.md` and `components/data-list.md`).
- Rows that need **expansion or row selection** → use `DataList`.

Use List directly when:

- You need fully custom row/column composition that DataTable or DataList cannot accommodate.
- Displaying repetitive content where individual rows may contain interactive elements, metrics, or controls — use List, not Card.
- Comparing data across rows with a fully custom layout — use `variant="table"` (or `as="table"`) rather than a plain `<table>`.
- Needing numbered rows — use `as="ol"`.
- **Needing multiple expandable/disclosure-style items** — use List's expandable row pattern (below), not multiple standalone `Disclosure` components. `Disclosure` is for a single, isolated expandable container only.

## Variants

| `variant` | Use for                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------- |
| `default` | Rows with abstract content (buttons, custom renders); bordered, no gutter                          |
| `table`   | Metrics or comparable data; alternating row backgrounds                                            |
| `card`    | Content that doesn't need to be adjacent (e.g. progress items); bordered rows with vertical gutter |
| `block`   | Feature-forward designs or page scaffolding; always on a colored background                        |
| `plain`   | Minimal styling — no borders or backgrounds; apply custom styles per row via Emotion `styled`      |

```jsx
const { List, ListRow, ListCol } = window.CodecademyGamut;

<List variant="default">{rows}</List>
<List variant="table">{rows}</List>
<List variant="card">{rows}</List>
<List variant="block">{rows}</List>
<List variant="plain">{rows}</List>
```

## Spacing

| `spacing`   | Use for                                      |
| ----------- | -------------------------------------------- |
| `normal`    | Mixed content that needs room for components |
| `condensed` | Default choice; reduced padding between rows |
| `compact`   | Tightest layout; data-dense views            |

## `as` prop

Default is `ul`. Pass `as="ol"` for numbered rows or `as="table"` for semantic table output.

```jsx
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
| `header`                | node                                                   | —           | Node rendered above the row list                         |
| `emptyMessage`          | node                                                   | —           | Shown when children is empty                             |
| `loading`               | boolean                                                | —           | Shows placeholder while data loads                       |
| `scrollable`            | boolean                                                | `false`     | Enables horizontal scroll with sticky first column       |
| `shadow`                | boolean                                                | `false`     | Right-side shadow when scrollable content overflows      |
| `disableContainerQuery` | boolean                                                | `false`     | Falls back to media queries instead of container queries |
| `rowBreakpoint`         | `'xs' \| 'sm' \| 'md'`                                 | `'xs'`      | Breakpoint at which columns stack                        |

### ListRow

| Prop                   | Type                | Notes                                                                   |
| ---------------------- | ------------------- | ----------------------------------------------------------------------- |
| `expanded`             | boolean             | Required when `renderExpanded` is set                                   |
| `renderExpanded`       | `() => node`        | Content revealed when `expanded` is true; animates in/out               |
| `expandedRowAriaLabel` | string              | `aria-label` for the revealed region                                    |
| `onClick`              | mouse event handler | Makes the full row interactive (adds `role="button"`, keyboard support) |

### ListCol `type`

| `type`          | Use for                                                |
| --------------- | ------------------------------------------------------ |
| `header`        | Primary label column; sticky when `List` is scrollable |
| `content`       | Secondary text content                                 |
| `control`       | Action controls (buttons, menus)                       |
| `expand`        | Expanded content area                                  |
| `expandControl` | The toggle button column (no right-padding)            |
| `select`        | Checkbox / selection column                            |

`size`: `'content'` (default, fits content) | `'sm'` | `'md'` | `'lg'` | `'xl'`. Pass `fill` to grow a column to fill remaining space.

## Expandable rows

Two patterns, both animate open/closed via framer-motion.

**Expand on button click** — `ExpandControl` in a `type="expandControl"` column:

```jsx
const [isExpanded, setExpanded] = useState(false);

<ListRow
  expanded={isExpanded}
  renderExpanded={() => <Text>Revealed content</Text>}
  expandedRowAriaLabel="Row details"
>
  <ListCol type="header">Row label</ListCol>
  <ListCol type="expandControl">
    <ExpandControl
      expanded={isExpanded}
      onExpand={() => setExpanded(!isExpanded)}
    />
  </ListCol>
</ListRow>;
```

**Expand on row click** — pass `onClick` to `ListRow`; it gets `role="button"` and keyboard Enter support automatically.

## List of disclosure-style items

For two or more expandable items (an FAQ, an accordion, a list of sections), use `List` + `ListRow` with `expanded`/`renderExpanded` — never render multiple standalone `Disclosure` components:

```jsx
// correct
<List variant="default" spacing="normal">
  {items.map(({ id, title, body }) => (
    <ListRow key={id} expanded={expandedIds.includes(id)} renderExpanded={() => <Box p={16}>{body}</Box>}>
      <ListCol type="header" fill>{title}</ListCol>
      <ListCol type="expandControl">
        <ExpandControl expanded={expandedIds.includes(id)} onExpand={() => toggle(id)} />
      </ListCol>
    </ListRow>
  ))}
</List>

// wrong
<Disclosure heading="Item 1" body="..." />
<Disclosure heading="Item 2" body="..." />
```

## Empty state, loading, and scrollable layout

```jsx
<List emptyMessage={<Text>No results found.</Text>}>{rows}</List>
<List loading>{rows}</List>
<List scrollable shadow>{rows}</List>
```

## Container queries

By default `List` uses CSS container queries for responsive column stacking. Disable (`disableContainerQuery`) when the list lives in a container narrower than its breakpoint, you're managing your own responsive logic, or the list has very few rows.

## Accessibility

- `ListRow` sets `aria-live="polite"` automatically when `renderExpanded` is present — do not add a duplicate live region.
- Pass `expandedRowAriaLabel` to label the revealed region.
- `onClick` on `ListRow` adds `role="button"` and keyboard Enter support automatically.
- Ordered lists (`as="ol"`) must include at least one `ListCol type="header"` per row for numbering to render correctly.
