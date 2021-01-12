import { Box } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { colors, pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { Popover } from '../..';
import { focusStyles } from '../../AppHeader/styles';
import { AppHeaderPopover } from '../../AppHeader/types';
import { AppHeaderLinkElement } from '../AppHeaderLinkElement';
import styles from './styles.scss';

const AppHeaderTargetButton = styled.button`
  background-color: transparent;
  text-align: left;
  display: flex;
  align-items: center;
  color: ${colors.navy};
  border: 1px solid transparent;
  line-height: 1.5;
  white-space: nowrap;
  font-weight: normal;
  min-width: 0;
  padding: 1rem 0;
  font-size: 0;
  &:hover {
    color: ${colors.hyper};
    text-decoration: none;
  }
  ${focusStyles}
`;

export type AppHeaderDropdownProps = {
  item: AppHeaderPopover;
  onClick: (event: React.MouseEvent, trackingTarget: string) => void;
};

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  item,
  onClick,
}) => {
  const headerDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
    !isOpen && onClick(event, item.trackingTarget);
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
      <Popover
        className={styles.topDropdown}
        align="left"
        verticalOffset={-2}
        outline
        isOpen={isOpen}
        onRequestClose={handleClose}
        targetRef={headerDropdownRef}
      >
        <Box paddingY={12}>
          {item.popover.map((link) => {
            return (
              <AppHeaderLinkElement
                item={link}
                key={link.id}
                className={styles.menuItem}
                onClick={onClick}
                horizontalPadding={1}
              />
            );
          })}
        </Box>
      </Popover>
    </>
  );
};
