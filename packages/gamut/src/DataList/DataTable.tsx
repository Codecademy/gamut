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

// USE FOR TESTING ONLY
// UNCOMMENT AND RUN THE FOLLOWING CODE TO TEST THAT size: 'content' errors

// const TestingDataTable = () => {
//   return (
//     <DataTable
//       columns={[
//         { header: 'Name', key: 'name', size: 'lg' },
//         { header: 'Age', key: 'age', size: 'sm' },
//         { header: 'Species', key: 'species', size: 'md' },
//         { header: 'Ship', key: 'ship', size: 'content' },
//       ]}
//       id="test"
//       idKey="id"
//       rows={[
//         { id: 1, name: 'John Doe', age: 30, species: 'Human', ship: 'USS Enterprise' },
//         { id: 2, name: 'Jane Doe', age: 25, species: 'Human', ship: 'USS Enterprise' },
//         { id: 3, name: 'John Smith', age: 35, species: 'Human', ship: 'USS Enterprise' },
//       ]}
//     />
//   )
// }
