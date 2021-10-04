import React, { ComponentProps, useMemo } from 'react';

import { List } from '../List';
import { DataListControls, IdentifiableKeys } from '.';
import { ListControlContext, useListControls } from './hooks/useListControls';
import { ListStateContext } from './hooks/useListState';
import { HeaderRow } from './Rows/HeaderRow';
import { DataRow } from './Rows/Row';
import { ColumnConfig } from './types';

export interface DataListProps<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> extends DataListControls<Row, IdKey, Cols>,
    Omit<ComponentProps<typeof List>, 'header' | 'id'> {
  loading?: boolean;
}

export function DataList<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
>(props: DataListProps<Row, IdKey, Cols>) {
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
    ...rest
  } = props;

  const allSelected = useMemo(() => {
    const ids = rows.map(({ [idKey]: id }) => id);
    const unselected = ids.filter((id) => !selected?.includes(id));
    return unselected.length === 0;
  }, [rows, selected, idKey]);

  const selectedRows = useMemo(() => {
    return selected?.reduce((carry, next) => ({ ...carry, [next]: true }), {});
  }, [selected]);

  const expandedRows = useMemo(() => {
    return expanded?.reduce((carry, next) => ({ ...carry, [next]: true }), {});
  }, [expanded]);

  return (
    <ListStateContext.Provider value={{ query }}>
      <ListControlContext.Provider value={listControls}>
        <List
          {...rest}
          shadow={shadow}
          height={height}
          scrollable={scrollable}
          variant={variant}
          spacing={spacing}
          header={<HeaderRow columns={columns} selected={allSelected} />}
        >
          {rows.map((row) => {
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
