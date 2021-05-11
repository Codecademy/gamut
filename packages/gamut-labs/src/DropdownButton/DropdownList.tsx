import { Anchor, Box, FlexBox } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

export type DropdownItem = {
  id: string;
  icon?: React.ComponentType<GamutIconProps>;
  text: string;
  clickHandler?: (event: React.MouseEvent) => void;
  href?: string;
};

export type DropdownListProps = {
  dropdownItems: DropdownItem[];
};

const StyledAnchor = styled(Anchor)`
  &:hover {
    color: ${theme.colors.hyper};
  }
`;

export const DropdownList: React.FC<DropdownListProps> = ({
  dropdownItems,
}) => {
  return (
    <FlexBox flexDirection="column" borderRadius="2px" bg="white" py={12}>
      {dropdownItems.map((item) => {
        const Icon = item.icon;
        const { id, text, href, clickHandler } = item;

        return (
          <StyledAnchor
            key={id}
            data-testid={`dropdown-item-${id}`}
            variant="interface"
            onClick={clickHandler}
            href={href}
            px={24}
            py={12}
          >
            <FlexBox>
              {Icon && (
                <Box mr={12}>
                  <Icon size={20} aria-hidden />
                </Box>
              )}
              {text}
            </FlexBox>
          </StyledAnchor>
        );
      })}
    </FlexBox>
  );
};
