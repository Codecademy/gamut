import {
  Anchor,
  Box,
  ContentContainer,
  FlexBox,
  Text,
} from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderCatalogDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogDropdown';
import { AppHeaderCatalogSection } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogSection';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import { Avatar } from '../../Avatar';

export type AppHeaderSubMenuMobileProps = (
  | AppHeaderDropdownProps
  | AppHeaderCatalogDropdownProps
) & {
  handleClose: () => void;
};

const StyledAnchor = styled(Anchor)(
  css({
    alignItems: `center`,
    display: `flex`,
    my: 24,
    padding: 0,
    width: `100%`,
  })
);

const StyledText = styled(Text)(
  css({
    ml: 16,
    maxWidth: `70vw`,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
  })
);

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  action,
  handleClose,
  item,
}) => {
  const getIcon = () => {
    if (item.type === 'dropdown' || item.type === 'catalog-dropdown') {
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
    <AppHeaderListItem aria-labelledby={`${item.text} menu`}>
      <ContentContainer>
        <StyledAnchor onClick={handleClose} variant="interface" as="button">
          <ArrowChevronLeftIcon size={12} aria-hidden />
          <Text fontSize={16} ml={8}>
            Menu
          </Text>
        </StyledAnchor>
        <FlexBox alignItems="center" mb={16}>
          <Box>{getIcon()}</Box>
          <Box pb={4}>
            <StyledText as="h1" fontSize={16} fontWeight="normal">
              {item.type === 'profile-dropdown'
                ? item.userDisplayName
                : item.text}
            </StyledText>
          </Box>
        </FlexBox>
      </ContentContainer>
      {item.type === 'catalog-dropdown' ? (
        <AppHeaderCatalogSection action={action} item={item} />
      ) : (
        <AppHeaderLinkSections action={action} item={item} showIcon mobile />
      )}
    </AppHeaderListItem>
  );
};
