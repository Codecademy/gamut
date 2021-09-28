import { ReactElement } from 'react';

import { ListColProps } from '..';

export type SortDirection = 'asc' | 'desc' | 'none';

export type Filter<T> = { [K in keyof T]?: T[K] | T[K][] | 'none' };

export type Sort<T> = { [K in keyof T]?: Exclude<SortDirection, 'none'> };

export interface PaginatedQuery {
  page: number;
  size: number;
  total: number;
}

export interface Query<T> {
  filter?: Filter<T>;
  sort?: Sort<T>;
}

export type QueryValues<T> = Sort<T>[keyof T] | Filter<T>[keyof T];

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
