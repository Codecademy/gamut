import { Box } from '@codecademy/gamut';
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
import { Text } from '../../Text';

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

const Heading = styled(Text)`
  line-height: 1.25;
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
        <Box fontSize={16} marginLeft={8}>
          Full Menu
        </Box>
      </FullMenuButton>
      <Heading as="h1" fontSize={22} marginBottom={16} fontWeight="title">
        {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
      </Heading>
      <AppHeaderLinkSections action={action} item={item} />
    </Box>
  );
};
