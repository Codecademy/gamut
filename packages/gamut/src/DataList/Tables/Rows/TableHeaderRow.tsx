import { memo, ReactElement } from 'react';

import { FlexBox } from '../../..';
import { ListCol, TableHeader } from '../../../List';
import {
  ExpandControl,
  FilterControl,
  SelectControl,
  SortControl,
} from '../../Controls';
import { useControlContext } from '../../hooks/useListControls';
import { ColumnConfig, Query } from '../../types';

interface HeaderComponent {
  <Row>(props: {
    columns: ColumnConfig<Row>[];
    query?: Query<Row>;
    selected?: boolean;
    empty?: boolean;
    hideSelectAll?: boolean;
  }): ReactElement<any, any>;
}

export const TableHeaderRow: HeaderComponent = ({
  columns,
  selected = false,
  empty = false,
  hideSelectAll,
}) => {
  const { expandable, selectable, onSelect, onFilter, onSort, prefixId } =
    useControlContext();

  return (
    <TableHeader>
      <>
        {selectable && (
          <ListCol size="content">
            {!hideSelectAll && (
              <SelectControl
                disabled={empty}
                label="Select All"
                name={prefixId('all')}
                rowId="header"
                selected={selected}
                onSelect={onSelect}
              />
            )}
          </ListCol>
        )}
        {columns.map(({ key, header, sortable, filters, ...colProps }) => {
          const rowProperty = key as string;
          const renderKey = prefixId(`header-col-${rowProperty}`);
          const columnText = String(header || key);

          return (
            <ListCol key={renderKey} {...colProps} columnHeader>
              <FlexBox alignItems="flex-end" gap={8} width="100%">
                {filters && (
                  <FilterControl
                    columnKey={rowProperty}
                    justify={colProps.justify}
                    options={filters}
                    onFilter={onFilter}
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
          <ListCol ghost size="content">
            <ExpandControl />
          </ListCol>
        )}
      </>
    </TableHeader>
  );
};

export const HeaderRow = memo(TableHeaderRow) as HeaderComponent;
