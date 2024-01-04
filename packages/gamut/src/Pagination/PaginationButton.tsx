import { GamutIconProps, StreakIcon } from '@codecademy/gamut-icons';
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
type PaginationTOVar = ComponentProps<typeof PaginationTextButtonInner>;

export type PaginationButtonProps = PaginationTOVar & {
  icon: ComponentType<GamutIconProps>;
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

// CASS: Note to self - you are figuring out why href is not working here :)
const Hey = () => {
  return <PaginationButton href="/" icon={StreakIcon} buttonType="text" />;
};
