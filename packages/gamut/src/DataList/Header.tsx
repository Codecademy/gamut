import React from 'react';

import { ListHeader } from '..';
import { ListCol } from '../List/ListCol';
import { QueryValues } from '.';
import { ExpandCol } from './Columns/ExpandCol';
import { SelectCol } from './Columns/SelectCol';
import { FilterControl } from './Controls/FilterControl';
import { SortControl } from './Controls/SortControl';
import { ColumnConfig, Query } from './types';

interface HeaderRowProps<Cols extends ColumnConfig<any>[]> {
  selected?: boolean;
  onSelect?: () => void;
  columns: Cols;
  query?: Query<any>;
  onQuery: (
    type: keyof Query<any>,
    dimension: keyof any,
    value: QueryValues<any>
  ) => void;
}

export function HeaderRow<Cols extends ColumnConfig<any>[]>({
  columns,
  query,
  onQuery,
  onSelect,
  selected,
}: HeaderRowProps<Cols>) {
  return (
    <ListHeader>
      {columns.map(({ key, label, queryType, options, ...colProps }) => {
        const renderKey = `header-col-${String(key)}`;
        const columnText = label || key;

        if (key === 'select') {
          return (
            <SelectCol id="header" selected={selected} onSelect={onSelect} />
          );
        }
        if (key === 'expand') {
          return <ExpandCol ghost />;
        }
        switch (queryType) {
          case 'sort': {
            const direction = query?.sort?.[key as string] || 'none';
            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                <SortControl
                  columnKey={key}
                  direction={direction}
                  onQuery={onQuery}
                >
                  {columnText}
                </SortControl>
              </ListCol>
            );
          }
          case 'filter': {
            const columnFilter = query?.filter?.[key as string];

            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                <FilterControl
                  columnKey={key}
                  onQuery={onQuery}
                  filters={columnFilter}
                  options={options}
                  justify={colProps.justify}
                >
                  {columnText}
                </FilterControl>
              </ListCol>
            );
          }

          default: {
            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                {columnText}
              </ListCol>
            );
          }
        }
      })}
    </ListHeader>
  );
}
