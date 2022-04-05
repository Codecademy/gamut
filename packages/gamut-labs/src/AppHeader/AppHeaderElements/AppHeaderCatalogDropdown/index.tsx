import { Box, FlexBox } from '@codecademy/gamut';
import cx from 'classnames';
import React, { useRef, useState } from 'react';

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
  const boxRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const handleOnClick = (event: React.MouseEvent) => {
    toggleIsOpen();
    if (!isOpen) {
      action(event, item);
    }
  };

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
          width: '36.75',
        }}
        initial={{ borderWidth: 0, height: 0 }}
        animate={{
          borderWidth: isOpen ? 1 : 0,
          height: isOpen ? dimensions.height : 0,
        }}
        transition={{ duration: 0.175 }}
        aria-hidden={!isOpen}
      >
        <FlexBox ref={boxRef} flexDirection="column">
          <Box>Box 1</Box>
          <Box>Box 2</Box>
          <Box>Box 3</Box>
          <Box>Box 4</Box>
        </FlexBox>
      </StyledDropdown>
    </>
  );
};
