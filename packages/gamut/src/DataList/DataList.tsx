import React, { ComponentProps, useCallback, useMemo } from 'react';

import { List } from '../List';
import { DataHeader } from './Header';
import { DataRow } from './Row';
import { ColumnConfig, Query } from './types';

export interface DataListProps<
  Rows,
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey],
  Cols extends ColumnConfig<Rows>[]
> extends Omit<ComponentProps<typeof List>, 'header'> {
  idKey: IdKey;
  rows: Rows[];
  columns: Cols;
  query?: Query<Rows>;
  onQueryChange?: (nextQuery: Query<Rows>) => void;
  onRowSelect?: (nextSelected: Ids[]) => void;
  onRowExpand?: (nextExpanded: Ids[]) => void;
  renderExpanded: (row: Rows) => React.ReactNode;
  expandedRows: Ids[];
  selectedRows: Ids[];
}

const SELECT_COLUMN = { key: 'select', label: '', size: 'content' } as const;
const EXPAND_COLUMN = { key: 'expand', label: '', size: 'content' } as const;

const useColumns = <T extends ColumnConfig<any>[]>(
  columns: T,
  isExpandable: boolean,
  isSelectable: boolean
) => {
  return useMemo(() => {
    const computedColumns = [...columns];
    if (isSelectable) {
      computedColumns.unshift(SELECT_COLUMN);
    }
    if (isExpandable) {
      computedColumns.push(EXPAND_COLUMN);
    }

    return computedColumns;
  }, [columns, isExpandable, isSelectable]);
};

export function DataList<
  Rows,
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey],
  Cols extends ColumnConfig<Rows>[]
>({
  idKey,
  rows,
  columns,
  renderExpanded,
  selectedRows,
  expandedRows,
  query,
  onQueryChange,
  onRowSelect,
  onRowExpand,
  variant = 'table',
  spacing = 'condensed',
  scrollable = true,
}: DataListProps<Rows, IdKey, Ids, Cols>) {
  const allSelected = rows.length === selectedRows?.length;

  const computedColumns = useColumns(columns, !!onRowExpand, !!onRowSelect);

  const onQuery = useCallback(
    (
      type: keyof Query<Rows>,
      dimension: keyof Rows,
      value:
        | Query<Rows>[keyof Query<Rows>][keyof Rows]
        | Query<Rows>[keyof Query<Rows>]
    ) => {
      if (value === 'none') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [dimension]: omit, ...nextQuery } = query?.[type];
        onQueryChange?.({
          ...query,
          [type]: nextQuery,
        } as any);
      } else {
        onQueryChange?.({
          ...query,
          [type]: {
            ...query?.[type],
            [dimension]: value,
          },
        } as Query<Rows>);
      }
    },
    [onQueryChange, query]
  );

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
      const allIds = rows.map(({ [idKey]: id }) => id) as Ids[];
      onRowSelect?.(allIds);
    }
  }, [rows, onRowSelect, allSelected, idKey]);

  const onExpand = useCallback(
    (id) => {
      if (expandedRows.includes(id)) {
        onRowExpand?.(expandedRows.filter((expandedId) => expandedId !== id));
      } else {
        onRowExpand?.([...expandedRows, id]);
      }
    },
    [expandedRows, onRowExpand]
  );

  return (
    <List
      scrollable={scrollable}
      variant={variant}
      spacing={spacing}
      header={
        <DataHeader
          columns={computedColumns}
          query={query}
          onQuery={onQuery}
          selected={allSelected}
          onSelect={onSelectAll}
        />
      }
    >
      {rows.map((row) => (
        <DataRow
          key={`${row[idKey]}-row`}
          id={row[idKey]}
          row={row}
          columns={computedColumns}
          renderExpanded={renderExpanded}
          selected={selectedRows?.includes(row[idKey] as Ids)}
          onSelect={onSelect}
          expanded={expandedRows?.includes(row[idKey] as Ids)}
          onExpand={onExpand}
        />
      ))}
    </List>
  );
}
