import { Anchor, Box, FlexBox } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

export type DropdownItem = {
  icon?: React.ComponentType<GamutIconProps>;
  text: string;
  clickHandler?: (event: React.MouseEvent) => void;
};

export type DropdownListProps = {
  dropdownItems: DropdownItem[];
};

export const DropdownList: React.FC<DropdownListProps> = ({
  dropdownItems,
}) => {
  return (
    <FlexBox flexDirection="column" borderRadius="2px" bg="white" py={12}>
      {dropdownItems.map((item) => {
        const Icon = item.icon;

        return (
          <Anchor
            variant="interface"
            onClick={item.clickHandler}
            px={24}
            py={12}
          >
            <FlexBox>
              {Icon && (
                <Box mr={12}>
                  <Icon size={20} aria-hidden />
                </Box>
              )}
              {item.text}
            </FlexBox>
          </Anchor>
        );
      })}
    </FlexBox>
  );
};
