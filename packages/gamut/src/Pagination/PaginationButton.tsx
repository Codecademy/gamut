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

export type PaginationButtonProps = ComponentProps<
  typeof PaginationStrokeButtonInner
> &
  StyleProps<typeof paginationStrokeButtonStates> & {
    icon?: ComponentType<GamutIconProps>;
    buttonType?: 'stroke' | 'text';
    href?: string;
  };

export const PaginationButton = forwardRef<
  ButtonBaseElements | null,
  PaginationButtonProps
  // eslint-disable-next-line react/prop-types
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
