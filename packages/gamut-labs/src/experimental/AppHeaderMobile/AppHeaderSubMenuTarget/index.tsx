import { AppBarButton, FlexBox } from '@codecademy/gamut';
import { MiniArrowRightIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderAvatar } from '../../AppHeader/AppHeaderElements/AppHeaderAvatar';
import { AppHeaderDropdownItem } from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderSubMenuTargetProps = {
  item: AppHeaderDropdownItem;
  openSubMenu: (event: React.MouseEvent, item: AppHeaderDropdownItem) => void;
};

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
    <AppBarButton
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => openSubMenu(event, item)}
      aria-label={`open ${item} submenu`}
    >
      {getIcon()}
      <FlexBox
        alignItems="center"
        flexGrow={1}
        flexShrink={1}
        flexBasis="0"
        marginLeft={16}
      >
        {item.type === 'profile-dropdown' ? (
          <DisplayNameText>{item.userDisplayName}</DisplayNameText>
        ) : (
          item.text
        )}
      </FlexBox>
      <MiniArrowRightIcon size={12} aria-hidden />
    </AppBarButton>
  );
};
