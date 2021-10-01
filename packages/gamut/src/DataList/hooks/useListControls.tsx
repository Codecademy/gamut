import { useCallback } from 'react';

import {
  ColumnConfig,
  DataListControls,
  IdentifiableKeys,
  OnFilter,
  OnSort,
  RowChange,
} from '..';

export function useListControls<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
>({
  columns,
  onQueryChange,
  onRowExpand,
  onRowSelect,
  expandedContent,
}: DataListControls<Row, IdKey, Cols>) {
  const expandable = !!onRowExpand && !!expandedContent;
  const selectable = !!onRowSelect;

  const onSelect: RowChange<Row[IdKey]> = useCallback(
    (payload) => {
      onRowSelect?.({
        type: 'select',
        payload,
      });
    },
    [onRowSelect]
  );

  const onSelectAll: RowChange<Row[IdKey]> = useCallback(
    (payload) => {
      onRowSelect?.({
        type: 'select-all',
        payload,
      });
    },
    [onRowSelect]
  );

  const onExpand: RowChange<Row[IdKey]> = useCallback(
    (payload) => {
      onRowExpand?.({
        type: 'expand',
        payload,
      });
    },
    [onRowExpand]
  );

  const onSort: OnSort<Row> = useCallback(
    (payload) => {
      onQueryChange?.({
        type: 'sort',
        payload,
      });
    },
    [onQueryChange]
  );

  const onFilter: OnFilter<Row> = useCallback(
    (payload) => {
      onQueryChange?.({
        type: 'filter',
        payload,
      });
    },
    [onQueryChange]
  );

  return {
    columns,
    onSelectAll: selectable ? onSelectAll : undefined,
    onSelect: selectable ? onSelect : undefined,
    onExpand: expandable ? onExpand : undefined,
    onFilter,
    onSort,
  };
}
