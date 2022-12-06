import { IconButton } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import { Avatar } from '../../../Avatar';
import {
  DropdownAnchor,
  DropdownIcon,
  StyledDropdown,
  StyledText,
} from '../../shared';
import { AppHeaderLinkSections } from '../AppHeaderLinkSections';
import { AppHeaderClickHandler, AppHeaderDropdownItem } from '../types';

const StyledLinkSection = styled(AppHeaderLinkSections)(
  css({
    padding: `0.75rem 0`,
    position: `absolute`,
  })
);

export type AppHeaderDropdownProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

const KEY_CODES = {
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

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  action,
  item,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const [focusIndex, setFocusIndex] = useState(0);

  const focusFirstItem = () => setFocusIndex(0);
  const focusLastItem = () => setFocusIndex(itemsCount);

  const itemsCount = useMemo(() => [...item.popover].flat().length - 1, [item]);

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

  const focusButton = () => {
    buttonRef?.current?.focus();
  };

  const getNode = (index: number) => {
    const children = listRef?.current?.childNodes[index].childNodes;
    if (children) {
      const nodeList = Array.from(children);
      return nodeList.find(
        (node) => node.nodeName === 'A'
      ) as HTMLAnchorElement;
    }
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
  }, [focusIndex, isOpen, itemsCount]);

  useIsomorphicLayoutEffect(() => {
    if (listRef.current) {
      const { height, width } = listRef.current.getBoundingClientRect();
      setDimensions({ height, width });
    }
  }, [listRef, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | Event) {
      const list = listRef?.current;
      const button = buttonRef?.current;
      if (
        isOpen &&
        list &&
        !list.contains(event.target as Node) &&
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
  }, [listRef, isOpen, handleClose]);

  const isProfileDropdown = item.type === 'profile-dropdown';

  const clickTarget = isProfileDropdown ? (
    <IconButton
      aria-expanded={isOpen}
      aria-haspopup
      ref={buttonRef}
      onClick={handleOnClick}
      onKeyDown={buttonHandleKeyEvents}
      tabIndex="-1"
      data-testid="avatar-dropdown-button"
      variant="interface"
    >
      <Avatar
        src={item.avatar}
        alt="User profile avatar"
        disableDropshadow
        size={40}
      />
    </IconButton>
  ) : (
    <DropdownAnchor
      ref={buttonRef}
      onClick={handleOnClick}
      onKeyDown={buttonHandleKeyEvents}
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
      <DropdownIcon aria-label="dropdown" open={isOpen} size={12} />
    </DropdownAnchor>
  );

  return (
    <>
      {clickTarget}
      <StyledDropdown
        style={{
          right: isProfileDropdown ? '0.5rem' : '',
          top: isProfileDropdown ? '2.75rem' : '2.25rem',
          width: dimensions.width,
        }}
        initial={{ borderWidth: 0, height: 0 }}
        animate={{
          borderWidth: isOpen ? 1 : 0,
          height: isOpen ? dimensions.height : 0,
        }}
        transition={{ duration: 0.175 }}
        aria-hidden={!isOpen}
        onKeyDown={menuHandleKeyEvents}
      >
        <StyledLinkSection
          action={action}
          item={item}
          role="menu"
          ref={listRef}
          id={`menu-container${item.text}`}
          showIcon={isProfileDropdown ?? null}
          onKeyDown={menuHandleKeyEvents}
          aria-controls={`menu-container${item.text}`}
          aria-label={item.text}
          aria-hidden={!isOpen}
        />
      </StyledDropdown>
    </>
  );
};
