import { memo, ReactElement } from 'react';

import { FlexBox } from '../../..';
import { ListCol } from '../../../List';
import { useListContext } from '../../../List/ListProvider';
import {
  ExpandControl,
  FilterControl,
  SelectControl,
  SortControl,
} from '../../Controls';
import { useControlContext } from '../../hooks/useListControls';
import { useListState } from '../../hooks/useListState';
import { ColumnConfig, Query } from '../../types';
import { StyledHeaderRow } from './elements';

interface HeaderComponent {
  <Row>(props: {
    columns: ColumnConfig<Row>[];
    query?: Query<Row>;
    selected?: boolean;
    empty?: boolean;
    hideSelectAll?: boolean;
    invisible?: boolean;
  }): ReactElement<any, any>;
}

export const TableHeaderRow: HeaderComponent = ({
  columns,
  selected = false,
  empty = false,
  hideSelectAll,
  invisible = false,
}) => {
  const { expandable, selectable, onSelect, onFilter, onSort, prefixId } =
    useControlContext();
  const { variant, listType } = useListContext();
  const dataTablePadding = listType === 'table' && variant === 'table';
  const headerRowDirections = useListState().query?.sort;

  return (
    <StyledHeaderRow
      invisible={invisible}
      isDataList={listType === 'table' && variant !== 'table'}
    >
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
          const sortDirection = headerRowDirections?.[rowProperty] ?? 'none';
          const ariaSortDirection =
            sortDirection === 'none'
              ? 'none'
              : sortDirection === 'asc'
              ? 'ascending'
              : 'descending';

          return (
            <ListCol
              key={renderKey}
              {...colProps}
              aria-sort={sortable ? ariaSortDirection : undefined}
              columnHeader
              dataTablePadding={dataTablePadding}
            >
              <FlexBox alignItems="flex-end" gap={8} height="100%" width="100%">
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
    </StyledHeaderRow>
  );
};

export const HeaderRow = memo(TableHeaderRow) as HeaderComponent;
