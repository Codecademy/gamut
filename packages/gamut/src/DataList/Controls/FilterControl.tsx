import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import React, { useState } from 'react';

import { Box, Checkbox, FlexBox, FocusTrap, Menu, MenuItem, Text } from '../..';
import { ButtonBase } from '../../ButtonBase';
import { Query } from '..';

export interface FilterProps {
  columnKey: string | symbol | number;
  options?: string[];
  filters?: string[];
  onQuery: (
    type: keyof Query<any>,
    dimension: keyof any,
    value: Query<any>[keyof Query<any>][string]
  ) => void;
  justify?: 'left' | 'right';
}

const getNextFilters = (
  option: string,
  filters: string[],
  options: string[]
) => {
  if (option === 'Select All') return options;
  if (filters.includes(option)) {
    return filters.filter((filt) => filt !== option);
  }
  return [...filters, option];
};

export const FilterControl: React.FC<FilterProps> = ({
  columnKey,
  filters = [],
  onQuery,
  options = [],
  children,
  justify = 'left',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
              width={300}
              variant="action"
            >
              {['Select All', ...options].map((opt) => {
                const id = `${opt}-${String(columnKey)}`;
                const allSelected =
                  filters.length === options.length || filters.length === 0;
                const optionSelected = filters.includes(opt) || allSelected;

                return (
                  <MenuItem key={opt}>
                    <Checkbox
                      htmlFor={id}
                      name={id}
                      disabled={opt === 'Select All' && allSelected}
                      onClick={() => {
                        onQuery(
                          'filter',
                          columnKey,
                          getNextFilters(opt, filters, options)
                        );
                      }}
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
      <ButtonBase onClick={() => setMenuOpen(true)}>
        <FlexBox alignItems="center" gap={4}>
          {children}
          <MiniChevronDownIcon size={10} />
        </FlexBox>
      </ButtonBase>
    </FlexBox>
  );
};
