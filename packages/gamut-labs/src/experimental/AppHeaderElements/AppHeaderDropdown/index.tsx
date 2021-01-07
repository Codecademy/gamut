import { ButtonDeprecated, Container } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import cx from 'classnames';
import React, { useRef, useState } from 'react';

import { Popover } from '../..';
import { AppHeaderPopover } from '../../AppHeader/types';
import { AppHeaderLinkElement } from '../AppHeaderLinkElement';
import styles from './styles.scss';

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
    <ButtonDeprecated
      className={cx(styles.target, isOpen && styles.open)}
      onClick={toggleIsOpen}
      flat
      theme="navy"
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
    </ButtonDeprecated>
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
        <Container column className={styles.dropdown}>
          {item.popover.map((link) => {
            return (
              <AppHeaderLinkElement
                item={link}
                key={link.id}
                className={styles.menuItem}
                onClick={onClick}
              />
            );
          })}
        </Container>
      </Popover>
    </>
  );
};
