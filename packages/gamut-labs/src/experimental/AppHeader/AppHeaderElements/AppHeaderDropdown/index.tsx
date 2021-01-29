import { Box } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { Popover } from '../../../Popover';
import { AppHeaderAvatar } from '../AppHeaderAvatar';
import { AppHeaderLinkSections } from '../AppHeaderLinkSections';
import { focusStyles, hoverStyles } from '../SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
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

const AppHeaderTextTarget = styled(AppHeaderTextTargetButton)`
  padding: 2px 0;
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

const AppHeaderAvatarTarget = styled(AppHeaderAvatarTargetButton)`
  padding: 2px 0;
`;

export type AppHeaderDropdownProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem | AppHeaderProfileDropdownItem;
};

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  action,
  item,
}) => {
  const headerDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
    !isOpen && action(event, item);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const clickTarget =
    item.type === 'profile-dropdown' ? (
      <AppHeaderAvatarTarget onClick={(event) => toggleIsOpen(event)}>
        <AppHeaderAvatar imageUrl={item.avatar} />
      </AppHeaderAvatarTarget>
    ) : (
      <AppHeaderTextTarget
        className={isOpen && styles.open}
        onClick={(event) => toggleIsOpen(event)}
      >
        <span title={item.text} className={styles.copy}>
          {item.text}
        </span>
        <ArrowChevronDownFilledIcon
          size={12}
          className={styles.icon}
          aria-label="dropdown"
        />
      </AppHeaderTextTarget>
    );

  return (
    <>
      <div ref={headerDropdownRef}>{clickTarget}</div>
      <Popover
        align={item.type === 'profile-dropdown' ? 'right' : 'left'}
        verticalOffset={item.type === 'profile-dropdown' ? 0 : -2}
        outline
        isOpen={isOpen}
        onRequestClose={handleClose}
        targetRef={headerDropdownRef}
      >
        <Box paddingY={12}>
          <AppHeaderLinkSections action={action} item={item} />
        </Box>
      </Popover>
    </>
  );
};
