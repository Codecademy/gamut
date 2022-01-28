import { GamutIconProps } from '@codecademy/gamut-icons';
import { motion } from 'framer-motion';
import React, { forwardRef, useMemo } from 'react';

import { ButtonProps, createButtonComponent } from '../Button/shared';
import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  paginationStrokeButtonStates,
  paginationStrokeVariant,
  paginationTextButtonStates,
  paginationTextVariant,
} from './elements';

const PaginationTextButtonInner = motion(
  createButtonComponent(paginationTextButtonStates, paginationTextVariant)
);

const PaginationStrokeButtonInner = motion(
  createButtonComponent(paginationStrokeButtonStates, paginationStrokeVariant)
);

export interface PaginationButtonProps extends Omit<ButtonProps, 'variant'> {
  icon: React.ComponentType<GamutIconProps>;
  variant?: 'stroke' | 'text';
  showButton?: 'shown' | 'hidden' | 'none';
}

const variants = {
  shown: { opacity: 1, visibility: 'visible', cursor: 'pointer' },
  hidden: {
    opacity: 0,
    visibility: 'hidden',
    cursor: 'default',
  },
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
    const Wrapper = useMemo(() => {
      return variant === 'stroke'
        ? PaginationStrokeButtonInner
        : PaginationTextButtonInner;
    }, [variant]);

    return (
      <Wrapper {...props} ref={ref} animate={showButton} variants={variants}>
        {Icon && <Icon width={14} height={14} aria-hidden />}
        {children}
      </Wrapper>
    );
  }
);
