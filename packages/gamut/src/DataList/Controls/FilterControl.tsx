import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import { kebabCase } from 'lodash';
import React, { useState } from 'react';

import { Box, Checkbox, FlexBox, FocusTrap, Menu, MenuItem, Text } from '../..';
import { Anchor } from '../../Anchor';
import { OnFilter } from '..';
import { useControlContext } from '../hooks/useListControls';
import { useListState } from '../hooks/useListState';

export interface FilterProps {
  columnKey: string;
  options?: string[];
  onFilter?: OnFilter<any>;
  justify?: 'left' | 'right';
}

const getNextFilters = (option: string, filters: string[]) => {
  if (option === 'Select All') return [];
  if (filters.includes(option)) {
    return filters.filter((filt) => filt !== option);
  }
  return [...filters, option];
};

export const FilterControl: React.FC<FilterProps> = ({
  columnKey,
  onFilter,
  options = [],
  children,
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
            onClickOutside={() => setMenuOpen(false)}
            onEscapeKey={() => setMenuOpen(false)}
          >
            <Menu
              spacing="condensed"
              maxHeight={300}
              overflowY="auto"
              width="max-content"
              variant="action"
            >
              {['Select All', ...options].map((opt) => {
                const optionId = prefixId(`${kebabCase(opt)}-${dimension}`);
                const allSelected = filters.length === 0;
                const isSelectAll = opt === 'Select All';

                const optionSelected = isSelectAll
                  ? allSelected
                  : !filters.includes(opt);

                return (
                  <MenuItem key={opt}>
                    <Checkbox
                      htmlFor={optionId}
                      name={optionId}
                      onChange={() => {
                        onFilter?.({
                          dimension,
                          value: getNextFilters(opt, filters),
                        });
                      }}
                      label={
                        <Text
                          variant="p-small"
                          fontFamily="base"
                          alignSelf="center"
                          display="inline-block"
                        >
                          {opt}
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
      <Anchor
        variant="interface"
        onClick={() => setMenuOpen(true)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
      >
        <FlexBox alignItems="center">
          <Text whiteSpace="normal">{children}</Text>
          <MiniChevronDownIcon ml={8} size={12} alignSelf="center" />
        </FlexBox>
      </Anchor>
    </FlexBox>
  );
};
