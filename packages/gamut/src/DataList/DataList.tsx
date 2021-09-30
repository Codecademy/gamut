import React, { ComponentProps } from 'react';

import { List } from '../List';
import { DataListControls } from '.';
import { useListControls } from './hooks/useListControls';
import { HeaderRow } from './Rows/HeaderRow';
import { DataRow } from './Rows/Row';
import { ColumnConfig } from './types';

export interface DataListProps<
  Row,
  IdKey extends keyof Row,
  RowIds extends Row[IdKey],
  Cols extends ColumnConfig<Row>[]
> extends DataListControls<Row, IdKey, RowIds, Cols>,
    Omit<ComponentProps<typeof List>, 'header'> {
  id: string;
}

export function DataList<
  Rows,
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey],
  Cols extends ColumnConfig<Rows>[]
>({
  id,
  idKey,
  rows,
  columns: rawColumns,
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
  ...rest
}: DataListProps<Rows, IdKey, Ids, Cols>) {
  const {
    columns,
    onQuery,
    onSelect,
    onSelectAll,
    allSelected,
    onExpand,
  } = useListControls({
    query,
    onQueryChange,
    expandedRows,
    onRowExpand,
    renderExpanded,
    onRowSelect,
    selectedRows,
    idKey,
    columns: rawColumns,
    rows,
  });

  return (
    <List
      scrollable={scrollable}
      variant={variant}
      spacing={spacing}
      header={
        <HeaderRow
          id={id}
          columns={columns}
          query={query}
          onQuery={onQuery}
          selected={allSelected}
          onSelect={onSelectAll}
        />
      }
      {...rest}
    >
      {rows.map((row) => (
        <DataRow
          key={`${id}-${row[idKey]}-row`}
          idPrefix={id}
          id={row[idKey]}
          row={row}
          columns={columns}
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
