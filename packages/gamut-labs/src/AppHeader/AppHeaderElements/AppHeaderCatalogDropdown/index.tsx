import cx from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import {
  DropdownAnchor,
  DropdownIcon,
  StyledDropdown,
  StyledText,
} from '../../shared';
import { AppHeaderCatalogSection } from '../AppHeaderCatalogSection';
import { AppHeaderCatalogDropdownItem, AppHeaderClickHandler } from '../types';

export type AppHeaderCatalogDropdownProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderCatalogDropdownItem;
};

export const AppHeaderCatalogDropdown: React.FC<AppHeaderCatalogDropdownProps> = ({
  action,
  item,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const focusButton = () => {
    buttonRef?.current?.focus();
  };

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const handleOnClick = (event: React.MouseEvent) => {
    toggleIsOpen();
    if (!isOpen) {
      action(event, item);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    focusButton();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      const { height } = containerRef.current.getBoundingClientRect();
      setHeight(height);
    }
  }, [containerRef, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | Event) {
      const container = containerRef?.current;
      const button = buttonRef?.current;
      if (
        isOpen &&
        container &&
        !container.contains(event.target as Node) &&
        button &&
        !button.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('blur', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('blur', handleClickOutside);
    };
  }, [containerRef, handleClose, isOpen]);

  return (
    <>
      <DropdownAnchor
        ref={buttonRef}
        onClick={handleOnClick}
        title={item.text}
        variant="interface"
        tabIndex="-1"
        aria-expanded={isOpen}
        aria-haspopup
      >
        <StyledText
          fontWeight={isOpen ? 'bold' : 'normal'}
          textAlign="center"
          title={item.text}
        >
          {item.text}
        </StyledText>
        <DropdownIcon
          aria-label="dropdown"
          className={cx(isOpen && 'open')}
          size={12}
        />
      </DropdownAnchor>
      <StyledDropdown
        style={{
          top: '2.50rem',
          width: '38rem',
        }}
        initial={{ borderWidth: 0, height: 0 }}
        animate={{
          borderWidth: isOpen ? 1 : 0,
          height: isOpen ? height : 0,
        }}
        transition={{ duration: 0.175 }}
        aria-hidden={!isOpen}
      >
        <AppHeaderCatalogSection
          action={action}
          item={item}
          role="menu"
          ref={containerRef}
          id={`menu-container${item.text}`}
        />
      </StyledDropdown>
    </>
  );
};
