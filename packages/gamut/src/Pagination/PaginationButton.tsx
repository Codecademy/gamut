import { GamutIconProps } from '@codecademy/gamut-icons';
import { forwardRef, useMemo } from 'react';
import * as React from 'react';

import { createButtonComponent } from '../Button/shared';
import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  paginationStrokeButtonStates,
  paginationStrokeVariant,
  paginationTextButtonStates,
  paginationTextVariant,
} from './styles';

export interface BasePaginationButtonProps {
  showButton?: 'shown' | 'hidden';
}

const PaginationTextButtonInner = createButtonComponent<BasePaginationButtonProps>(
  paginationTextButtonStates,
  paginationTextVariant
);

const PaginationStrokeButtonInner = createButtonComponent<BasePaginationButtonProps>(
  paginationStrokeButtonStates,
  paginationStrokeVariant
);

export interface PaginationButtonProps
  extends Omit<typeof PaginationStrokeButtonInner, 'variant'> {
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
      <ButtonStyleWrapper
        aria-hidden={showButton === 'hidden'}
        showButton={showButton}
        {...props}
        ref={ref}
      >
        {Icon && <Icon width={14} height={14} aria-hidden />}
        {children}
      </ButtonStyleWrapper>
    );
  }
);
