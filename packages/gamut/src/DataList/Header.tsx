import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import React from 'react';

import { Checkbox, IconButton, ListHeader, Text } from '..';
import { ListCol } from '../List/ListCol';
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
    value: Query<any>[keyof Query<any>]
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
      {columns.map(({ key, label, queryType, ...colProps }) => {
        const renderKey = `header-col-${String(key)}`;
        const columnText = label || key;

        if (key === 'select') {
          return (
            <ListCol key={renderKey} size="content">
              <Checkbox
                spacing="tight"
                label={<Text screenreader>Select All Rows</Text>}
                htmlFor="select-all-rows"
                checked={selected}
                onChange={onSelect}
              />
            </ListCol>
          );
        }
        if (key === 'expand') {
          return (
            <ListCol aria-hidden key={renderKey} ghost {...colProps}>
              <IconButton size="small" icon={MiniChevronDownIcon} />
            </ListCol>
          );
        }
        switch (queryType) {
          case 'sort': {
            const direction = query?.sort[key] || 'none';
            return (
              <ListCol key={renderKey} {...colProps}>
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
              <ListCol key={renderKey} {...colProps}>
                <FilterControl
                  columnKey={key}
                  onQuery={onQuery}
                  filters={columnFilter}
                >
                  {columnText}
                </FilterControl>
              </ListCol>
            );
          }

          default: {
            return (
              <ListCol key={renderKey} {...colProps}>
                {columnText}
              </ListCol>
            );
          }
        }
      })}
    </ListHeader>
  );
}
