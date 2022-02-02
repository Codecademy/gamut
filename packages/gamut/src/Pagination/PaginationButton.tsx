import { GamutIconProps } from '@codecademy/gamut-icons';
import React, { forwardRef, useMemo } from 'react';

import { ButtonProps, createButtonComponent } from '../Button/shared';
import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  paginationStrokeButtonStates,
  paginationStrokeVariant,
  paginationTextButtonStates,
  paginationTextVariant,
} from './elements';

const PaginationTextButtonInner = createButtonComponent(
  paginationTextButtonStates,
  paginationTextVariant
);

const PaginationStrokeButtonInner = createButtonComponent(
  paginationStrokeButtonStates,
  paginationStrokeVariant
);

export interface PaginationButtonProps extends Omit<ButtonProps, 'variant'> {
  icon: React.ComponentType<GamutIconProps>;
  variant?: 'stroke' | 'text';
  showButton?: 'shown' | 'hidden';
}

export const PaginationButton = forwardRef<
  ButtonBaseElements,
  PaginationButtonProps
  // eslint-disable-next-line react/prop-types
>(
  (
    {
      children,
      icon: Icon,
      variant = 'stroke',
      showButton = 'shown',
      ...props
    },
    ref
  ) => {
    const ButtonStyleWrapper = useMemo(() => {
      return variant === 'stroke'
        ? PaginationStrokeButtonInner
        : PaginationTextButtonInner;
    }, [variant]);

    return (
      <ButtonStyleWrapper showButton={showButton} {...props} ref={ref}>
        {Icon && <Icon width={14} height={14} aria-hidden />}
        {children}
      </ButtonStyleWrapper>
    );
  }
);
