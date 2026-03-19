import { GamutIconProps } from '@codecademy/gamut-icons';
import { StyleProps } from '@codecademy/variance';
import type {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { ComponentProps, forwardRef, useMemo } from 'react';

import type { ButtonBaseProps, ButtonElementProps } from '../Button/shared';
import { createButtonComponent } from '../Button/shared';
import type { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonBaseElements as ButtonBaseElementsValue } from '../ButtonBase/ButtonBase';
import {
  paginationStrokeButtonStates,
  paginationStrokeVariant,
  paginationTextButtonStates,
  paginationTextVariant,
} from './styles';

export interface BasePaginationButtonProps {
  showButton?: 'shown' | 'hidden';
}

export const PaginationTextButtonInner =
  createButtonComponent<BasePaginationButtonProps>(
    paginationTextButtonStates,
    paginationTextVariant
  );

export const PaginationStrokeButtonInner =
  createButtonComponent<BasePaginationButtonProps>(
    paginationStrokeButtonStates,
    paginationStrokeVariant
  );

/** Props for PaginationButton. Use when wrapping or composing PaginationButton. */
export interface PaginationButtonProps
  extends ButtonBaseProps,
    ButtonElementProps,
    StyleProps<typeof paginationStrokeButtonStates> {
  icon?: ComponentType<GamutIconProps>;
  buttonType?: 'stroke' | 'text';
  href?: string;
  showButton?: 'shown' | 'hidden';
}

const PaginationButtonComponent = forwardRef<
  ButtonBaseElementsValue,
  ComponentProps<typeof PaginationStrokeButtonInner> &
    StyleProps<typeof paginationStrokeButtonStates> & {
      icon?: ComponentType<GamutIconProps>;
      buttonType?: 'stroke' | 'text';
      href?: string;
    }
>(
  (
    {
      children,
      icon: Icon,
      buttonType = 'stroke',
      showButton = 'shown',
      ...props
    },
    ref
  ) => {
    const ButtonStyleWrapper = useMemo(() => {
      return buttonType === 'stroke'
        ? PaginationStrokeButtonInner
        : PaginationTextButtonInner;
    }, [buttonType]);

    return (
      <ButtonStyleWrapper
        aria-hidden={showButton === 'hidden'}
        showButton={showButton}
        {...props}
        ref={ref}
      >
        {Icon && <Icon aria-hidden height={14} width={14} />}
        {children}
      </ButtonStyleWrapper>
    );
  }
);

export const PaginationButton =
  PaginationButtonComponent as unknown as ForwardRefExoticComponent<
    PaginationButtonProps & RefAttributes<ButtonBaseElements>
  >;
