import { orderBy, uniq } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import { ColumnConfig, IdentifiableKeys, OnQueryChange, Query } from '..';

export interface LocalQueryShape<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
> {
  rows: Row[];
  idKey: IdKey;
  columns: Cols;
}

export const useLocalQuery = <
  Row,
  Cols extends ColumnConfig<Row>[],
  IdKey extends IdentifiableKeys<Row>
>({
  idKey,
  rows,
  columns,
}: LocalQueryShape<Row, IdKey, Cols>) => {
  const [query, setQuery] = useState<Query<Row>>({
    sort: {},
    filter: {},
  });

  const onQueryChange: OnQueryChange<Row> = useCallback(
    ({ type, payload: { dimension, value } }) => {
      setQuery((prev) => ({ ...prev, [type]: { [dimension]: value } }));
    },
    [setQuery]
  );

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
        keyof Row,
        Row[keyof Row][]
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
      const dimensions = Object.keys(sort) as (keyof Row)[];
      const directions = Object.values(sort);

      computedRows = orderBy(
        computedRows,
        dimensions.map((key) => ({ [key]: val }: Row) =>
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
    onQueryChange,
  };
};
