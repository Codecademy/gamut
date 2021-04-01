import { AppBarButton, Box } from '@codecademy/gamut';
import { MiniArrowLeftIcon } from '@codecademy/gamut-icons';
import React from 'react';

import { Text } from '../../../experimental/Text';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';

export type AppHeaderSubMenuMobileProps = AppHeaderDropdownProps & {
  handleClose: () => void;
};

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  action,
  handleClose,
  item,
}) => {
  return (
    <Box aria-labelledby={`${item.text} menu`}>
      <AppBarButton onClick={handleClose} marginBottom={16}>
        <MiniArrowLeftIcon size={12} aria-hidden />
        <Box fontSize={16} marginLeft={8}>
          Full Menu
        </Box>
      </AppBarButton>
      <Text
        as="h1"
        fontSize={22}
        marginBottom={16}
        fontWeight="title"
        lineHeight="title"
      >
        {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
      </Text>
      <AppHeaderLinkSections action={action} item={item} />
    </Box>
  );
};
