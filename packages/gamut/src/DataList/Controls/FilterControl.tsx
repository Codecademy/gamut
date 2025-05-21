import { FilterIcon } from '@codecademy/gamut-icons';
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import kebabCase from 'lodash/kebabCase';
import { useRef, useState } from 'react';
import * as React from 'react';

import { Checkbox, FlexBox, Menu, MenuItem, Text } from '../..';
import { Anchor } from '../../Anchor';
import { PopoverContainer } from '../../PopoverContainer';
import { useControlContext } from '../hooks/useListControls';
import { useListState } from '../hooks/useListState';
import { FilterOption, OnFilter } from '../types';

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
  const target = useRef<HTMLAnchorElement>(null);
  const { prefixId } = useControlContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const dimension = String(columnKey);
  const filters = useListState().query?.filter?.[columnKey] ?? [];

  return (
    <FlexBox column position="relative">
      {menuOpen && (
        <PopoverContainer
          alignment={justify === 'left' ? 'bottom-right' : 'bottom-left'}
          isOpen
          offset={0}
          targetRef={target as any}
          onRequestClose={() => setMenuOpen(false)}
        >
          <Menu
            maxHeight={300}
            overflowY="auto"
            spacing="condensed"
            variant="popover"
            width="max-content"
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
                    aria-label={isSelectAll ? `${text} ${dimension}` : text}
                    checked={optionSelected}
                    htmlFor={optionId}
                    label={
                      <Text
                        alignSelf="center"
                        display="inline-block"
                        fontFamily="base"
                        variant="p-small"
                      >
                        {text}
                        {isSelectAll && <Text screenreader> {dimension}</Text>}
                      </Text>
                    }
                    name={optionId}
                    spacing="tight"
                    onChange={() => {
                      onFilter?.({
                        dimension,
                        value: getNextFilters(value, filters),
                      });
                    }}
                  />
                </MenuItem>
              );
            })}
          </Menu>
        </PopoverContainer>
      )}
      <FilterToggle
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label={`filter by ${columnKey}`}
        display="inline-flex"
        open={menuOpen}
        ref={target}
        variant="interface"
        onClick={() => setMenuOpen(true)}
      >
        <FlexBox center dimensions={16} mb={4} mr={4}>
          <FilterIcon
            color={filters.length > 0 ? 'primary' : 'text'}
            size={14}
          />
        </FlexBox>
      </FilterToggle>
    </FlexBox>
  );
};
