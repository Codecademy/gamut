# DataTable & DataList sorting

`DataTable` and `DataList` do **not** sort data automatically. `sortable: true` on a column only renders sort UI. **You must implement sorting** via `query` and `onQueryChange`, and pass pre-sorted `rows`.

## How sorting works

1. **`sortable: true`** — enables sort toggle on the column header. Without `query` / `onQueryChange`, clicks do nothing.
2. **`query`** — `Query<Row>` holding current sort (and filter) state. `sort` maps column keys to `'asc' | 'desc'`.
3. **`onQueryChange`** — receives `QueryChangeEvent<Row>` when the user clicks a sortable header. Update `query` in your handler.
4. **Sorted rows** — sort the `rows` array yourself from `query.sort` before passing to the component.

## Required pattern

```tsx
import { useMemo, useReducer } from 'react';
import { DataTable } from '@codecademy/gamut';
import type { Query, QueryChangeEvent } from '@codecademy/gamut';

function queryReducer<Row>(
  state: Query<Row>,
  event: QueryChangeEvent<Row>
): Query<Row> {
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
}, [query.sort, rows]);

<DataTable
  id="my-table"
  idKey="id"
  rows={sortedRows}
  columns={columns}
  query={query}
  onQueryChange={onQueryChange}
/>;
```

## Rules

1. **Never use `sortable: true` without `query` and `onQueryChange`.**
2. **Always sort rows client-side** (or server-side before passing) from `query.sort`.
3. **Handle `'sort'`, `'filter'`, and `'reset'`** in the reducer even if you only use sorting.
4. **One active sort column** in standard usage — replace the previous sort entry when the user picks a new column.
5. **Import `Query` and `QueryChangeEvent`** from `@codecademy/gamut` for type safety.

**Storybook:** [Organisms / DataTable](https://gamut.codecademy.com/?path=/docs-organisms-datatable--docs)
