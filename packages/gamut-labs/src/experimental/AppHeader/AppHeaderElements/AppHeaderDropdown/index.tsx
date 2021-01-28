import { Box } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { AppHeaderLinkMobile } from '../../../AppHeaderMobile';
import { Popover } from '../../../Popover';
import { AppHeaderAvatar } from '../AppHeaderAvatar';
import { focusStyles, hoverStyles } from '../SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderLinkItem,
  AppHeaderProfileDropdownItem,
} from '../types';
import styles from './styles.module.scss';

const AppHeaderTextTargetButton = styled.button`
  background-color: transparent;
  text-align: left;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.navy};
  border: transparent;
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

const AppHeaderAvatarTargetButton = styled.button`
  background-color: transparent;
  border: transparent;
  font-weight: normal;
  padding: 1rem 0;
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
  item: AppHeaderDropdownItem | AppHeaderProfileDropdownItem;
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
  const clickTarget =
    item.type === 'profile-dropdown' ? (
      <AppHeaderAvatarTargetButton
        onClick={(event) => toggleIsOpen(event)}
        style={{ paddingTop: pxRem(2), paddingBottom: pxRem(2) }}
      >
        <AppHeaderAvatar imageUrl={item.avatar} />
      </AppHeaderAvatarTargetButton>
    ) : (
      <AppHeaderTextTargetButton
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
      </AppHeaderTextTargetButton>
    );

  return (
    <>
      <div ref={headerDropdownRef}>{clickTarget}</div>
      <AppHeaderPopover
        align={item.type === 'profile-dropdown' ? 'right' : 'left'}
        baseZIndex={baseZIndex}
        verticalOffset={item.type === 'profile-dropdown' ? 0 : -2}
        outline
        isOpen={isOpen}
        onRequestClose={handleClose}
        targetRef={headerDropdownRef}
      >
        <Box paddingY={12}>
          {item.popover.map((link: AppHeaderLinkItem) => {
            return (
              <Box key={link.id} paddingX={16}>
                <AppHeaderLinkMobile item={link} onClick={onClick} />
              </Box>
            );
          })}
        </Box>
      </AppHeaderPopover>
    </>
  );
};
