import { isEqual } from 'lodash';
import React, { ComponentProps, useMemo } from 'react';

import { List } from '../List';
import { DataListControls, IdentifiableKeys } from '.';
import { useListControls } from './hooks/useListControls';
import { HeaderRow } from './Rows/HeaderRow';
import { DataRow } from './Rows/Row';
import { ColumnConfig } from './types';

export interface DataListProps<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> extends DataListControls<Row, IdKey, Cols>,
    Omit<ComponentProps<typeof List>, 'header'> {
  id: string;
}

export function DataList<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
>({
  id,
  idKey,
  rows,
  columns: rawColumns,
  expandedContent,
  selected,
  expanded,
  query,
  onQueryChange,
  onRowSelect,
  onRowExpand,
  variant = 'table',
  spacing = 'condensed',
  scrollable = true,
  ...rest
}: DataListProps<Row, IdKey, Cols>) {
  const {
    columns,
    onSort,
    onFilter,
    onSelect,
    onSelectAll,
    onExpand,
  } = useListControls({
    query,
    onQueryChange,
    expanded,
    onRowExpand,
    expandedContent,
    onRowSelect,
    selected,
    idKey,
    columns: rawColumns,
    rows,
  });

  const allSelected = useMemo(() => {
    return isEqual(
      rows.map(({ [idKey]: id }) => id),
      selected
    );
  }, [rows, selected, idKey]);

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
          selected={allSelected}
          onSort={onSort}
          onFilter={onFilter}
          onSelect={onSelectAll}
          onExpand={onExpand}
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
          renderExpanded={expandedContent}
          selected={selected?.includes(row[idKey])}
          onSelect={onSelect}
          expanded={expanded?.includes(row[idKey])}
          onExpand={onExpand}
        />
      ))}
    </List>
  );
}
