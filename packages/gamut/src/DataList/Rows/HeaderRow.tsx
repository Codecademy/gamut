import React from 'react';

import { ListCol, ListHeader } from '../../List';
import {
  ExpandControl,
  FilterControl,
  SelectControl,
  SortControl,
} from '../Controls';
import { useControlContext } from '../hooks/useListControls';
import { ColumnConfig, Query } from '../types';

interface HeaderRowProps<Row, Cols extends ColumnConfig<Row>[]> {
  id: string;
  selected?: boolean;
  columns: Cols;
  query?: Query<Row>;
}

export function HeaderRow<Row, Cols extends ColumnConfig<Row>[]>({
  id,
  columns,
  query,
  selected,
}: HeaderRowProps<Row, Cols>) {
  const {
    expandable,
    selectable,
    onSelectAll,
    onFilter,
    onSort,
    prefixId,
  } = useControlContext();

  return (
    <ListHeader>
      {selectable && (
        <ListCol size="content">
          <SelectControl
            name={prefixId('all')}
            label="Select All"
            selected={selected}
            onSelect={() => onSelectAll?.({ toggle: selected })}
          />
        </ListCol>
      )}
      {columns.map(({ key, header, queryType, options, ...colProps }) => {
        const renderKey = prefixId(`header-col-${String(key)}`);
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
      {expandable && (
        <ListCol size="content" ghost>
          <ExpandControl />
        </ListCol>
      )}
    </ListHeader>
  );
}
