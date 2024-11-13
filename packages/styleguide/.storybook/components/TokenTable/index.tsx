import { ReactElement } from 'react';
import { Table, Row, Col, ColProps } from './elements';

interface Row {
  [key: string]: unknown;
}
interface ColumnConfig<T extends Row> {
  key: keyof T extends string ? keyof T : string;
  name?: string;
  size?: ColProps['size'];
  render?: (row: T) => ReactElement<any, any> | null;
}

interface DataTableProps<T extends Row> {
  bg?: boolean;
  idKey: keyof T;
  rows: T[];
  columns: ColumnConfig<T>[];
}

export const TokenTable = <T extends Row>({
  bg = true,
  columns,
  idKey = 'id',
  rows,
}: DataTableProps<T>): ReactElement<any, any> => {
  return (
    <Table as="div" bg={bg ? 'white' : undefined}>
      <Row>
        {columns.map(({ key, name, size }) => (
          <Col key={`header-col-${key}`} variant="header" size={size}>
            {name ? name : key}
          </Col>
        ))}
      </Row>
      {rows.map((row, i) => (
        <Row key={`${row[idKey]}-row`}>
          {columns.map(({ key, size, render }) => (
            <Col key={`${row[idKey]}-col-${key}`} size={size}>
              {render ? render(row) : (row[key] as string)}
            </Col>
          ))}
        </Row>
      ))}
    </Table>
  );
};
