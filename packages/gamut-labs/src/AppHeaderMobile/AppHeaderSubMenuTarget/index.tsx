import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import {
  AppHeaderCatalogDropdownItem,
  AppHeaderDropdownItem,
  AppHeaderResourcesDropdownItem,
} from '../../AppHeader/AppHeaderElements/types';
import { Avatar } from '../../Avatar';

export type AppHeaderSubMenuTargetProps = {
  item:
    | AppHeaderDropdownItem
    | AppHeaderCatalogDropdownItem
    | AppHeaderResourcesDropdownItem;
  openSubMenu: (
    event: React.MouseEvent,
    item:
      | AppHeaderDropdownItem
      | AppHeaderCatalogDropdownItem
      | AppHeaderResourcesDropdownItem
  ) => void;
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
    if (item.type !== 'profile-dropdown') {
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
      alignItems="center"
      aria-label={`open ${item.text} submenu`}
      as="button"
      data-testid={item.dataTestId}
      display="flex"
      justifyContent="space-between"
      onClick={(event: React.MouseEvent) => openSubMenu(event, item)}
      py={16}
      role="menuitem"
      variant="interface"
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
