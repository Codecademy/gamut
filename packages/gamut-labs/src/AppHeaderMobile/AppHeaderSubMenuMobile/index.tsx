import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderCatalogDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogDropdown';
import { AppHeaderCatalogSection } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogSection';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import { AppHeaderResourceDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderResourcesDropdown';
import { AppHeaderResourcesSection } from '../../AppHeader/AppHeaderElements/AppHeaderResourcesSection';
import {
  AppHeaderCatalogDropdownItem,
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderResourcesDropdownItem,
} from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderSubMenuMobileProps = (
  | AppHeaderDropdownProps
  | AppHeaderCatalogDropdownProps
  | AppHeaderResourceDropdownProps
) & {
  handleClose: () => void;
};

type AppHeaderSectionItem =
  | AppHeaderDropdownItem
  | AppHeaderCatalogDropdownItem
  | AppHeaderResourcesDropdownItem;

const StyledAnchor = styled(Anchor)(
  css({
    alignItems: `center`,
    display: `flex`,
    my: 24,
    padding: 0,
    width: `100%`,
  })
);

const renderSection = (
  item: AppHeaderSectionItem,
  action: AppHeaderClickHandler
) => {
  switch (item.type) {
    case 'catalog-dropdown':
      return <AppHeaderCatalogSection action={action} item={item} />;
    case 'new-resources-dropdown':
      return <AppHeaderResourcesSection action={action} />;
    default:
      return (
        <AppHeaderLinkSections action={action} item={item} showIcon mobile />
      );
  }
};

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  action,
  handleClose,
  item,
}) => {
  return (
    <AppHeaderListItem aria-labelledby={`${item.text} menu`}>
      <StyledAnchor
        onClick={handleClose}
        variant="interface"
        as="button"
        ml={{ _: 16, xs: 32, sm: 64, md: 48 }}
      >
        <ArrowChevronLeftIcon size={12} aria-hidden />
        <Text fontSize={16} pl={8}>
          Menu
        </Text>
      </StyledAnchor>
      {renderSection(item, action)}
    </AppHeaderListItem>
  );
};
