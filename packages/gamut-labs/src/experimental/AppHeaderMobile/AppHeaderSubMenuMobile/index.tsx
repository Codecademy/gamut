import { Anchor, Box } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { Text } from '../../../experimental/Text';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { HeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';

export type AppHeaderSubMenuMobileProps = AppHeaderDropdownProps & {
  handleClose: () => void;
};

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
      <HeaderLink
        onClick={handleClose}
        type="button"
        variant="interface"
        marginBottom={24}
      >
        <ArrowChevronLeftIcon size={12} aria-hidden />
        <Box fontSize={16} marginLeft={8}>
          Full Menu
        </Box>
      </HeaderLink>
      <Heading as="h1" fontSize={22} marginBottom={16} fontWeight="title">
        {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
      </Heading>
      <AppHeaderLinkSections action={action} item={item} />
    </Box>
  );
};
