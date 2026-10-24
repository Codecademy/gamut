# DataTable

Structured, query-capable table for bulk data analysis and comparison. Sorting, filtering, loading, and empty states are built in. Use when the goal is to scan and compare information across rows — not to manage individual items (for that, see `components/data-list.md`).

## When to use DataTable

- Displaying data that users need to **compare across rows** (metrics, scores, statuses, dates).
- The data set needs **sorting, filtering, or both** and that logic lives client-side.
- Dashboards, admin tables, reports, and data-dense views.
- Rows are **not individually selectable or expandable** — use `DataList` if you need those.

**Do not use DataTable when:** users engage with items individually (expand for details, select for bulk actions) → `DataList`; the list is small, static, and needs fully custom row layouts → `List` (`components/list.md`).

## Design principles

- **Prioritize comparison**: arrange columns to encourage scanning and finding patterns, not storytelling.
- **Surface secondary info on drill-down**: use Coachmarks, Tooltips, Modals, or Flyouts rather than cramming detail into table cells.
- **Avoid information overload**: order columns by priority; collapse lower-priority columns at smaller sizes.
- **Use cell-level interactions carefully**: anchors/links for navigation; popovers for in-context actions.

## Props

| Prop                    | Type                      | Default             | Notes                                                               |
| ----------------------- | ------------------------- | ------------------- | ------------------------------------------------------------------- |
| `id`                    | string                    | required            | Unique ID for the table                                             |
| `idKey`                 | `keyof Row`               | required            | Row identifier — must be a string/number field                      |
| `rows`                  | `Row[]`                   | required            | Data array                                                          |
| `columns`               | `ColumnConfig<Row>[]`     | required            | Column definitions                                                  |
| `query`                 | `Query<Row>`              | —                   | Current sort/filter state; use `useLocalQuery` or manage externally |
| `onQueryChange`         | `OnQueryChange<Row>`      | —                   | Called when sort or filter changes                                  |
| `loading`               | boolean                   | `false`             | Replaces row content with shimmer placeholders                      |
| `spacing`               | `'condensed' \| 'normal'` | `'condensed'`       | Row padding                                                         |
| `scrollable`            | boolean                   | `true`              | Enables horizontal scroll with sticky first column                  |
| `shadow`                | boolean                   | `false`             | Shows a right-side scroll-indicator shadow                          |
| `emptyMessage`          | node                      | default empty state | Rendered when `rows` is empty                                       |
| `disableContainerQuery` | boolean                   | `false`             | Falls back to media queries instead of container queries            |

## ColumnConfig

| Field      | Type                                                                                                                 | Notes                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `key`      | `keyof Row`                                                                                                          | Required; maps to a row data field                                                      |
| `header`   | string                                                                                                               | Column header label                                                                     |
| `type`     | `'content' \| 'header' \| 'control' \| 'select' \| 'expand' \| 'expandControl' \| 'orderedHeader' \| 'tableControl'` | `'content'` is default — see Column `type` below                                        |
| `size`     | `'content' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                          | `'content'` (default) fits cell contents                                                |
| `fill`     | boolean                                                                                                              | Expands the column to fill remaining width                                              |
| `justify`  | `'left' \| 'right'`                                                                                                  | Cell alignment                                                                          |
| `sortable` | boolean                                                                                                              | Adds a sort toggle to the column header — **you must still implement the sort** (below) |
| `filters`  | `string[]`                                                                                                           | Adds a filter dropdown with these string values                                         |
| `render`   | `(row: Row) => ReactElement \| null`                                                                                 | Custom cell renderer                                                                    |

### Column `type`

| `type`    | Use for                                                          |
| --------- | ---------------------------------------------------------------- |
| `content` | Default; secondary data columns                                  |
| `header`  | Primary label column; sticky when the table is scrollable        |
| `control` | Action controls (buttons, menus); right-aligned, reduced padding |

`DataTable` columns typically use `header` (sticky identifier) and `control` (row actions). Selection/expansion column types are handled by `DataList`, not `DataTable`.

## Basic usage

```jsx
const { DataTable, useLocalQuery } = window.CodecademyGamut;

const columns = [
  { key: 'name', header: 'Name', size: 'md', sortable: true },
  {
    key: 'role',
    header: 'Role',
    size: 'md',
    filters: ['Engineer', 'Design', 'Product'],
  },
  {
    key: 'score',
    header: 'Score',
    size: 'sm',
    sortable: true,
    justify: 'right',
  },
];

const MyTable = ({ data }) => {
  const queryData = useLocalQuery({ idKey: 'id', rows: data, columns });
  return (
    <DataTable id="my-table" idKey="id" columns={columns} {...queryData} />
  );
};
```

## `DataTable`/`DataList` do not sort data automatically — required pattern (mandatory)

Setting `sortable: true` on a column only renders the sort UI (clickable column headers with direction indicators) — without `query` and `onQueryChange`, clicking the header does nothing. **You must implement the sorting logic yourself**: sort the `rows` array based on `query.sort` before passing it to the component — Gamut does not reorder rows internally.

```jsx
import { useMemo, useReducer } from 'react';
const { DataTable } = window.CodecademyGamut;

// 1. Reducer for query state changes
function queryReducer(state, event) {
  switch (event.type) {
    case 'sort': {
      const { dimension, value } = event.payload;
      if (value === 'none') {
        const { [dimension]: _, ...rest } = state.sort ?? {};
        return { ...state, sort: rest };
      }
      return { ...state, sort: { [dimension]: value } };
    }
    case 'filter': {
      const { dimension, value } = event.payload;
      return { ...state, filter: { ...state.filter, [dimension]: value } };
    }
    case 'reset':
      return {};
    default:
      return state;
  }
}

// 2. State + derived sorted rows
const [query, onQueryChange] = useReducer(queryReducer, {});

const sortedRows = useMemo(() => {
  const sorted = [...rows];
  const sortEntries = Object.entries(query.sort ?? {});
  if (sortEntries.length > 0) {
    const [key, direction] = sortEntries[0];
    sorted.sort((a, b) => {
      const aVal = String(a[key]).toLowerCase();
      const bVal = String(b[key]).toLowerCase();
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return sorted;
}, [query.sort]);

// 3. Pass query, onQueryChange, and sorted rows
<DataTable
  id="my-table"
  idKey="id"
  rows={sortedRows}
  columns={columns}
  query={query}
  onQueryChange={onQueryChange}
/>;
```

Rules:

1. **Never use `sortable: true` without `query` and `onQueryChange`.** The sort UI will appear but clicking it will have no effect — a broken UX.
2. **Always sort the rows yourself** using `useMemo` (or equivalent) derived from `query.sort`. Pass the sorted array as the `rows` prop.
3. **Handle all `QueryChangeEvent` types** in your reducer: `'sort'`, `'filter'`, `'reset'` — even if you only use sorting, the reducer must not break on the others.
4. **`query.sort` supports only one active sort column at a time** — when the user clicks a new column, replace the previous sort entry.

## Custom cell render

```jsx
const columns = [
  { key: 'name', header: 'Name', size: 'md', type: 'header' },
  {
    key: 'status',
    header: 'Status',
    size: 'sm',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'green' : 'red'}>
        {row.status}
      </Badge>
    ),
  },
];
```

## Row action menus

Use a `type: 'control'` column with `PopoverContainer` and `Menu` for row-level actions.

```jsx
const { IconButton, Menu, MenuItem, PopoverContainer } = window.CodecademyGamut;

const RowActions = ({ rowId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  return (
    <Box display="inline-block" p={8} ref={ref}>
      <IconButton
        icon={MiniKebabMenuIcon}
        tip="Row actions"
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
      />
      <PopoverContainer
        alignment="bottom-left"
        allowPageInteraction
        closeOnViewportExit
        isOpen={isOpen}
        offset={0}
        targetRef={ref}
        onRequestClose={() => setIsOpen(false)}
      >
        <Menu borderRadius="md" spacing="normal" variant="popover">
          <MenuItem onClick={() => setIsOpen(false)}>Edit</MenuItem>
        </Menu>
      </PopoverContainer>
    </Box>
  );
};
```

`closeOnViewportExit` closes the menu when its row scrolls out of view. `allowPageInteraction` lets users interact with the table while the menu is open.

## Scrollable table, empty state, loading, color mode

`scrollable` defaults to `true` — the first `type: 'header'` column sticks to the left; add `shadow` for a visual overflow indicator. `emptyMessage` overrides the default empty state (use a `tbody > tr > th` structure for valid table semantics). Pass `loading` for shimmer placeholders. `DataTable` inherits background from the `current-background` token — wrap in `Background` to apply a surface color and auto-switch dark-mode contrast.

## Container queries

Uses CSS container queries by default for responsive column stacking. Pass `disableContainerQuery` when the table lives in a constrained container or you're managing your own responsive logic.

## Accessibility

- Renders as a semantic `<table>` automatically.
- Sort controls receive `aria-sort` automatically when `sortable` is set.
- Filter controls are keyboard-accessible via the column header dropdowns.
