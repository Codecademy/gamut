import { Box, FillButton, StrokeButton } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem, shouldForwardProp } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { Popover } from '../Popover';
import { DropdownItem, DropdownList } from './DropdownList';

const DownArrow = styled(ArrowChevronDownFilledIcon, { shouldForwardProp })<{
  isOpen?: boolean;
}>`
  margin-left: ${pxRem(8)};
  transition: transform 0.35s ease-out;
  ${({ isOpen }) => isOpen && 'transform: rotate(-180deg)'};
`;

export type DropdownButtonProps = {
  buttonType?: 'fill' | 'stroke';
  dropdownItems: DropdownItem[];
  align?: 'left' | 'right';
  onClick?: (event: React.MouseEvent) => void;
  verticalOffset?: number;
  horizontalOffset?: number;
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttonType = 'fill',
  children,
  align = 'left',
  dropdownItems,
  onClick,
  verticalOffset,
  horizontalOffset,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event: React.MouseEvent) => {
    !isOpen && onClick && onClick(event);
    setIsOpen(!isOpen);
  };
  const handleRequestClosed = () => {
    setIsOpen(false);
  };

  let clickTarget: React.ReactNode;
  switch (buttonType) {
    case 'fill':
      clickTarget = (
        <FillButton onClick={handleClick} data-testid="dropdown-fill-button">
          {children}
          <DownArrow isOpen={isOpen} size={12} aria-label="dropdown" />
        </FillButton>
      );
      break;
    case 'stroke':
      clickTarget = (
        <StrokeButton
          onClick={handleClick}
          data-testid="dropdown-stroke-button"
        >
          {children}
          <DownArrow isOpen={isOpen} size={12} aria-label="dropdown" />
        </StrokeButton>
      );
      break;
  }

  return (
    <>
      <Box display="inline-block" ref={targetRef}>
        {clickTarget}
      </Box>
      {isOpen && dropdownItems.length !== 0 && (
        <Popover
          targetRef={targetRef}
          isOpen={isOpen}
          onRequestClose={handleRequestClosed}
          align={align}
          verticalOffset={verticalOffset}
          horizontalOffset={horizontalOffset}
          outline
        >
          <DropdownList dropdownItems={dropdownItems} />
        </Popover>
      )}
    </>
  );
};
