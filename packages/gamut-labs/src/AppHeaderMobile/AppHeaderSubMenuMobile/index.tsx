import { Box, Text } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import {
  focusStyles,
  hoverStyles,
  textButtonStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';

export type AppHeaderSubMenuMobileProps = AppHeaderDropdownProps & {
  handleClose: () => void;
};

const FullMenuButton = styled.button`
  margin-bottom: ${pxRem(24)};
  padding: 0;
  ${textButtonStyles}
  ${hoverStyles}
  ${focusStyles}
`;

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  action,
  handleClose,
  item,
}) => {
  return (
    <Box aria-labelledby={`${item.text} menu`}>
      <FullMenuButton onClick={handleClose} type="button">
        <ArrowChevronLeftIcon size={12} aria-hidden />
        <Box fontSize={16} ml={8}>
          Full Menu
        </Box>
      </FullMenuButton>
      <Text as="h1" fontSize={22} mb={16}>
        {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
      </Text>
      <AppHeaderLinkSections action={action} item={item} />
    </Box>
  );
};
