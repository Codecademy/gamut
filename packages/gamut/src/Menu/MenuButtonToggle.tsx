import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { MenuButton } from './MenuButton';

export type MenuButtonProps = {
  isExpanded?: boolean;
};

const StyledIcon = styled(ArrowChevronDownFilledIcon)<{ isExpanded?: boolean }>`
  margin-left: ${pxRem(5)};

  ${({ isExpanded }) =>
    isExpanded &&
    `
    margin-bottom: 2px;
    transform: rotate(-180deg);
  `}
`;

export const MenuButtonToggle: React.FC<MenuButtonProps> = ({
  children,
  isExpanded,
}) => {
  return (
    <MenuButton>
      {children}
      <StyledIcon isExpanded={isExpanded} size={8} />
    </MenuButton>
  );
};
