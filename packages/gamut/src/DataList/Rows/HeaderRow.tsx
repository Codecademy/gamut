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

export function Header<Row, Cols extends ColumnConfig<Row>[]>({
  id,
  columns,
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
        const rowProperty = key as string;
        const renderKey = prefixId(`header-col-${rowProperty}`);
        const columnText = header || key;
        switch (queryType) {
          case 'sort': {
            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                <SortControl columnKey={rowProperty} onSort={onSort}>
                  {columnText}
                </SortControl>
              </ListCol>
            );
          }
          case 'filter': {
            return (
              <ListCol key={renderKey} {...colProps} columnHeader>
                <FilterControl
                  id={id}
                  columnKey={rowProperty}
                  onFilter={onFilter}
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

export const HeaderRow = React.memo(Header);
