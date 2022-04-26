import React, { ReactElement } from 'react';

import { FlexBox } from '../..';
import { ListCol, ListHeader } from '../../List';
import { Text } from '../../Typography';
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
    hideSelectAll?: boolean;
  }): ReactElement<any, any>;
}

export const Header: HeaderComponent = ({
  columns,
  selected = false,
  empty = false,
  hideSelectAll,
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
        <ListCol size="content" maxWidth={46}>
          {!hideSelectAll && (
            <SelectControl
              disabled={empty}
              rowId="header"
              name={prefixId('all')}
              label="Select All"
              onSelect={onSelect}
              selected={selected}
            />
          )}
        </ListCol>
      )}
      {columns.map(({ key, header, sortable, filters, ...colProps }) => {
        const rowProperty = key as string;
        const renderKey = prefixId(`header-col-${rowProperty}`);
        const columnText = (
          <Text truncate="ellipsis" truncateLines={5}>
            {header || key}
          </Text>
        );
        return (
          <ListCol key={renderKey} {...colProps} columnHeader>
            <FlexBox gap={8} alignItems="flex-end" width="100%">
              {filters && (
                <FilterControl
                  columnKey={rowProperty}
                  onFilter={onFilter}
                  options={filters}
                  justify={colProps.justify}
                />
              )}
              {sortable ? (
                <SortControl columnKey={rowProperty} onSort={onSort}>
                  {columnText}
                </SortControl>
              ) : (
                columnText
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
