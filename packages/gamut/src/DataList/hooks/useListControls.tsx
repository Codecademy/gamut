import { useCallback, useMemo } from 'react';

import { ColumnConfig, DataListControls, Query, QueryValues } from '..';

const SELECT_COLUMN = {
  key: 'select',
  label: '',
  size: 'content',
} as ColumnConfig<any>;
const EXPAND_COLUMN = {
  key: 'expand',
  label: '',
  size: 'content',
} as ColumnConfig<any>;

export function useListControls<
  Rows,
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey],
  Cols extends ColumnConfig<Rows>[]
>({
  idKey,
  rows,
  columns: rawColumns,
  renderExpanded,
  selectedRows = [],
  expandedRows = [],
  query,
  onQueryChange,
  onRowSelect,
  onRowExpand,
}: DataListControls<Rows, IdKey, Ids, Cols>) {
  const isExpandable = !!onRowExpand && !!renderExpanded;
  const isSelectable = !!onRowSelect;
  const allSelected = rows.length === selectedRows?.length;

  const rowIds = rows.map(({ [idKey]: id }) => id as Ids);

  const columns = useMemo(() => {
    const computedColumns = [...rawColumns];

    if (isSelectable) {
      computedColumns.unshift(SELECT_COLUMN);
    }
    if (isExpandable) {
      computedColumns.push(EXPAND_COLUMN);
    }

    return computedColumns;
  }, [rawColumns, isExpandable, isSelectable]);

  const onSelect = useCallback(
    (selectedId) => {
      if (selectedRows.includes(selectedId)) {
        onRowSelect?.(selectedRows.filter((id) => id !== selectedId));
      } else {
        onRowSelect?.([...selectedRows, selectedId]);
      }
    },
    [selectedRows, onRowSelect]
  );

  const onSelectAll = useCallback(() => {
    if (allSelected) {
      onRowSelect?.([]);
    } else {
      onRowSelect?.(rowIds);
    }
  }, [rowIds, onRowSelect, allSelected]);

  const onQuery = useCallback(
    (
      type: keyof Query<Rows>,
      dimension: keyof Rows,
      value: QueryValues<Rows>
    ) => {
      if (value === 'none') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [dimension]: omit, ...nextQuery } = query?.[type];
        onQueryChange?.({
          ...query,
          [type]: nextQuery,
        });
      } else {
        onQueryChange?.({
          ...query,
          [type]: {
            ...query?.[type],
            [dimension]: value,
          },
        });
      }
    },
    [onQueryChange, query]
  );

  const onExpand = useCallback(
    (id: Ids) => {
      if (expandedRows.includes(id)) {
        onRowExpand?.(expandedRows.filter((expandedId) => expandedId !== id));
      } else {
        onRowExpand?.([...expandedRows, id]);
      }
    },
    [expandedRows, onRowExpand]
  );

  return { columns, allSelected, onSelectAll, onSelect, onQuery, onExpand };
}
