# Recipe: rows of data with a status indicator

The pattern that gets rebuilt from `FlexBox` rows most often: a list of
items where each row shows a status (assigned/in-progress/completed,
overdue/on-track, etc.). Use `DataList` + `Badge` — not `FlexBox` rows with
manually styled dividers and colored text.

```jsx
const { DataList, Badge, useLocalQuery } = window.CodecademyGamut;

const columns = [
  { key: 'title', header: 'Title', size: 'md', type: 'header', fill: true },
  { key: 'dueDate', header: 'Due', size: 'sm' },
  {
    key: 'status',
    header: 'Status',
    size: 'sm',
    render: (row) => {
      // Badge has no built-in status-color variant — use variant="custom"
      // with semantic tokens (never hex, never a raw palette guess).
      const bg =
        row.status === 'overdue'
          ? 'feedback-error'
          : row.status === 'completed'
          ? 'feedback-success'
          : 'text-secondary';
      return (
        <Badge variant="custom" bg={bg} textColor="background">
          {row.status}
        </Badge>
      );
    },
  },
];

const AssignedTraining = ({ items }) => {
  const queryData = useLocalQuery({ idKey: 'id', rows: items, columns });
  return (
    <DataList
      id="assigned-training"
      idKey="id"
      columns={columns}
      {...queryData}
    />
  );
};
```

## Why this, not `FlexBox` rows

- Row semantics, keyboard navigation, and consistent divider/density tokens come from `DataList` — reimplementing them by hand also means reimplementing their accessibility, which usually doesn't happen.
- `Badge` for the status cell, not `<Text color="feedback-error">Overdue</Text>` — a status indicator is exactly what `Badge` is for (see `components/index.md`).
- If rows need expansion or selection (not just display), see `components/data-list.md`'s expandable-rows / selectable-rows sections — still `DataList`, just with more props.
- If the goal is comparing values across rows rather than engaging with individual items, this is a `DataTable` case instead — see `components/data-table.md`.

## Overdue-item emphasis — use `Alert`, not colored `Text`

For a page-level "you have overdue items" callout (not a per-row status), use `Alert`, not ad-hoc colored text:

```jsx
const { Alert } = window.CodecademyGamut;

<Alert type="error">3 items are overdue.</Alert>;
```
