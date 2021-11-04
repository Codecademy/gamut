import { elementDragControls } from 'framer-motion/types/gestures/drag/VisualElementDragControls';
import React, { ComponentProps, useMemo } from 'react';

import { List } from '../List';
import { DataListControls, IdentifiableKeys } from '.';
import { EmptyRows } from './EmptyRows';
import { ListControlContext, useListControls } from './hooks/useListControls';
import { ListStateContext } from './hooks/useListState';
import { HeaderRow } from './Rows/HeaderRow';
import { DataRow } from './Rows/Row';
import { ColumnConfig } from './types';

export interface DataGridProps<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> extends DataListControls<Row, IdKey, Cols>,
    Omit<ComponentProps<typeof List>, 'header' | 'id'> {
  loading?: boolean;
  header?: boolean;
}

export function DataGrid<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
>(props: DataGridProps<Row, IdKey, Cols>) {
  const listControls = useListControls(props);

  const {
    variant = 'table',
    spacing = 'condensed',
    scrollable = true,
    shadow = false,
    height = scrollable ? '100%' : 'initial',
    columns,
    idKey,
    rows,
    selected,
    expanded,
    query,
    loading,
    minHeight = 0,
    header = true,
    ...rest
  } = props;

  const empty = rows.length === 0;

  const allSelected = useMemo(() => {
    if (empty) return false;
    const ids = rows.map(({ [idKey]: id }) => id);
    const unselected = ids.filter((id) => !selected?.includes(id));
    return unselected.length === 0;
  }, [rows, selected, idKey, empty]);

  const selectedRows = useMemo(() => {
    return selected?.reduce((carry, next) => ({ ...carry, [next]: true }), {});
  }, [selected]);

  const expandedRows = useMemo(() => {
    return expanded?.reduce((carry, next) => ({ ...carry, [next]: true }), {});
  }, [expanded]);

  const loadingRows = useMemo<Row[]>(() => {
    const loadingRow = {} as Record<keyof Row, string>;

    columns.forEach((elem) => {
      const { key } = elem;
      loadingRow[key] = '';
    });

    const placeholderRows = Array(5)
      .fill(loadingRow, 0)
      .map((elem, index) => ({ ...elem, [idKey]: `loading-${index}` }));

    return placeholderRows;
  }, [columns, idKey]);

  const renderedRows = loading && empty ? loadingRows : rows;

  return (
    <ListStateContext.Provider value={{ query }}>
      <ListControlContext.Provider value={listControls}>
        <List
          {...rest}
          shadow={shadow}
          height={height}
          scrollable={scrollable && (!empty || (loading && empty))}
          variant={variant}
          spacing={spacing}
          minHeight={minHeight}
          header={
            header ? (
              <HeaderRow
                columns={columns}
                selected={allSelected}
                empty={empty}
              />
            ) : null
          }
          emptyMessage={<EmptyRows />}
        >
          {renderedRows.map((row) => {
            const rowId = row[idKey];
            const key = listControls.prefixId(`${rowId}-row`);
            return (
              <DataRow
                key={key}
                id={rowId}
                row={row}
                columns={columns}
                selected={selectedRows?.[rowId]}
                expanded={expandedRows?.[rowId]}
                loading={loading}
              />
            );
          })}
        </List>
      </ListControlContext.Provider>
    </ListStateContext.Provider>
  );
}
