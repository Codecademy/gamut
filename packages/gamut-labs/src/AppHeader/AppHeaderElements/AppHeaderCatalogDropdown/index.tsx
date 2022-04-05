import { Box, Column, LayoutGrid } from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import cx from 'classnames';
import React, { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import {
  DropdownAnchor,
  DropdownIcon,
  StyledDropdown,
  StyledText,
} from '../AppHeaderDropdown';
import { AppHeaderCatalogDropdownItem, AppHeaderClickHandler } from '../types';

type AppHeaderCatalogDropdownProps = {
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

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      const { height } = containerRef.current.getBoundingClientRect();
      setHeight(height);
    }
  }, [containerRef, isOpen]);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const handleOnClick = (event: React.MouseEvent) => {
    toggleIsOpen();
    if (!isOpen) {
      action(event, item);
    }
  };

  console.log('item: ', item.popover);

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
          top: '2.25rem',
          width: pxRem(586),
        }}
        initial={{ borderWidth: 0, height: 0 }}
        animate={{
          borderWidth: isOpen ? 1 : 0,
          height: isOpen ? height : 0,
        }}
        transition={{ duration: 0.175 }}
        aria-hidden={!isOpen}
      >
        <LayoutGrid ref={containerRef}>
          {item.popover.map((rowData) => (
            <Column size={12}>
              <LayoutGrid>
                <Column size={4}>
                  <Box background={theme.colors['gray-100']}>
                    <Box>{rowData.title}</Box>
                    <Box>{rowData.description}</Box>
                  </Box>
                </Column>
                <Column size={8}>links will go here</Column>
              </LayoutGrid>
            </Column>
          ))}

          <Column size={12}>Button</Column>
        </LayoutGrid>
      </StyledDropdown>
    </>
  );
};
