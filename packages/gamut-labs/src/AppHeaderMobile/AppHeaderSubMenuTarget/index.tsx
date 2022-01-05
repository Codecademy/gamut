import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderDropdownItem } from '../../AppHeader/AppHeaderElements/types';
import { Avatar } from '../../Avatar';

export type AppHeaderSubMenuTargetProps = {
  item: AppHeaderDropdownItem;
  openSubMenu: (event: React.MouseEvent, item: AppHeaderDropdownItem) => void;
};

const StyledText = styled(Text)(
  css({
    ml: 16,
    maxWidth: `70vw`,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
  })
);

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
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => openSubMenu(event, item)}
      aria-label={`open ${item.text} submenu`}
      variant="interface"
      alignItems="center"
      display="flex"
      justifyContent="space-between"
      py={16}
      width="100%"
    >
      {getIcon()}
      <StyledText>
        {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
      </StyledText>
      <ArrowChevronRightIcon ml="auto" my="auto" size={12} aria-hidden />
    </Anchor>
  );
};
