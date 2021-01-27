import { Box } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { Popover } from '../../..';
import { AppHeaderLink } from '../AppHeaderLink';
import { focusStyles, hoverStyles } from '../SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderLinkItem,
} from '../types';
import styles from './styles.module.scss';

const AppHeaderTargetButton = styled.button`
  background-color: transparent;
  text-align: left;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.navy};
  border: 1px solid transparent;
  line-height: 1.5;
  white-space: nowrap;
  font-weight: normal;
  min-width: 0;
  padding: 1rem 0;
  font-size: 0;
  cursor: pointer;
  ${hoverStyles}
  ${focusStyles}
`;

type AppHeaderPopoverProps = { baseZIndex: number };

export const AppHeaderPopover = styled(Popover)<AppHeaderPopoverProps>`
  z-index: ${({ baseZIndex }) => baseZIndex + 1};
`;

export type AppHeaderDropdownProps = {
  baseZIndex: number;
  item: AppHeaderDropdownItem;
  onClick: AppHeaderClickHandler;
};

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  baseZIndex,
  item,
  onClick,
}) => {
  const headerDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
    !isOpen && onClick(event, item);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const clickTarget = (
    <AppHeaderTargetButton
      className={isOpen && styles.open}
      onClick={(event) => toggleIsOpen(event)}
      style={{ paddingTop: pxRem(2), paddingBottom: pxRem(2) }}
    >
      <span title={item.text} className={styles.copy}>
        {item.text}
      </span>
      <ArrowChevronDownFilledIcon
        size={12}
        className={styles.icon}
        aria-label="dropdown"
      />
    </AppHeaderTargetButton>
  );

  return (
    <>
      <div ref={headerDropdownRef}>{clickTarget}</div>
      <AppHeaderPopover
        align="left"
        baseZIndex={baseZIndex}
        verticalOffset={-2}
        outline
        isOpen={isOpen}
        onRequestClose={handleClose}
        targetRef={headerDropdownRef}
      >
        <Box paddingY={12}>
          {item.popover.map((link: AppHeaderLinkItem) => {
            return (
              <Box key={link.id} paddingX={16}>
                <AppHeaderLink item={link} onClick={onClick} />
              </Box>
            );
          })}
        </Box>
      </AppHeaderPopover>
    </>
  );
};
