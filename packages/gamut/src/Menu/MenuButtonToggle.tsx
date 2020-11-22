import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import { MenuButtonProps as ReachMenuButtonProps } from '@reach/menu-button';
import styled from '@emotion/styled';
import React from 'react';

import { MenuButton } from './MenuButton';

export type MenuButtonProps = ReachMenuButtonProps & {
  isExpanded?: boolean;
};

const StyledIcon = styled(ArrowChevronDownFilledIcon)<{ isExpanded?: boolean }>`
  margin-left: ${pxRem(5)};

  ${({ isExpanded }) =>
    isExpanded &&
    `
    margin-bottom: 3px;
    transform: rotate(-180deg);
  `}
`;

export const MenuButtonToggle: React.FC<MenuButtonProps> = ({
  children,
  isExpanded,
  ...props
}) => {
  return (
    <MenuButton isExpanded={isExpanded} {...props}>
      {children}
      <StyledIcon aria-hidden isExpanded={isExpanded} size={12} />
    </MenuButton>
  );
};
