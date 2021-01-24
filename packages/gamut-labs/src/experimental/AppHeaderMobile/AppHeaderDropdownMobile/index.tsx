import { Box, Heading } from '@codecademy/gamut';
import {
  ArrowChevronLeftIcon,
  ArrowChevronRightIcon,
} from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { AppHeaderDropdownProps } from '../../..';
import { AppHeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
import {
  focusStyles,
  hoverStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';
import { AppHeaderLinkItem } from '../../AppHeader/AppHeaderElements/types';
import styles from './styles.scss';

const AppHeaderTargetButton = styled.button(({ theme }) => {
  return `
  background-color: transparent;
  text-align: left;
  display: flex;
  align-items: center;
  color: ${theme.colors.navy};
  border: 1px solid transparent;
  line-height: 1.5;
  white-space: nowrap;
  font-weight: normal;
  min-width: 0;
  padding: ${pxRem(2)} 0;
  justify-content: space-between;
  width: 100%;
  &:hover {
    color: ${theme.colors.hyper};
    text-decoration: none;
    cursor: pointer;
  }
  ${focusStyles}
`;
});

const FullMenuButton = styled.button(({ theme }) => {
  return `
    background-color: transparent;
    text-align: left;
    display: flex;
    align-items: center;
    color: ${theme.colors.navy};
    border: 1px solid transparent;
    line-height: 1.5;
    white-space: nowrap;
    font-weight: normal;
    min-width: 0;
    padding: ${pxRem(2)} 0;
    width: 100%;
    &:hover {
      color: ${theme.colors.hyper};
      text-decoration: none;
      cursor: pointer;
    }
  ${hoverStyles}
  ${focusStyles}
`;
});

export const AppHeaderDropdownMobile: React.FC<AppHeaderDropdownProps> = ({
  item,
  onClick,
}) => {
  const headerDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
    !isOpen && onClick(event, item); // TODO pass item through
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const clickTarget = (
    <AppHeaderTargetButton onClick={(event) => toggleIsOpen(event)}>
      <Box title={item.text} fontSize={16}>
        {item.text}
      </Box>
      <ArrowChevronRightIcon className={styles.icon} size={12} aria-hidden />
    </AppHeaderTargetButton>
  );

  return (
    <>
      <div ref={headerDropdownRef}>{clickTarget}</div>
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
