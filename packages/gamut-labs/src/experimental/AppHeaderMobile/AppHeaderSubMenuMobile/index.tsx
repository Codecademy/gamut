import { Box } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Text } from '../../../experimental/Text';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import {
  focusStyles,
  hoverStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';
import { AppHeaderLinkItem } from '../../AppHeader/AppHeaderElements/types';
import { AppHeaderLinkMobile } from '../AppHeaderLinkMobile';

export type AppHeaderSubMenuMobileProps = AppHeaderDropdownProps & {
  handleClose: () => void;
};

const FullMenuButton = styled.button`
  background-color: transparent;
  border: transparent;
  color: ${({ theme }) => theme.colors.navy};
  display: flex;
  align-items: center;
  font-weight: normal;
  line-height: 1.5;
  margin-bottom: ${pxRem(24)};
  min-width: 0;
  width: 100%;
  padding: ${pxRem(2)} 0;
  text-align: left;
  white-space: nowrap;
  ${hoverStyles}
  ${focusStyles}
`;

const Heading = styled(Text)`
  line-height: 1.25;
`;

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  handleClose,
  item,
  onClick,
}) => {
  return (
    <>
      <Box aria-labelledby={`${item.text} menu`}>
        <FullMenuButton onClick={handleClose} type="button">
          <ArrowChevronLeftIcon size={12} aria-hidden />
          <Box title={item.text} fontSize={16} paddingLeft={8}>
            Full Menu
          </Box>
        </FullMenuButton>
        <Heading as="h1" fontSize={22} marginBottom={16} fontWeight="title">
          {item.text}
        </Heading>
        {item.popover.map((link: AppHeaderLinkItem) => {
          return (
            <Box key={link.id}>
              <AppHeaderLinkMobile item={link} onClick={onClick} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};
