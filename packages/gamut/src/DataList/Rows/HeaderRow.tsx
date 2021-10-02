import React, { ReactElement } from 'react';

import { ListCol, ListHeader } from '../../List';
import {
  ExpandControl,
  FilterControl,
  SelectControl,
  SortControl,
} from '../Controls';
import { useControlContext } from '../hooks/useListControls';
import { ColumnConfig, Query } from '../types';

interface HeaderComponent {
  <Row>(props: {
    columns: ColumnConfig<Row>[];
    query?: Query<Row>;
    selected?: boolean;
  }): ReactElement<any, any>;
}

export const Header: HeaderComponent = ({ columns, selected }) => {
  const {
    expandable,
    selectable,
    onSelect,
    onFilter,
    onSort,
    prefixId,
  } = useControlContext();

  return (
    <ListHeader>
      {selectable && (
        <ListCol size="content">
          <SelectControl
            rowId="header"
            name={prefixId('all')}
            label="Select All"
            onSelect={onSelect}
            selected={selected}
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
            if (options?.length) {
              return (
                <ListCol key={renderKey} {...colProps} columnHeader>
                  <FilterControl
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
};

export const HeaderRow = React.memo(Header) as HeaderComponent;
