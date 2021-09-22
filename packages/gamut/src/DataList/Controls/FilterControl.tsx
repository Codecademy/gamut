import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import React, { useState } from 'react';

import { Box, Checkbox, FlexBox, FocusTrap, Menu, MenuItem, Text } from '../..';
import { ButtonBase } from '../../ButtonBase';
import { Query, QueryValues } from '..';

export interface FilterProps {
  columnKey: string | symbol | number;
  options?: string[];
  filters?: string[];
  onQuery: (
    type: keyof Query<any>,
    dimension: keyof any,
    value: QueryValues<any>
  ) => void;
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
              width="max-content"
              variant="action"
            >
              {['Select All', ...options].map((opt) => {
                const id = `${opt}-${String(columnKey)}`;
                const allSelected = filters.length === 0;
                const optionSelected =
                  opt === 'Select All' ? allSelected : !filters.includes(opt);

                return (
                  <MenuItem key={opt}>
                    <Checkbox
                      htmlFor={id}
                      name={id}
                      onClick={() => {
                        onQuery(
                          'filter',
                          columnKey,
                          getNextFilters(opt, filters)
                        );
                      }}
                      label={
                        <Text
                          variant="p-small"
                          fontFamily="base"
                          alignSelf="center"
                          display="inline-block"
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
