import { GamutIconProps } from '@codecademy/gamut-icons';
import { ComponentProps, ComponentType, forwardRef, useMemo } from 'react';

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

export const PaginationTextButtonInner = createButtonComponent<BasePaginationButtonProps>(
  paginationTextButtonStates,
  paginationTextVariant
);

export const PaginationStrokeButtonInner = createButtonComponent<BasePaginationButtonProps>(
  paginationStrokeButtonStates,
  paginationStrokeVariant
);

export interface PaginationButtonProps
  extends Omit<ComponentProps<typeof PaginationStrokeButtonInner>, 'variant'> {
  icon: ComponentType<GamutIconProps>;
  variant?: 'stroke' | 'text';
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
      <>
        <PaginationStrokeButtonInner aria-label="75" />
        <ButtonStyleWrapper
          aria-hidden={showButton === 'hidden'}
          showButton={showButton}
          {...props}
          ref={ref}
        >
          {Icon && <Icon width={14} height={14} aria-hidden />}
          {children}
        </ButtonStyleWrapper>
      </>
    );
  }
);
