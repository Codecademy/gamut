# DataList

Item-focused list for managing, engaging with, and expanding individual rows. Use when users interact with items — opening details, selecting for bulk actions, or viewing expanded layouts — rather than scanning and comparing data across rows (that's `DataTable`, see `components/data-table.md`).

## When to use DataList

- Users **open, expand, or engage** with individual items (content libraries, assignment lists, course catalogs).
- Rows need **expandable detail panels** with rich layouts.
- Users need to **select rows** for bulk actions.
- Items contain **icons, graphics, or complex layouts** rather than plain metrics.

**Do not use DataList when:** the goal is to **compare data across rows** → `DataTable`; the list is small, static, and needs fully custom row layouts → `List` (`components/list.md`); you need horizontal scrolling → `DataTable` (DataList is not scrollable).

## Design principles

- **Engage with individual items**: design each row to support the action users take on it (open, launch, select, expand).
- **Customize items with rich content**: icons, progress indicators, graphics, and other atoms are appropriate within rows.
- **Keep item controls visible**: action controls should be on the right side of the row.
- **Place lists inside main containers**: avoid overflow by placing DataList in appropriately sized parent layouts.

## Variants

| `variant` | Use for                                                                            |
| --------- | ---------------------------------------------------------------------------------- |
| `default` | Standard bordered rows; best for most item-management layouts                      |
| `card`    | Rows with vertical gap; best for content that doesn't need to be visually adjacent |

## Props

| Prop                    | Type                            | Default             | Notes                                                                                            |
| ----------------------- | ------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `id`                    | string                          | required            | Unique ID for the list                                                                           |
| `idKey`                 | `keyof Row`                     | required            | Row identifier — must be a string/number field                                                   |
| `rows`                  | `Row[]`                         | required            | Data array                                                                                       |
| `columns`               | `ColumnConfig<Row>[]`           | required            | Column definitions — identical shape to DataTable's, see `components/data-table.md#columnconfig` |
| `query`                 | `Query<Row>`                    | —                   | Current sort/filter state                                                                        |
| `onQueryChange`         | `OnQueryChange<Row>`            | —                   | Called when sort or filter changes                                                               |
| `selected`              | `Row[IdKey][]`                  | —                   | Array of selected row IDs                                                                        |
| `onRowSelect`           | row-select-change handler       | —                   | Called on row or select-all toggle                                                               |
| `expanded`              | `Row[IdKey][]`                  | —                   | Array of expanded row IDs                                                                        |
| `onRowExpand`           | row-expand-change handler       | —                   | Called when a row is expanded or collapsed                                                       |
| `expandedContent`       | `({ row, onCollapse }) => node` | —                   | Render function for expanded row content                                                         |
| `variant`               | `'default' \| 'card'`           | `'default'`         | Row visual style                                                                                 |
| `header`                | boolean                         | —                   | Whether to show a header row                                                                     |
| `hideSelectAll`         | boolean                         | `false`             | Hides the select-all checkbox in the header                                                      |
| `loading`               | boolean                         | `false`             | Replaces row content with shimmer placeholders                                                   |
| `spacing`               | `'condensed' \| 'normal'`       | `'condensed'`       | Row padding                                                                                      |
| `emptyMessage`          | node                            | default empty state | Rendered when `rows` is empty                                                                    |
| `disableContainerQuery` | boolean                         | `false`             | Falls back to media queries instead of container queries                                         |

> DataList always sets `scrollable={false}`. For a horizontally scrollable table, use `DataTable`.

## Basic usage

```jsx
const { DataList, useLocalQuery } = window.CodecademyGamut;

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

Pass `expandedContent`, `expanded`, and `onRowExpand` together. `expandedContent` receives `{ row, onCollapse }` — call `onCollapse` from within the panel to close it programmatically.

```jsx
const [expanded, setExpanded] = useState([]);

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

Pass `selected` and `onRowSelect` to enable checkboxes. The callback receives `{ type, payload: { rowId, toggle } }` where `type` is `'select'` or `'select-all'`. Omit both to hide row checkboxes entirely; pass `hideSelectAll` to hide only the select-all checkbox.

```jsx
const [selected, setSelected] = useState([]);

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

Expansion and selection can be active at once — pass all four props together.

## Sorting and filtering with `useLocalQuery`

Handles client-side sort/filter state — spread its return value directly into `DataList`. Mark columns `sortable` or provide `filters`. For server-side filtering/pagination, manage `query`/`onQueryChange` externally instead.

## Empty and loading states

```jsx
<DataList id="my-list" idKey="id" columns={columns} rows={[]} emptyMessage={<Text>No items yet.</Text>} />
<DataList id="my-list" idKey="id" columns={columns} rows={[]} loading />
```

## Container queries

Uses CSS container queries by default. Disable (`disableContainerQuery`) only when the list lives in a constrained container or you're managing your own responsive logic.

## Accessibility

- Renders as a semantic `<table>` via the underlying `List as="table"`.
- Expanded rows receive `aria-live="polite"` automatically — do not add a duplicate live region.
- The expanded content region is labeled by the row's header column text; provide meaningful header column values.
- Selection checkboxes are grouped as a checkbox list; the select-all checkbox is in the `<thead>`.
- For custom `emptyMessage`, use `tbody > tr > th` structure for valid table semantics.
