import { Box } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { Popover } from '../../..';
import { AppHeaderLinkMobile } from '../../../AppHeaderMobile';
import { AppHeaderAvatar } from '../AppHeaderAvatar';
import { focusStyles, hoverStyles } from '../SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderLinkItem,
  AppHeaderProfileDropdownItem,
} from '../types';
import styles from './styles.module.scss';

const AppHeaderAvatarTargetButton = styled.button`
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

export type AppHeaderProfileDropdownProps = {
  item: AppHeaderProfileDropdownItem;
  onClick: AppHeaderClickHandler;
};

export const AppHeaderProfileDropdown: React.FC<AppHeaderProfileDropdownProps> = ({
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
    <AppHeaderAvatarTargetButton
      className={isOpen && styles.open}
      onClick={(event) => toggleIsOpen(event)}
      style={{ paddingTop: pxRem(2), paddingBottom: pxRem(2) }}
    >
      <AppHeaderAvatar imageUrl={item.avatar} />
    </AppHeaderAvatarTargetButton>
  );

  return (
    <>
      <div ref={headerDropdownRef}>{clickTarget}</div>
      <Popover
        align={'right'}
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
                <AppHeaderLinkMobile item={link} onClick={onClick} />
              </Box>
            );
          })}
        </Box>
      </Popover>
    </>
  );
};
