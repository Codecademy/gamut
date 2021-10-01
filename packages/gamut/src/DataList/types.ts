import { ReactElement } from 'react';

import { ListColProps } from '..';

export type SortDirection = 'asc' | 'desc' | 'none';

export type Filter<T> = { [K in keyof T]?: T[K][] };

export type Sort<T> = { [K in keyof T]?: Exclude<SortDirection, 'none'> };

export interface PaginatedQuery {
  page: number;
  size: number;
  total: number;
}

export interface Query<T = {}> {
  filter?: Filter<T>;
  sort?: Sort<T>;
}

export type FilterValues<T> = Filter<T>[keyof T];

export type QueryType = keyof Query;

export interface OnQuery<T = any> {
  <Q extends QueryType>(
    type: QueryType,
    dimension: keyof T,
    value: Q extends 'sort' ? SortDirection : FilterValues<T>
  ): void;
}

export interface OnQueryChange<T> {
  (change: { type: QueryType; dimension: keyof T; next: Query<T> }): void;
}

export type IdentifiableKeys<T> = Extract<
  keyof T,
  keyof {
    [K in keyof T as T[K] extends string | number ? K : never]: T[K];
  }
>;

export interface ColumnConfig<T> {
  key: keyof T;
  label?: string;
  type?: ListColProps['type'];
  size?: ListColProps['size'];
  render?: (row: T) => ReactElement<any, any> | null;
  queryType?: QueryType;
  options?: string[];
  fill?: boolean;
  justify?: 'left' | 'right';
}

export interface RowStateChange<Types, Ids> {
  (change: { type: Types; rowId?: Ids; next: Ids[] }): void;
}

export type SelectEvents = 'select' | 'deselect' | 'all' | 'none';

export type ExpandEvents = 'expand' | 'collapse';

export interface ExpandRow<Row> {
  (props: { row: Row; onCollapse: () => void }): React.ReactNode;
}

export interface DataListControls<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> {
  idKey: IdKey;
  rows: Row[];
  expanded?: Row[IdKey][];
  selected?: Row[IdKey][];
  columns: Cols;
  query?: Query<Row>;
  onQueryChange?: OnQueryChange<Row>;
  onRowSelect?: RowStateChange<SelectEvents, Row[IdKey]>;
  onRowExpand?: RowStateChange<ExpandEvents, Row[IdKey]>;
  expandedContent?: ExpandRow<Row>;
}
