import { GamutIconProps } from '@codecademy/gamut-icons';
import React, { forwardRef } from 'react';

import { ButtonProps, createButtonComponent } from '../Button/shared';
import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  paginationStrokeButtonStates,
  paginationStrokeVariant,
  paginationTextButtonStates,
  paginationTextVariant,
} from './elements';

export const PaginationTextButtonInner = createButtonComponent(
  paginationTextButtonStates,
  paginationTextVariant
);

export const PaginationStrokeButtonInner = createButtonComponent(
  paginationStrokeButtonStates,
  paginationStrokeVariant
);

export interface PaginationButtonProps extends Omit<ButtonProps, 'variant'> {
  'aria-label': string;
  icon: React.ComponentType<GamutIconProps>;
  variant?: 'stroke' | 'text';
}

export const PaginationButtonWrapper: React.FC<PaginationButtonProps> = ({
  children,
  variant,
  ...rest
}) => {
  if (variant === 'stroke') {
    return (
      <PaginationTextButtonInner {...rest}>
        {children}
      </PaginationTextButtonInner>
    );
  }
  return (
    <PaginationStrokeButtonInner {...rest}>
      {children}
    </PaginationStrokeButtonInner>
  );
};

export const PaginationButton = forwardRef<
  ButtonBaseElements,
  PaginationButtonProps
>(({ children, icon: Icon, ...props }, ref) => {
  return (
    <PaginationTextButtonInner {...props} variant={variant} ref={ref}>
      {Icon && (
        <Icon
          width="calc(100% - 14px)"
          height="calc(100% - 14px)"
          aria-hidden
        />
      )}
      {children}
    </PaginationTextButtonInner>
  );
});
