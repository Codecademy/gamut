import { FillButton, StrokeButton } from '@codecademy/gamut';
import React, { useRef, useState } from 'react';

import { Popover } from '../Popover';
import { DropdownItem, DropdownList } from './DropdownList';

export type DropdownButtonProps = {
  buttonText: string;
  buttonType: 'fill' | 'stroke';
  dropdownItems: DropdownItem[];
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttonText,
  buttonType,
  dropdownItems,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
  };

  let clickTarget: React.ReactNode;
  switch (buttonType) {
    case 'fill':
      clickTarget = <FillButton onClick={handleClick}>{buttonText}</FillButton>;
      break;
    case 'stroke':
      clickTarget = (
        <StrokeButton onClick={handleClick}>{buttonText}</StrokeButton>
      );
      break;
    default:
      clickTarget = null;
  }

  return (
    <>
      <div ref={targetRef}>{clickTarget}</div>
      <Popover targetRef={targetRef} isOpen={isOpen}>
        <DropdownList dropdownItems={dropdownItems} />
      </Popover>
    </>
  );
};
