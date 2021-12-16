import { ReactElement, ReactNode } from 'react';

import { ListColProps } from '..';

export type SortDirection = 'asc' | 'desc' | 'none';

export type SortOrder = SortDirection[];

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

export interface OnQuery<Row, Type extends QueryType> {
  (payload: {
    dimension: keyof Row;
    value: Type extends 'sort' ? SortDirection : FilterValues<Row>;
  }): void;
}

export type OnSort<Row> = OnQuery<Row, 'sort'>;
export type OnFilter<Row> = OnQuery<Row, 'filter'>;

export type QueryChangeEvent<T> =
  | {
      type: 'filter';
      payload: {
        dimension: keyof T;
        value: FilterValues<T>;
      };
    }
  | {
      type: 'sort';
      payload: {
        dimension: keyof T;
        value: SortDirection;
      };
    }
  | { type: 'reset'; payload?: never };

export interface OnQueryChange<T> {
  (change: QueryChangeEvent<T>): void;
}

export type IdentifiableKeys<T> = Extract<
  keyof T,
  keyof {
    [K in keyof T as T[K] extends string | number | ReactNode
      ? K
      : never]: T[K];
  }
>;

export type FilterOption = string | { text: string; value: string };

export interface ColumnConfig<T> {
  key: keyof T;
  header?: string;
  type?: ListColProps['type'];
  size?: ListColProps['size'];
  render?: (row: T) => ReactElement<any, any> | null;
  sortable?: boolean;
  filters?: string[];
  options?: FilterOption[];
  fill?: boolean;
  justify?: 'left' | 'right';
}

export interface RowChange<Id> {
  (payload: { rowId?: Id; toggle?: boolean }): void;
}

export interface RowStateChange<Types, Ids> {
  (change: { type: Types; payload: { rowId?: Ids; toggle?: boolean } }): void;
}

export type SelectEvents = 'select' | 'select-all';

export type ExpandEvents = 'expand';

export interface ExpandRow<Row> {
  (props: { row: Row; onCollapse: () => void }): React.ReactNode;
}

export interface DataListControls<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> {
  id: string;
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
