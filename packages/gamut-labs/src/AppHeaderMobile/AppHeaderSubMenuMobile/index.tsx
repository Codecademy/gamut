import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';

export type AppHeaderSubMenuMobileProps = AppHeaderDropdownProps & {
  handleClose: () => void;
};

const StyledAnchor = styled(Anchor)(
  css({
    alignItems: `center`,
    display: `flex`,
    mb: 24,
    padding: 0,
    width: `100%`,
  })
);

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  action,
  handleClose,
  item,
}) => {
  return (
    <AppHeaderListItem aria-labelledby={`${item.text} menu`}>
      <StyledAnchor onClick={handleClose} variant="interface" as="button">
        <ArrowChevronLeftIcon size={12} aria-hidden />
        <Text fontSize={16} ml={8}>
          Full Menu
        </Text>
      </StyledAnchor>
      <Text as="h1" fontSize={22} mb={16}>
        {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
      </Text>
      <AppHeaderLinkSections action={action} item={item} isMobile />
    </AppHeaderListItem>
  );
};
