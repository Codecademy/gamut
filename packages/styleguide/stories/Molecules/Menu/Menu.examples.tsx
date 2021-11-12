import {
  FlexBox,
  Menu,
  MenuItem,
  MenuSeparator,
  PopoverContainer,
  PopoverContainerProps,
} from '@codecademy/gamut';
import React, { useRef } from 'react';

export const PopoverMenuExample: React.FC<PopoverContainerProps> = (args) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="480px" width={1} position="relative">
      <FlexBox center flex={1}>
        <PopoverContainer isOpen inline targetRef={target} {...args}>
          <Menu variant="action">
            <MenuItem>Item 1</MenuItem>
            <MenuSeparator />
            <MenuItem href="cool">Link 1</MenuItem>
            <MenuSeparator />
          </Menu>
        </PopoverContainer>
        <FlexBox
          justifyContent="center"
          alignItems="center"
          dimensions="200px"
          border={1}
          ref={target}
        >
          This balanced breakfast
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
