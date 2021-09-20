import {
  ArrowChevronDownFilledIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps, useState } from 'react';

import {
  Box,
  Checkbox,
  FlexBox,
  FocusTrap,
  IconButton,
  ListHeader,
  Menu,
  MenuItem,
  Text,
} from '..';
import { ColHeader } from '../List/elements';
import { useListContext } from '../List/ListProvider';
import { ColumnConfig, Query, SortDirection } from './types';

const SortIcon = styled(ArrowChevronDownFilledIcon)(
  states({
    asc: {
      transform: 'rotate(180deg)',
    },
    disabled: {
      color: 'background-hover',
    },
  })
);

interface SortControlProps extends ComponentProps<typeof ColHeader> {
  columnKey: string | symbol | number;
  direction: SortDirection;
  onQuery: (
    type: keyof Query<any>,
    dimension: keyof any,
    value: Query<any>[keyof Query<any>][string]
  ) => void;
}

const SORT_DIRECTIONS = ['asc', 'desc', 'none'] as const;

const getNextSortDirection = (dir: SortDirection) => {
  const currentIdx = SORT_DIRECTIONS.indexOf(dir);
  const nextIdx =
    currentIdx === SORT_DIRECTIONS.length - 1 ? 0 : currentIdx + 1;
  return SORT_DIRECTIONS[nextIdx];
};

const SortControl: React.FC<SortControlProps> = ({
  columnKey,
  direction,
  onQuery,
  children,
  ...rest
}) => {
  return (
    <ColHeader
      onClick={() =>
        onQuery('sort', columnKey, getNextSortDirection(direction))
      }
      {...rest}
    >
      {children}
      <FlexBox column height={24} width={16} center>
        <SortIcon asc size={9} disabled={direction !== 'asc'} />
        <SortIcon size={9} disabled={direction !== 'desc'} />
      </FlexBox>
    </ColHeader>
  );
};

interface FilterControlProps extends ComponentProps<typeof ColHeader> {
  columnKey: string | symbol | number;
  options?: string[];
  filters?: string[];
  onQuery: (
    type: keyof Query<any>,
    dimension: keyof any,
    value: Query<any>[keyof Query<any>][string]
  ) => void;
}

const getNextFilters = (option: string, filters: string[]) => {
  if (filters.includes(option)) {
    return filters.filter((filt) => filt !== option);
  }
  return [...filters, option];
};

const FilterControl: React.FC<FilterControlProps> = ({
  columnKey,
  filters = [],
  onQuery,
  options = [],
  children,
  ...rest
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuProps = {
    [rest?.justify || 'left']: 0,
  };

  return (
    <ColHeader {...rest} onClick={() => setMenuOpen(true)}>
      <Box position="relative">
        {children}
        {menuOpen && (
          <Box position="absolute" top={24} {...menuProps} zIndex={0}>
            <FocusTrap
              onClickOutside={() => setMenuOpen(false)}
              onEscapeKey={() => setMenuOpen(false)}
            >
              <Menu
                spacing="condensed"
                maxHeight={300}
                overflowY="auto"
                width={300}
                variant="action"
              >
                {[...options].map((opt) => {
                  const id = `${opt}-${String(columnKey)}`;

                  const optionSelected = filters.includes(opt);
                  const onClick = () => {
                    onQuery('filter', columnKey, getNextFilters(opt, filters));
                  };

                  return (
                    <MenuItem key={opt}>
                      <Checkbox
                        htmlFor={id}
                        name={id}
                        onClick={onClick}
                        label={
                          <Text
                            variant="p-small"
                            fontFamily="base"
                            alignSelf="center"
                          >
                            {opt}
                          </Text>
                        }
                        spacing="tight"
                        checked={optionSelected}
                      />
                    </MenuItem>
                  );
                })}
              </Menu>
            </FocusTrap>
          </Box>
        )}
      </Box>
      <MiniChevronDownIcon ml={4} size={10} />
    </ColHeader>
  );
};

interface DataHeaderProps<Cols extends ColumnConfig<any>[]> {
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

export function DataHeader<Cols extends ColumnConfig<any>[]>({
  columns,
  query,
  onQuery,
  onSelect,
  selected,
}: DataHeaderProps<Cols>) {
  const { spacing, scrollable } = useListContext();
  return (
    <ListHeader>
      {columns.map(({ key, label, queryType, ...colProps }) => {
        const renderKey = `header-col-${String(key)}`;
        const columnText = label || key;
        const sticky = colProps.type === 'header' && scrollable;
        if (key === 'select') {
          return (
            <ColHeader key={renderKey} size="content" spacing={spacing}>
              <Checkbox
                spacing="tight"
                label={<Text screenreader>Select All Rows</Text>}
                htmlFor="select-all-rows"
                checked={selected}
                onChange={onSelect}
              />
            </ColHeader>
          );
        }
        if (key === 'expand') {
          return (
            <ColHeader
              aria-hidden
              key={renderKey}
              spacing={spacing}
              ghost
              {...colProps}
            >
              <IconButton size="small" icon={MiniChevronDownIcon} />
            </ColHeader>
          );
        }
        switch (queryType) {
          case 'sort': {
            const direction = query?.sort[key] || 'none';
            return (
              <SortControl
                sticky={sticky}
                spacing={spacing}
                key={renderKey}
                columnKey={key}
                direction={direction}
                onQuery={onQuery}
                {...colProps}
              >
                {columnText}
              </SortControl>
            );
          }
          case 'filter': {
            const columnFilter = query?.filter?.[key as string];

            return (
              <FilterControl
                key={renderKey}
                spacing={spacing}
                sticky={sticky}
                columnKey={key}
                onQuery={onQuery}
                {...colProps}
                filters={columnFilter}
              >
                {columnText}
              </FilterControl>
            );
          }

          default: {
            return (
              <ColHeader
                key={renderKey}
                spacing={spacing}
                sticky={sticky}
                {...colProps}
              >
                {columnText}
              </ColHeader>
            );
          }
        }
      })}
    </ListHeader>
  );
}
