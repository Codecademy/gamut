import { Box, Heading } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderDropdownProps } from '../../..';
import { AppHeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
import {
  focusStyles,
  hoverStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';
import { AppHeaderLinkItem } from '../../AppHeader/AppHeaderElements/types';
import styles from './styles.scss';

const FullMenuButton = styled.button(({ theme }) => {
  return `
    background-color: transparent;
    border: 1px solid transparent;
    color: ${theme.colors.navy};
    display: flex;
    align-items: center;
    font-weight: normal;
    line-height: 1.5;
    margin-bottom:${pxRem(24)}
    min-width: 0;
    width: 100%;
    padding: ${pxRem(2)} 0;
    text-align: left;
    white-space: nowrap;
    ${hoverStyles}
    ${focusStyles}
`;
});

export const AppHeaderSubMenuMobile: React.FC<AppHeaderDropdownProps> = ({
  item,
  onClick,
}) => {
  const handleClose = () => {
    // go back to main menu
  };

  return (
    <>
      <Box>
        <FullMenuButton onClick={handleClose} type="button">
          <ArrowChevronLeftIcon size={12} aria-hidden />
          <Box title={item.text} fontSize={16} paddingLeft={8}>
            Full Menu
          </Box>
        </FullMenuButton>
        <Heading as="h3" fontSize="sm" hideMargin className={styles.heading}>
          {item.text}
        </Heading>
        {item.popover.map((link: AppHeaderLinkItem) => {
          return (
            <Box key={link.id}>
              <AppHeaderLink item={link} onClick={onClick} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};
