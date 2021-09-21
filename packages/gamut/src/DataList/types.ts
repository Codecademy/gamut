import { ReactElement } from 'react';

import { ListColProps } from '..';

export type SortDirection = 'asc' | 'desc' | 'none';

export interface Query<T> {
  filter: { [K in keyof T]?: T[K] | 'none' };
  sort: Record<keyof T, Exclude<SortDirection, 'none'>>;
}

export type QueryChangeEvent<T> = {
  nextQuery: Query<T>;
};

export interface ColumnConfig<T> {
  key: keyof T;
  label?: string;
  type?: ListColProps['type'];
  size?: ListColProps['size'];
  render?: (row: T) => ReactElement<any, any> | null;
  queryType?: keyof Query<T>;
  options?: string[];
  fill?: boolean;
  justify?: 'left' | 'right';
}

export type RowChange<T> = T[];
