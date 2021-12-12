import { Anchor, Box, FlexBox } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderDropdownItem } from '../../AppHeader/AppHeaderElements/types';
import { Avatar } from '../../Avatar';

export type AppHeaderSubMenuTargetProps = {
  item: AppHeaderDropdownItem;
  openSubMenu: (event: React.MouseEvent, item: AppHeaderDropdownItem) => void;
};

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
    return (
      <Avatar
        src={item.avatar}
        alt="User profile avatar"
        disableDropshadow
        size={24}
      />
    );
  };

  return (
    <Anchor
      as="button"
      display="flex"
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => openSubMenu(event, item)}
      aria-label={`open ${item} submenu`}
      variant="interface"
      width="100%"
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
    </Anchor>
  );
};
