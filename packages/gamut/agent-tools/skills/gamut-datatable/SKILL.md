---
name: gamut-datatable
description: Use this skill when building a DataTable for bulk data analysis, comparison, sorting, or filtering — including column configuration, the useLocalQuery hook, row action menus, empty/loading states, and color mode. Do not use for item management with row expansion or selection (see gamut-datalist), or for small static lists (see gamut-list).
---

# Gamut DataTable

Structured, query-capable table for bulk data analysis and comparison. Sorting, filtering, loading, and empty states are built in. Use when the goal is to scan and compare information across rows — not to manage individual items.

Source: `@codecademy/gamut` — [DataTable.tsx](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/DataList/DataTable.tsx)

See also: [`gamut-datalist`](../gamut-datalist/SKILL.md) — item-focused list with expansion and selection. [`gamut-list`](../gamut-list/SKILL.md) — lower-level list primitives for fully custom layouts. [`gamut-accessibility`](../gamut-accessibility/SKILL.md) — ARIA and keyboard interaction. [`gamut-color-mode`](../gamut-color-mode/SKILL.md) — dark/light mode with `Background`.

Storybook: [Organisms / Lists & Tables / DataTable](https://gamut.codecademy.com/?path=/docs-organisms-lists-tables-datatable--docs)

## Components

```tsx
import { DataTable } from '@codecademy/gamut';
import { useLocalQuery } from '@codecademy/gamut';
```

| Symbol          | Role                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------- |
| `DataTable`     | Root component; always renders as a `table`-variant `List` with scrolling enabled         |
| `useLocalQuery` | Client-side hook for sort/filter state; spread its return value directly into `DataTable` |

## When to use DataTable

- Displaying data that users need to **compare across rows** (metrics, scores, statuses, dates).
- When the data set needs **sorting, filtering, or both** and that logic lives client-side.
- Dashboards, admin tables, reports, and data-dense views.
- When rows are **not individually selectable or expandable** — use `DataList` if you need those.

**Do not use DataTable when:**

- Users engage with items individually (expand for details, select for bulk actions) → use [`DataList`](../gamut-datalist/SKILL.md).
- The list is small, static, and needs fully custom row layouts → use [`List`](../gamut-list/SKILL.md) directly.
- There is no data at all and you just need a layout container.

## Design principles

- **Prioritize comparison**: arrange columns to encourage scanning and finding patterns, not storytelling.
- **Surface secondary info on drill-down**: use Coachmarks, Tooltips, Modals, or Flyovers rather than cramming detail into table cells.
- **Avoid information overload**: determine what belongs en-masse vs. what should live on a detail surface. Order columns by priority; collapse lower-priority columns at smaller sizes.
- **Use cell-level interactions carefully**: anchors and links for navigation; popovers for in-context actions.

## Props

| Prop                    | Type                      | Default             | Notes                                                               |
| ----------------------- | ------------------------- | ------------------- | ------------------------------------------------------------------- |
| `id`                    | `string`                  | required            | Unique ID for the table                                             |
| `idKey`                 | `keyof Row`               | required            | Row identifier — must be a `string \| number` field                 |
| `rows`                  | `Row[]`                   | required            | Data array                                                          |
| `columns`               | `ColumnConfig<Row>[]`     | required            | Column definitions                                                  |
| `query`                 | `Query<Row>`              | —                   | Current sort/filter state; use `useLocalQuery` or manage externally |
| `onQueryChange`         | `OnQueryChange<Row>`      | —                   | Called when sort or filter changes                                  |
| `loading`               | `boolean`                 | `false`             | Replaces row content with shimmer placeholders                      |
| `spacing`               | `'condensed' \| 'normal'` | `'condensed'`       | Row padding                                                         |
| `scrollable`            | `boolean`                 | `true`              | Enables horizontal scroll with sticky first column                  |
| `shadow`                | `boolean`                 | `false`             | Shows a right-side scroll-indicator shadow                          |
| `height`                | `string`                  | `'100%'`            | Container height when `scrollable` is true                          |
| `minHeight`             | `number`                  | `0`                 | Minimum container height                                            |
| `emptyMessage`          | `ReactNode`               | default empty state | Rendered when `rows` is empty                                       |
| `showOverflow`          | `boolean`                 | —                   | Shows overflow indicators in cells                                  |
| `disableContainerQuery` | `boolean`                 | `false`             | Falls back to media queries instead of container queries            |
| `scrollToTopOnUpdate`   | `boolean`                 | `false`             | Scrolls to top when rows change                                     |
| `wrapperWidth`          | `string`                  | —                   | Custom wrapper width override                                       |

## ColumnConfig

| Field      | Type                                               | Notes                                                                                                               |
| ---------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `key`      | `keyof Row`                                        | Required; maps to a row data field                                                                                  |
| `header`   | `string`                                           | Column header label                                                                                                 |
| `type`     | `'header' \| 'control'`                            | `'header'` makes the column sticky when scrollable; `'control'` right-aligns and removes padding for action buttons |
| `size`     | `'sm' \| 'md' \| 'lg' \| 'xl'`                     | Column width; omit to fit content                                                                                   |
| `fill`     | `boolean`                                          | Expands the column to fill remaining width                                                                          |
| `justify`  | `'left' \| 'right'`                                | Cell alignment                                                                                                      |
| `sortable` | `boolean`                                          | Adds a sort toggle to the column header                                                                             |
| `filters`  | `string[]`                                         | Adds a filter dropdown with these string values                                                                     |
| `options`  | `Array<string \| { text: string; value: string }>` | Alternative to `filters` when display text differs from value                                                       |
| `render`   | `(row: Row) => ReactElement \| null`               | Custom cell renderer                                                                                                |

## Basic usage

```tsx
import { DataTable, useLocalQuery } from '@codecademy/gamut';

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

## Custom cell render

Use `render` for cells that need non-text content (status badges, progress bars, action buttons).

```tsx
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

```tsx
import {
  DataTable,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  PopoverContainer,
} from '@codecademy/gamut';
import { MiniKebabMenuIcon } from '@codecademy/gamut-icons';
import { useRef, useState } from 'react';

const RowActions = ({ rowId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <MenuItem
            onClick={() => {
              setIsOpen(false);
              setIsModalOpen(true);
            }}
          >
            View details
          </MenuItem>
        </Menu>
      </PopoverContainer>
      <Modal
        isOpen={isModalOpen}
        size="small"
        title="Details"
        onRequestClose={() => setIsModalOpen(false)}
      >
        {/* detail content */}
      </Modal>
    </Box>
  );
};

const columns = [
  { key: 'name', header: 'Name', size: 'md', type: 'header' },
  {
    key: 'id',
    header: '',
    size: 'sm',
    type: 'control',
    justify: 'right',
    render: (row) => <RowActions rowId={row.id} />,
  },
];
```

Key points:

- `closeOnViewportExit` on `PopoverContainer` closes the menu when its row scrolls out of view.
- `allowPageInteraction` lets users interact with the table while the menu is open.
- Modals opened from menu items render at `zIndex={3}` by default, above the table header.

## Scrollable table

`scrollable` defaults to `true` on DataTable. The first `type: 'header'` column sticks to the left. Add `shadow` for a visual overflow indicator.

```tsx
<DataTable id="wide-table" idKey="id" columns={columns} rows={rows} shadow />
```

## Empty state

DataTable shows a default empty state when `rows` is empty. Override with `emptyMessage`. For the `tbody > tr > th` layout pattern required for valid table semantics, see [`gamut-datalist` — Empty state](../gamut-datalist/SKILL.md#empty-state).

## Loading state

Pass `loading` to replace row content with shimmer placeholders while data fetches.

```tsx
<DataTable id="my-table" idKey="id" columns={columns} rows={[]} loading />
```

## Color mode

DataTable inherits background color from the `current-background` token. Wrap in `Background` from `@codecademy/gamut-styles` to apply a surface color and automatically switch to dark mode contrast.

```tsx
import { Background } from '@codecademy/gamut-styles';

<Background bg="black" p={8}>
  <DataTable id="dark-table" idKey="id" rows={data} columns={columns} />
</Background>;
```

## Container queries

DataTable uses CSS container queries by default for responsive column stacking. Pass `disableContainerQuery` when the table lives in a constrained container or you are managing your own responsive logic — same pattern as [`gamut-datalist`](../gamut-datalist/SKILL.md#container-queries).

## Accessibility

- DataTable renders as a semantic `<table>` element automatically.
- Sort controls receive `aria-sort` automatically when `sortable` is set on a column.
- Filter controls are keyboard-accessible via the column header dropdowns.
- For custom `emptyMessage`, use `tbody > tr > th` structure for valid table semantics (see empty state example above).
