/* WIP */

import { Box } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { AppHeaderDropdownProps } from '../../..';
import {
  focusStyles,
  hoverStyles,
} from '../../AppHeader/AppHeaderElements/SharedStyles';
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
    !isOpen && onClick(event, item);
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
    </>
  );
};
