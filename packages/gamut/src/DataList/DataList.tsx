import { isEqual } from 'lodash';
import React, { ComponentProps, useMemo } from 'react';

import { List } from '../List';
import { DataListControls, IdentifiableKeys } from '.';
import { ListControlContext, useListControls } from './hooks/useListControls';
import { HeaderRow } from './Rows/HeaderRow';
import { DataRow } from './Rows/Row';
import { ColumnConfig } from './types';

export interface DataListProps<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> extends DataListControls<Row, IdKey, Cols>,
    Omit<ComponentProps<typeof List>, 'header' | 'id'> {}

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
    columns,
    idKey,
    rows,
    selected,
    expanded,
    id,
    query,
    ...rest
  } = props;

  const allSelected = useMemo(() => {
    return isEqual(
      rows.map(({ [idKey]: id }) => id),
      selected
    );
  }, [rows, selected, idKey]);

  return (
    <ListControlContext.Provider value={listControls}>
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
          />
        }
        {...rest}
      >
        {rows.map((row) => (
          <DataRow
            key={`${id}-${row[idKey]}-row`}
            id={row[idKey]}
            row={row}
            columns={columns}
            selected={selected?.includes(row[idKey])}
            expanded={expanded?.includes(row[idKey])}
          />
        ))}
      </List>
    </ListControlContext.Provider>
  );
}
