import { GamutIconProps } from '@codecademy/gamut-icons';
import { StyleProps } from '@codecademy/variance';
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

export type PaginationButtonProps = ComponentProps<
  typeof PaginationStrokeButtonInner
> &
  StyleProps<typeof paginationStrokeButtonStates> & {
    icon?: ComponentType<GamutIconProps>;
    buttonType?: 'stroke' | 'text';
  };

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
