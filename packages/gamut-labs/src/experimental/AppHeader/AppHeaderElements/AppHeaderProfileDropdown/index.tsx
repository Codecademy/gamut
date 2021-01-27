import { Box } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { AppHeaderPopover } from '../../..';
import { AppHeaderLinkMobile } from '../../../AppHeaderMobile';
import { AppHeaderAvatar } from '../AppHeaderAvatar';
import { focusStyles, hoverStyles } from '../SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderLinkItem,
  AppHeaderProfileDropdownItem,
} from '../types';

const AppHeaderAvatarTargetButton = styled.button`
  background-color: transparent;
  border: transparent;
  font-weight: normal;
  padding: 1rem 0;
  cursor: pointer;
  ${hoverStyles}
  ${focusStyles}
`;

export type AppHeaderProfileDropdownProps = {
  baseZIndex: number;
  item: AppHeaderProfileDropdownItem;
  onClick: AppHeaderClickHandler;
};

export const AppHeaderProfileDropdown: React.FC<AppHeaderProfileDropdownProps> = ({
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
    <AppHeaderAvatarTargetButton
      onClick={(event) => toggleIsOpen(event)}
      style={{ paddingTop: pxRem(2), paddingBottom: pxRem(2) }}
    >
      <AppHeaderAvatar imageUrl={item.avatar} />
    </AppHeaderAvatarTargetButton>
  );

  return (
    <>
      <div ref={headerDropdownRef}>{clickTarget}</div>
      <AppHeaderPopover
        align={'right'}
        baseZIndex={baseZIndex}
        verticalOffset={0}
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
