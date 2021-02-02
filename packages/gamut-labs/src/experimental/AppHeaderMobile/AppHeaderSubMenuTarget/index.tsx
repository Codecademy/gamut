import { Box, FlexBox } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import {
  focusStyles,
  hoverStyles,
  textButtonStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';
import { AppHeaderDropdownItem } from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderSubMenuTargetProps = {
  item: AppHeaderDropdownItem;
  openSubMenu: (event: React.MouseEvent, item: AppHeaderDropdownItem) => void;
};

const AppHeaderTextTargetButton = styled.button`
  ${textButtonStyles}
  ${hoverStyles}
  ${focusStyles}
`;

const AppHeaderLinkButtonInner = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  width: 100%;
`;

export const AppHeaderSubMenuTarget: React.FC<AppHeaderSubMenuTargetProps> = ({
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
        <FlexBox alignItems="center">
          {Icon && (
            <Box marginRight={16}>
              <Icon size={24} aria-hidden />
            </Box>
          )}
          {item.text}
        </FlexBox>
        <FlexBox alignSelf="end">
          <ArrowChevronRightIcon size={12} aria-hidden />
        </FlexBox>
      </AppHeaderLinkButtonInner>
    </AppHeaderTextTargetButton>
  );
};
