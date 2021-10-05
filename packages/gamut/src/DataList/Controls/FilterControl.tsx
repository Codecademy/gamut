import { FilterIcon } from '@codecademy/gamut-icons';
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { kebabCase } from 'lodash';
import React, { useState } from 'react';

import { Box, Checkbox, FlexBox, FocusTrap, Menu, MenuItem, Text } from '../..';
import { Anchor } from '../../Anchor';
import { FilterOption, OnFilter } from '..';
import { useControlContext } from '../hooks/useListControls';
import { useListState } from '../hooks/useListState';

export interface FilterProps {
  columnKey: string;
  options?: FilterOption[];
  onFilter?: OnFilter<any>;
  justify?: 'left' | 'right';
}

const getNextFilters = (option: string, filters: string[]) => {
  if (option === 'all') return [];
  if (filters.includes(option)) {
    return filters.filter((filt) => filt !== option);
  }
  return [...filters, option];
};

const formatOption = (option: FilterOption) => {
  if (typeof option === 'string') {
    return { text: option, value: option };
  }
  return option;
};

const SELECT_ALL = {
  text: 'Select All',
  value: 'all',
};

const FilterToggle = styled(Anchor)(
  states({
    open: {
      pointerEvents: 'none',
    },
  })
);

export const FilterControl: React.FC<FilterProps> = ({
  columnKey,
  onFilter,
  options = [],
  justify = 'left',
}) => {
  const { prefixId } = useControlContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const dimension = String(columnKey);
  const filters = useListState().query?.filter?.[columnKey] ?? [];

  return (
    <FlexBox position="relative" column>
      {menuOpen && (
        <Box position="absolute" top={24} {...{ [justify]: 0 }} zIndex={1}>
          <FocusTrap
            allowPageInteraction
            onClickOutside={() => {
              setMenuOpen(false);
            }}
            onEscapeKey={() => setMenuOpen(false)}
          >
            <Menu
              spacing="condensed"
              maxHeight={300}
              overflowY="auto"
              width="max-content"
              variant="action"
            >
              {[SELECT_ALL, ...options].map((opt) => {
                const { text, value } = formatOption(opt);
                const optionId = prefixId(`${kebabCase(value)}-${dimension}`);
                const allSelected = filters.length === 0;
                const isSelectAll = value === 'all';

                const optionSelected = isSelectAll
                  ? allSelected
                  : !filters.includes(value);

                return (
                  <MenuItem key={prefixId(`filter-${columnKey}-${value}`)}>
                    <Checkbox
                      htmlFor={optionId}
                      name={optionId}
                      onChange={() => {
                        onFilter?.({
                          dimension,
                          value: getNextFilters(value, filters),
                        });
                      }}
                      label={
                        <Text
                          variant="p-small"
                          fontFamily="base"
                          alignSelf="center"
                          display="inline-block"
                        >
                          {text}
                          {isSelectAll && (
                            <Text screenreader> {dimension}</Text>
                          )}
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
      <FilterToggle
        open={menuOpen}
        display="inline-flex"
        variant="interface"
        onClick={() => setMenuOpen(true)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-label={`filter by ${columnKey}`}
      >
        <FlexBox center dimensions={16}>
          <FilterIcon
            size={14}
            color={filters.length > 0 ? 'primary' : 'text'}
          />
        </FlexBox>
      </FilterToggle>
    </FlexBox>
  );
};
