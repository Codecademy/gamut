import React, { ComponentProps, useCallback, useMemo } from 'react';

import { List } from '../List';
import { QueryValues } from '.';
import { HeaderRow } from './Header';
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
  renderExpanded?: (row: Rows) => React.ReactNode;
  expandedRows?: Ids[];
  selectedRows?: Ids[];
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

const useSelectableRows = <
  Rows,
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey]
>(
  rows: Rows[],
  selectedRows: Ids[] = [],
  idKey: IdKey,
  onRowSelect?: (nextSelected: Ids[]) => void
) => {
  const allSelected = rows.length === selectedRows?.length;
  const rowIds = rows.map(({ [idKey]: id }) => id as Ids);
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

  return { allSelected, onSelect, onSelectAll };
};

const useExpandableRows = <Ids extends any>(
  expandedRows: Ids[] = [],
  onRowExpand?: (ids: Ids[]) => void
) => {
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

  return { onExpand };
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
  const computedColumns = useColumns(columns, !!onRowExpand, !!onRowSelect);
  const { onSelect, onSelectAll, allSelected } = useSelectableRows(
    rows,
    selectedRows,
    idKey,
    onRowSelect
  );
  const { onExpand } = useExpandableRows(expandedRows, onRowExpand);

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

  return (
    <List
      scrollable={scrollable}
      variant={variant}
      spacing={spacing}
      header={
        <HeaderRow
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
