import { useCallback } from 'react';

import { ColumnConfig, DataListControls, IdentifiableKeys, OnQuery } from '..';

export function useListControls<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
>({
  idKey,
  rows,
  columns,
  selected = [],
  expanded = [],
  query,
  onQueryChange,
  onRowExpand,
  onRowSelect,
  expandedContent,
}: DataListControls<Row, IdKey, Cols>) {
  const allSelected = rows.length === selected?.length;

  const expandable = !!onRowExpand && !!expandedContent;
  const selectable = !!onRowSelect;

  const rowIds = rows.map(({ [idKey]: id }) => id);

  const onSelect = useCallback(
    (id) => {
      if (selected?.includes(id)) {
        onRowSelect?.({
          type: 'deselect',
          rowId: id,
          next: selected.filter((rowId) => rowId !== id),
        });
      } else {
        onRowSelect?.({
          type: 'select',
          rowId: id,
          next: [...selected, id],
        });
      }
    },
    [selected, onRowSelect]
  );

  const onSelectAll = useCallback(
    (selected?: boolean) => {
      onRowSelect?.({
        type: selected ? 'none' : 'all',
        next: selected ? [] : rowIds,
      });
    },
    [onRowSelect, rowIds]
  );

  const onExpand = useCallback(
    (id: Row[IdKey]) => {
      if (expanded?.includes(id)) {
        onRowExpand?.({
          type: 'collapse',
          rowId: id,
          next: expanded?.filter((expandedId) => expandedId !== id),
        });
      } else {
        onRowExpand?.({
          type: 'expand',
          rowId: id,
          next: [...expanded, id],
        });
      }
    },
    [expanded, onRowExpand]
  );

  const onQuery: OnQuery<Row> = useCallback(
    (type, dimension, value) => {
      if (value === 'none') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [dimension]: omit, ...nextQuery } = query?.[type];
        onQueryChange?.({
          type,
          dimension,
          next: {
            ...query,
            [type]: nextQuery,
          },
        });
      } else {
        onQueryChange?.({
          type,
          dimension,
          next: {
            ...query,
            [type]: {
              ...query?.[type],
              [dimension]: value,
            },
          },
        });
      }
    },
    [onQueryChange, query]
  );

  return {
    columns,
    onQuery,
    allSelected,
    onSelectAll: selectable ? onSelectAll : undefined,
    onSelect: selectable ? onSelect : undefined,
    onExpand: expandable ? onExpand : undefined,
  };
}
