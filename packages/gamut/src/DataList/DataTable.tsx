import React from 'react';

import { DataList, DataListProps } from './DataList';
import { ColumnConfig, IdentifiableKeys } from './types';

export interface DataTableProps<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> extends Omit<DataListProps<Row, IdKey, Cols>, 'variant'> {}

export function DataTable<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
>(props: DataTableProps<Row, IdKey, Cols>) {
  return <DataList {...props} variant="table" />;
}
