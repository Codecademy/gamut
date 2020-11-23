import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import { MenuButtonProps as ReachMenuButtonProps } from '@reach/menu-button';
import styled from '@emotion/styled';
import React from 'react';

import { MenuButton } from './MenuButton';

export type MenuButtonProps = ReachMenuButtonProps & {
  isExpanded?: boolean;
};

const StyledMenuButton = styled(MenuButton)`
  align-items: center;
  display: flex;
`;

const StyledIcon = styled(ArrowChevronDownFilledIcon)<{ isExpanded?: boolean }>`
  margin-left: ${pxRem(5)};

  ${({ isExpanded }) => isExpanded && `transform: rotate(-180deg);`}
`;

const Contents = styled.span<{ isExpanded?: boolean }>`
  text-align: center;

  &::after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;

export const MenuButtonToggle: React.FC<MenuButtonProps> = ({
  children,
  isExpanded,
  ...props
}) => {
  return (
    <StyledMenuButton
      aria-expanded={isExpanded}
      isExpanded={isExpanded}
      {...props}
    >
      <Contents isExpanded={isExpanded} title={`${children}`}>
        {children}
      </Contents>
      <StyledIcon aria-hidden isExpanded={isExpanded} size={12} />
    </StyledMenuButton>
  );
};
