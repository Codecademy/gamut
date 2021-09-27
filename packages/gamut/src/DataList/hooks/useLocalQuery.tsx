import { orderBy, uniq } from 'lodash';
import { useMemo, useState } from 'react';

import { ColumnConfig, Query, SortDirection } from '..';

export interface LocalQueryShape<
  Rows,
  IdKey extends keyof Rows,
  Cols extends ColumnConfig<Rows>[]
> {
  rows: Rows[];
  idKey: IdKey;
  columns: Cols;
}

export const useLocalQuery = <
  Rows,
  Cols extends ColumnConfig<Rows>[],
  IdKey extends keyof Rows
>({
  idKey,
  rows,
  columns,
}: LocalQueryShape<Rows, IdKey, Cols>) => {
  const [query, setQuery] = useState<Query<Rows>>({
    sort: {},
    filter: {},
  });

  const columnsWithOptions = useMemo(() => {
    return columns.map((col) => {
      if (col.queryType === 'filter') {
        return {
          ...col,
          options: uniq(rows.map(({ [col.key]: opt }) => opt)),
        };
      }
      return col;
    });
  }, [columns, rows]);

  const sortedRows = useMemo(() => {
    const { sort, filter } = query;
    let computedRows = rows;
    if (filter) {
      const filterDimensions = Object.entries(filter) as [
        keyof Rows,
        Rows[keyof Rows][]
      ][];

      computedRows = rows.filter((row) => {
        if (filterDimensions.length === 0) return true;
        for (const [key, value] of filterDimensions) {
          if (value.length > 0) {
            if (value.includes(row[key])) {
              return false;
            }
          }
        }
        return true;
      });
    }

    if (sort) {
      const dimensions = Object.keys(sort) as (keyof Rows)[];
      const directions = Object.values(sort) as Exclude<
        SortDirection,
        'none'
      >[];

      computedRows = orderBy(
        computedRows,
        dimensions.map((key) => ({ [key]: val }: Rows) =>
          typeof val === 'string' ? val.toLowerCase() : val
        ),
        directions as []
      );
    }

    return computedRows;
  }, [query, rows]);

  return {
    idKey,
    query,
    rows: sortedRows,
    columns: columnsWithOptions,
    onQueryChange: setQuery,
  };
};
