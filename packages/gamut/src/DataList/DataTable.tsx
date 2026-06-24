import { ReactElement } from 'react';

import { DataGrid, DataGridProps } from './DataGrid';
import { ColumnConfig, IdentifiableKeys } from './types';

export interface DataTable {
  <Row, IdKey extends IdentifiableKeys<Row>, Cols extends ColumnConfig<Row>[]>(
    props: Omit<
      DataGridProps<Row, IdKey, Cols>,
      | 'variant'
      | 'header'
      | 'onRowExpand'
      | 'onRowSelect'
      | 'expanded'
      | 'selected'
      | 'hideSelectAll'
    >
  ): ReactElement<any, any>;
}

export const DataTable: DataTable = (props) => {
  return (
    <DataGrid
      {...props}
      variant="table"
      onRowExpand={undefined}
      onRowSelect={undefined}
    />
  );
};
