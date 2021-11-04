import React, { ReactElement } from 'react';

import { FlexBox } from '../..';
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
    empty?: boolean;
  }): ReactElement<any, any>;
}

export const Header: HeaderComponent = ({
  columns,
  selected = false,
  empty = false,
}) => {
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
            disabled={empty}
            rowId="header"
            name={prefixId('all')}
            label="Select All"
            onSelect={onSelect}
            selected={selected}
          />
        </ListCol>
      )}
      {columns.map(({ key, header, sortable, filters, ...colProps }) => {
        const rowProperty = key as string;
        const renderKey = prefixId(`header-col-${rowProperty}`);
        const columnText = header || key;
        return (
          <ListCol key={renderKey} {...colProps} columnHeader>
            <FlexBox gap={8} alignItems="center">
              {filters && (
                <FilterControl
                  columnKey={rowProperty}
                  onFilter={onFilter}
                  options={filters}
                  justify={colProps.justify}
                />
              )}
              {columnText}
              {sortable && (
                <SortControl columnKey={rowProperty} onSort={onSort} />
              )}
            </FlexBox>
          </ListCol>
        );
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
