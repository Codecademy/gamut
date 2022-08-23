import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  DropdownAnchor,
  DropdownIcon,
  LayoutGridAntiAliased,
  StyledDropdown,
  StyledText,
} from '../../shared';
import {
  AppHeaderCatalogDropdownItem,
  AppHeaderClickHandler,
  AppHeaderResourcesDropdownItem,
} from '../types';

export type AppHeaderDropdownSectionContainerProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderResourcesDropdownItem | AppHeaderCatalogDropdownItem;
  itemsCount: number;
  styles: {};
  dataFocusable: string;
};

export const KEY_CODES = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  END: 'End',
  ENTER: 'Enter',
  ESC: 'Escape',
  HOME: 'Home',
  SPACE: ' ',
  TAB: 'Tab',
} as const;

export const AppHeaderDropdownSectionContainer: React.FC<AppHeaderDropdownSectionContainerProps> = ({
  action,
  dataFocusable,
  item,
  itemsCount,
  children,
  styles,
}) => {
  const { text, dataTestId } = item;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [focusIndex, setFocusIndex] = useState(0);

  const focusFirstItem = () => setFocusIndex(0);
  const focusLastItem = () => setFocusIndex(itemsCount);

  const focusNextItem = () => {
    if (focusIndex === itemsCount) {
      focusFirstItem();
    } else {
      setFocusIndex(focusIndex + 1);
    }
  };

  const focusPreviousItem = () => {
    if (focusIndex === 0) {
      focusLastItem();
    } else {
      setFocusIndex(focusIndex - 1);
    }
  };

  const getNode = useCallback(
    (index: number) => {
      return containerRef.current?.querySelectorAll<HTMLElement>(dataFocusable)[
        index
      ];
    },
    [dataFocusable]
  );

  const buttonHandleKeyEvents = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case KEY_CODES.ENTER:
      case KEY_CODES.SPACE:
        event.preventDefault();
        setIsOpen(true);
        break;
      case KEY_CODES.DOWN:
        event.preventDefault();
        setIsOpen(true);
        focusFirstItem();
        break;
      case KEY_CODES.UP:
        event.preventDefault();
        setIsOpen(true);
        focusLastItem();
        break;
      default:
        break;
    }
  };

  const menuHandleKeyEvents = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case KEY_CODES.HOME:
        event.preventDefault();
        event.stopPropagation();
        focusFirstItem();
        break;
      case KEY_CODES.END:
        event.preventDefault();
        event.stopPropagation();
        focusLastItem();
        break;
      case KEY_CODES.UP:
        event.preventDefault();
        focusPreviousItem();
        break;
      case KEY_CODES.DOWN:
        event.preventDefault();
        focusNextItem();
        break;
      case KEY_CODES.TAB:
      case KEY_CODES.LEFT:
      case KEY_CODES.RIGHT:
        setIsOpen(false);
        break;
      case KEY_CODES.ESC:
        event.stopPropagation();
        handleClose();
        break;
      default:
        break;
    }
  };

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

  useEffect(() => {
    const firstNode = getNode(0);
    const nextNode = getNode(focusIndex);
    if (firstNode && nextNode) {
      if (isOpen) {
        if (focusIndex >= 0 && focusIndex <= itemsCount) {
          nextNode.focus();
        }
      }
    }
  }, [focusIndex, isOpen, itemsCount, getNode]);

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
        onKeyDown={buttonHandleKeyEvents}
        title={text}
        variant="interface"
        tabIndex="-1"
        aria-expanded={isOpen}
        aria-haspopup
        data-testid={dataTestId}
      >
        <StyledText
          fontWeight={isOpen ? 'bold' : 'normal'}
          textAlign="center"
          title={text}
        >
          {text}
        </StyledText>
        <DropdownIcon aria-label="dropdown" open={isOpen} size={12} />
      </DropdownAnchor>
      <StyledDropdown
        style={styles}
        initial={{ borderWidth: 0, height: 0 }}
        animate={{
          borderWidth: isOpen ? 1 : 0,
          height: isOpen ? 'fit-content' : 0,
        }}
        transition={{ duration: 0.175 }}
        aria-hidden={!isOpen}
        data-testid={dataTestId}
      >
        <LayoutGridAntiAliased
          ref={containerRef}
          as="ul"
          p={0}
          onKeyDown={menuHandleKeyEvents}
          onClick={() => setIsOpen(false)}
        >
          <>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { isOpen });
              }
              return child;
            })}
          </>
        </LayoutGridAntiAliased>
      </StyledDropdown>
    </>
  );
};
