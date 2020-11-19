import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { MenuButton } from './MenuButton';

export type MenuButtonProps = {
  className?: string;
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
  className,
  isExpanded,
}) => {
  return (
    <MenuButton className={className} isExpanded={isExpanded}>
      {children}
      <StyledIcon aria-hidden isExpanded={isExpanded} size={12} />
    </MenuButton>
  );
};
