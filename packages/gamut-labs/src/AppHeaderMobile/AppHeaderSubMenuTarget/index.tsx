import { Box, FlexBox } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderAvatar } from '../../AppHeader/AppHeaderElements/AppHeaderAvatar';
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
  padding: 0;
  ${textButtonStyles}
  ${hoverStyles}
  ${focusStyles}
`;

const AppHeaderLinkButtonInner = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DisplayNameText = styled.div`
  max-width: 70vw;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AppHeaderSubMenuTarget: React.FC<AppHeaderSubMenuTargetProps> = ({
  item,
  openSubMenu,
}) => {
  const getIcon = () => {
    if (item.type === 'dropdown') {
      const Icon = item.icon;
      return Icon && <Icon size={24} aria-hidden />;
    }
    return <AppHeaderAvatar avatarSize={24} imageUrl={item.avatar} />;
  };

  return (
    <AppHeaderTextTargetButton
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => openSubMenu(event, item)}
      aria-label={`open ${item} submenu`}
    >
      <AppHeaderLinkButtonInner
        lineHeight="base"
        minWidth="0"
        py={16}
        textAlign="left"
        display="flex"
      >
        <FlexBox alignItems="center">
          <FlexBox mr={16}>{getIcon()}</FlexBox>

          {item.type === 'profile-dropdown' ? (
            <DisplayNameText>{item.userDisplayName}</DisplayNameText>
          ) : (
            item.text
          )}
        </FlexBox>
        <FlexBox alignSelf="end">
          <Box>
            <ArrowChevronRightIcon size={12} aria-hidden />
          </Box>
        </FlexBox>
      </AppHeaderLinkButtonInner>
    </AppHeaderTextTargetButton>
  );
};
