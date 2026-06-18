import { ReactElement } from 'react';

import { DataGrid, DataGridProps } from './DataGrid';
import { ColumnConfig, IdentifiableKeys } from './types';

export interface DataList {
  <Row, IdKey extends IdentifiableKeys<Row>, Cols extends ColumnConfig<Row>[]>(
    props: Omit<DataGridProps<Row, IdKey, Cols>, 'variant'> & {
      variant?: 'default' | 'card';
    }
  ): ReactElement<any, any>;
}

export const DataList: DataList = ({ variant = 'default', ...rest }) => {
  return (
    <DataGrid variant={variant} {...rest} scrollable={false} shadow={false} />
  );
};

// USE FOR TESTING ONLY
// UNCOMMENT AND RUN THE FOLLOWING CODE TO TEST THAT size: 'content' errors

// const TestingDataList = () => {
//   return (
//     <DataList variant="default" columns={[
//       { header: 'Name', key: 'name', size: 'lg' },
//       { header: 'Age', key: 'age', size: 'sm' },
//       { header: 'Species', key: 'species', size: 'md' },
//       { header: 'Ship', key: 'ship', size: 'content' },
//     ]}
//       id="test"
//       idKey="id"
//       rows={[
//         { id: 1, name: 'John Doe', age: 30, species: 'Human', ship: 'USS Enterprise' },
//         { id: 2, name: 'Jane Doe', age: 25, species: 'Human', ship: 'USS Enterprise' },
//         { id: 3, name: 'John Smith', age: 35, species: 'Human', ship: 'USS Enterprise' },
//       ]} />
//   )
// }
