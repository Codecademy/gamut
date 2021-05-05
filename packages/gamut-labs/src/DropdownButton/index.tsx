import { FillButton, StrokeButton } from '@codecademy/gamut';
import React from 'react';

export type DropdownButtonProps = {
  buttonText: string;
  buttonType: 'fill' | 'stroke';
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttonText,
  buttonType,
}) => {
  let clickTarget: React.ReactNode;

  switch (buttonType) {
    case 'fill':
      clickTarget = <FillButton>{buttonText}</FillButton>;
      break;
    case 'stroke':
      clickTarget = <StrokeButton>{buttonText}</StrokeButton>;
      break;
    default:
      clickTarget = null;
  }

  return <div>{clickTarget}</div>;
};
