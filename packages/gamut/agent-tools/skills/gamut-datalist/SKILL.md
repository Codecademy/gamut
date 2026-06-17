---
name: gamut-datalist
description: Use this skill when building a DataList for item-focused layouts with row expansion, row selection, or rich per-item content — including expandedContent, onRowSelect, onRowExpand, variant (default/card), useLocalQuery, and empty/loading states. Do not use for bulk data comparison tables (see gamut-datatable), or for small static lists (see gamut-list).
---

# Gamut DataList

Item-focused list for managing, engaging with, and expanding individual rows. Use when users interact with items — opening details, selecting for bulk actions, or viewing expanded layouts — rather than scanning and comparing data across rows.

Source: `@codecademy/gamut` — [DataList.tsx](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/DataList/DataList.tsx)

See also: [`gamut-datatable`](../gamut-datatable/SKILL.md) — query-focused table for bulk data comparison. [`gamut-list`](../gamut-list/SKILL.md) — lower-level list primitives for fully custom layouts. [`gamut-accessibility`](../gamut-accessibility/SKILL.md) — ARIA and keyboard interaction.

Storybook: [Organisms / Lists & Tables / DataList](https://gamut.codecademy.com/?path=/docs-organisms-lists-tables-datalist--docs)

## Components

```tsx
import { DataList } from '@codecademy/gamut';
import { useLocalQuery } from '@codecademy/gamut';
```

| Symbol          | Role                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| `DataList`      | Root component; supports expansion, selection, and card/default variants                 |
| `useLocalQuery` | Client-side hook for sort/filter state; spread its return value directly into `DataList` |

## When to use DataList

- Users **open, expand, or engage** with individual items (content libraries, assignment lists, course catalogs).
- Rows need **expandable detail panels** with rich layouts.
- Users need to **select rows** for bulk actions.
- Items contain **icons, graphics, or complex layouts** rather than plain metrics.
- Optional filtering or sorting across shared attributes is needed at the list level.

**Do not use DataList when:**

- The goal is to **compare data across rows** (scores, metrics, statuses in columns) → use [`DataTable`](../gamut-datatable/SKILL.md).
- The list is small, static, and needs fully custom row layouts → use [`List`](../gamut-list/SKILL.md) directly.
- You need a table with horizontal scrolling → use `DataTable` (DataList is not scrollable).

## Design principles

- **Engage with individual items**: design each row to support the action users take on it (open, launch, select, expand).
- **Customize items with rich content**: icons, progress indicators, graphics, and other atoms are appropriate within rows.
- **Keep item controls visible**: action controls should be on the right side of the row.
- **Place lists inside main containers**: avoid overflow by placing DataList in appropriately sized parent layouts.
- **Use DataTable for comparison-first designs**: if the design is primarily about scanning data between items, reach for DataTable instead.

## Variants

```tsx
<DataList variant="default" />
```

| `variant` | Use for                                                                            |
| --------- | ---------------------------------------------------------------------------------- |
| `default` | Standard bordered rows; best for most item-management layouts                      |
| `card`    | Rows with vertical gap; best for content that doesn't need to be visually adjacent |

## Props

| Prop                    | Type                                                   | Default             | Notes                                                                    |
| ----------------------- | ------------------------------------------------------ | ------------------- | ------------------------------------------------------------------------ |
| `id`                    | `string`                                               | required            | Unique ID for the list                                                   |
| `idKey`                 | `keyof Row`                                            | required            | Row identifier — must be a `string \| number` field                      |
| `rows`                  | `Row[]`                                                | required            | Data array                                                               |
| `columns`               | `ColumnConfig<Row>[]`                                  | required            | Column definitions                                                       |
| `query`                 | `Query<Row>`                                           | —                   | Current sort/filter state                                                |
| `onQueryChange`         | `OnQueryChange<Row>`                                   | —                   | Called when sort or filter changes                                       |
| `selected`              | `Row[IdKey][]`                                         | —                   | Array of selected row IDs                                                |
| `onRowSelect`           | `RowStateChange<'select' \| 'select-all', Row[IdKey]>` | —                   | Called on row or select-all toggle                                       |
| `expanded`              | `Row[IdKey][]`                                         | —                   | Array of expanded row IDs                                                |
| `onRowExpand`           | `RowStateChange<'expand', Row[IdKey]>`                 | —                   | Called when a row is expanded or collapsed                               |
| `expandedContent`       | `ExpandRow<Row>`                                       | —                   | Render function for expanded row content; receives `{ row, onCollapse }` |
| `variant`               | `'default' \| 'card'`                                  | `'default'`         | Row visual style                                                         |
| `header`                | `boolean`                                              | —                   | Whether to show a header row                                             |
| `hideSelectAll`         | `boolean`                                              | `false`             | Hides the select-all checkbox in the header                              |
| `loading`               | `boolean`                                              | `false`             | Replaces row content with shimmer placeholders                           |
| `spacing`               | `'condensed' \| 'normal'`                              | `'condensed'`       | Row padding                                                              |
| `emptyMessage`          | `ReactNode`                                            | default empty state | Rendered when `rows` is empty                                            |
| `disableContainerQuery` | `boolean`                                              | `false`             | Falls back to media queries instead of container queries                 |

> DataList always sets `scrollable={false}`. For a horizontally scrollable table, use `DataTable`.

## ColumnConfig

Identical to DataTable — see [`gamut-datatable`](../gamut-datatable/SKILL.md#columnconfig) for the full table.

## Basic usage

```tsx
import { DataList, useLocalQuery } from '@codecademy/gamut';

const columns = [
  { key: 'title', header: 'Title', size: 'md', type: 'header', fill: true },
  { key: 'status', header: 'Status', size: 'sm' },
];

const MyList = ({ data }) => {
  const queryData = useLocalQuery({ idKey: 'id', rows: data, columns });

  return <DataList id="my-list" idKey="id" columns={columns} {...queryData} />;
};
```

## Expandable rows

Pass `expandedContent`, `expanded`, and `onRowExpand` together. The `expandedContent` render function receives `{ row, onCollapse }` — call `onCollapse` from within the expanded panel to close it programmatically.

```tsx
const [expanded, setExpanded] = useState<string[]>([]);

const handleExpand = ({ type, payload: { rowId, toggle } }) => {
  if (type === 'expand') {
    setExpanded((prev) =>
      toggle ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  }
};

<DataList
  id="expandable-list"
  idKey="id"
  columns={columns}
  rows={data}
  expanded={expanded}
  onRowExpand={handleExpand}
  expandedContent={({ row, onCollapse }) => (
    <Box p={16}>
      <Text>{row.title}: additional details here</Text>
      <TextButton onClick={onCollapse}>Collapse</TextButton>
    </Box>
  )}
/>;
```

## Selectable rows

Pass `selected` and `onRowSelect` to enable checkboxes. The callback receives `{ type, payload: { rowId, toggle } }` where `type` is `'select'` or `'select-all'`.

```tsx
const [selected, setSelected] = useState<string[]>([]);

const handleSelect = ({ type, payload: { rowId, toggle } }) => {
  if (type === 'select-all') {
    setSelected((prev) => (prev.length > 0 ? [] : data.map((r) => r.id)));
  } else if (type === 'select') {
    setSelected((prev) =>
      toggle ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  }
};

<DataList
  id="selectable-list"
  idKey="id"
  columns={columns}
  rows={data}
  selected={selected}
  onRowSelect={handleSelect}
/>;
```

To hide row checkboxes entirely, omit `onRowSelect` and `selected`. To hide only the select-all checkbox, pass `hideSelectAll`.

## Expansion + selection combined

Both can be active at once — pass all four props together.

```tsx
<DataList
  id="full-list"
  idKey="id"
  columns={columns}
  rows={data}
  selected={selected}
  onRowSelect={handleSelect}
  expanded={expanded}
  onRowExpand={handleExpand}
  expandedContent={({ row }) => <ExpandedDetail row={row} />}
/>
```

## Sorting and filtering with useLocalQuery

`useLocalQuery` handles client-side sort and filter state. Spread its return value directly into `DataList`. Mark columns as `sortable` or provide `filters` in the column config.

```tsx
const columns = [
  { key: 'title', header: 'Title', size: 'md', sortable: true },
  {
    key: 'type',
    header: 'Type',
    size: 'sm',
    filters: ['Course', 'Path', 'Project'],
  },
];

const queryData = useLocalQuery({ idKey: 'id', rows: data, columns });

<DataList id="my-list" idKey="id" columns={columns} {...queryData} />;
```

For server-side filtering or pagination, manage `query` and `onQueryChange` externally instead of using `useLocalQuery`.

## Empty state

DataList shows a default empty state when `rows` is empty. Override with `emptyMessage`.

```tsx
<DataList
  id="my-list"
  idKey="id"
  columns={columns}
  rows={[]}
  emptyMessage={
    <Box as="tbody" height="100%" width="100%">
      <FlexBox
        as="tr"
        height="inherit"
        position="absolute"
        width="inherit"
        zIndex={1}
      >
        <FlexBox
          as="th"
          center
          column
          left="calc(50% - 115px)"
          p={16}
          position="sticky"
          top="calc(50% - 115px)"
          width="fit-content"
        >
          <Text>No items yet.</Text>
        </FlexBox>
      </FlexBox>
    </Box>
  }
/>
```

## Loading state

Pass `loading` to replace row content with shimmer placeholders while data fetches.

```tsx
<DataList id="my-list" idKey="id" columns={columns} rows={[]} loading />
```

## Container queries

DataList uses CSS container queries by default. Disable only when the list lives in a constrained container or you are managing your own responsive logic.

```tsx
<div style={{ width: '280px' }}>
  <DataList
    disableContainerQuery
    id="sidebar-list"
    idKey="id"
    rows={data}
    columns={columns}
  />
</div>
```

## Accessibility

- DataList renders as a semantic `<table>` via the underlying `List as="table"`.
- Expanded rows receive an `aria-live="polite"` region automatically — do not add a duplicate live region.
- The expanded content region is labeled by the row's header column text; provide meaningful header column values.
- Selection checkboxes are grouped as a checkbox list; the select-all checkbox is in the `<thead>`.
- For custom `emptyMessage`, use `tbody > tr > th` structure for valid table semantics.
