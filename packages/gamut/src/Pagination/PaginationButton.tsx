import { GamutIconProps } from '@codecademy/gamut-icons';
import { motion } from 'framer-motion';
import React, { forwardRef, useMemo } from 'react';

import { Box } from '..';
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
  showButton?: 'shown' | 'hidden' | 'none';
}

const variants = {
  shown: { opacity: 1, display: 'visible' },
  hidden: {
    opacity: 0,
    display: 'none',
  },
  none: { opacity: 0, x: '-1000%' },
};

export const PaginationButton = forwardRef<
  ButtonBaseElements,
  PaginationButtonProps
  // eslint-disable-next-line react/prop-types
>(({ children, icon: Icon, variant = 'stroke', showButton, ...props }, ref) => {
  const Wrapper = useMemo(() => {
    return variant === 'stroke'
      ? PaginationStrokeButtonInner
      : PaginationTextButtonInner;
  }, [variant]);

  return (
    <Box minHeight="2.5rem" minWidth="3rem">
      <motion.div animate={showButton} variants={variants}>
        <Wrapper {...props} ref={ref}>
          {Icon && <Icon width={14} height={14} aria-hidden />}
          {children}
        </Wrapper>
      </motion.div>
    </Box>
  );
});
