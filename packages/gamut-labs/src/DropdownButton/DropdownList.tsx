import { Box } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

export type DropdownItem = {
  icon?: React.ComponentType<GamutIconProps>;
  text: string;
  clickHandler?: React.MouseEvent;
};

export type DropdownListProps = {
  dropdownItems: DropdownItem[];
};

export const DropdownList: React.FC<DropdownListProps> = ({
  dropdownItems,
}) => {
  return (
    <Box borderRadius="2px" bg="white" py={12}>
      {dropdownItems.map((item) => (
        <Box px={24} py={12}>
          {item.text}
        </Box>
      ))}
    </Box>
  );
};
