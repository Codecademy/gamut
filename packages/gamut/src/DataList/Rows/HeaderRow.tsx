import React from 'react';

import { ListCol, ListHeader } from '../../List';
import { QueryValues } from '..';
import {
  ExpandControl,
  FilterControl,
  SelectControl,
  SortControl,
} from '../Controls';
import { ColumnConfig, Query } from '../types';

interface HeaderRowProps<Cols extends ColumnConfig<any>[]> {
  id: string;
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
  id,
  columns,
  query,
  onQuery,
  onSelect,
  selected,
}: HeaderRowProps<Cols>) {
  return (
    <ListHeader>
      {columns.map(({ key, label, queryType, options, ...colProps }) => {
        const renderKey = `${id}-header-col-${String(key)}`;
        const columnText = label || key;

        if (key === 'select') {
          return (
            <ListCol size="content" key={renderKey}>
              <SelectControl
                name={`${id}-all`}
                label="Select All"
                selected={selected}
                onSelect={() => onSelect?.()}
              />
            </ListCol>
          );
        }
        if (key === 'expand') {
          return (
            <ListCol key={renderKey} ghost>
              <ExpandControl />
            </ListCol>
          );
        }
        switch (queryType) {
          case 'sort': {
            const direction = query?.sort?.[key as string] || 'none';
            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                <SortControl
                  columnKey={key as string}
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
                  id={id}
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
