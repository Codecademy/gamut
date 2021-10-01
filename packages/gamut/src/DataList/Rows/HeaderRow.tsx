import React from 'react';

import { ListCol, ListHeader } from '../../List';
import { OnFilter, OnSort, RowChange } from '..';
import {
  ExpandControl,
  FilterControl,
  SelectControl,
  SortControl,
} from '../Controls';
import { ColumnConfig, Query } from '../types';

interface HeaderRowProps<Row, Cols extends ColumnConfig<Row>[]> {
  id: string;
  selected?: boolean;
  onSelect?: RowChange<Row>;
  onExpand?: RowChange<Row>;
  columns: Cols;
  query?: Query<Row>;
  onSort?: OnSort<Row>;
  onFilter?: OnFilter<Row>;
}

export function HeaderRow<Row, Cols extends ColumnConfig<Row>[]>({
  id,
  columns,
  query,
  onFilter,
  onSort,
  onSelect,
  onExpand,
  selected,
}: HeaderRowProps<Row, Cols>) {
  return (
    <ListHeader>
      {onSelect && (
        <ListCol size="content">
          <SelectControl
            name={`${id}-all`}
            label="Select All"
            selected={selected}
            onSelect={() => onSelect?.({ toggle: selected })}
          />
        </ListCol>
      )}
      {columns.map(({ key, header, queryType, options, ...colProps }) => {
        const renderKey = `${id}-header-col-${String(key)}`;
        const columnText = header || key;
        switch (queryType) {
          case 'sort': {
            const direction = query?.sort?.[key] ?? 'none';
            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                <SortControl
                  columnKey={key}
                  direction={direction}
                  onSort={onSort}
                >
                  {columnText}
                </SortControl>
              </ListCol>
            );
          }
          case 'filter': {
            const columnFilter = query?.filter?.[key];

            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                <FilterControl
                  id={id}
                  columnKey={key}
                  onFilter={onFilter}
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
      {onExpand && (
        <ListCol size="content" ghost>
          <ExpandControl />
        </ListCol>
      )}
    </ListHeader>
  );
}
