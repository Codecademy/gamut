import { Box } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import {
  focusStyles,
  hoverStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
} from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderSubMenuTargetProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem;
  openSubMenu: (event: React.MouseEvent, item: AppHeaderDropdownItem) => void;
};

const AppHeaderTextTargetButton = styled.button`
  background-color: transparent;
  text-align: left;
  display: flex;
  width: 100%;
  align-items: center;
  color: ${({ theme }) => theme.colors.navy};
  border: transparent;
  line-height: 1.5;
  white-space: nowrap;
  font-weight: normal;
  min-width: 0;
  padding: 0.5px 0;
  cursor: pointer;
  ${hoverStyles}
  ${focusStyles}
`;

const AppHeaderLinkButtonInner = styled(Box)`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  width: 100%;
`;

export const AppHeaderSubMenuTarget: React.FC<AppHeaderSubMenuTargetProps> = ({
  action,
  item,
  openSubMenu,
}) => {
  const Icon = item.icon;

  return (
    <AppHeaderTextTargetButton
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => openSubMenu(event, item)}
      aria-label={`open ${item} submenu`}
    >
      <AppHeaderLinkButtonInner
        lineHeight="base"
        minWidth="0"
        paddingY={8}
        textAlign="left"
        display="flex"
      >
        {Icon && (
          <Box display="flex" alignContent="center" marginRight={16}>
            <Icon size={24} aria-hidden />
          </Box>
        )}
        {item.text}
        <ArrowChevronRightIcon size={12} aria-hidden />
      </AppHeaderLinkButtonInner>
    </AppHeaderTextTargetButton>
  );
};
