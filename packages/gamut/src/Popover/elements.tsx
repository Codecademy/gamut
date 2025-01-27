import { css, timingValues, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { BodyPortal } from '../BodyPortal';
import { Box, FlexBox } from '../Box';
import { popoverToolTipBodyAlignments } from '../Tip/shared/styles';
import { WithChildrenProp } from '../utils';
import {
  beakSize,
  beakVariants,
  outlineVariants,
  patternContainerBaseStyles,
  patternVariantStyles,
  popoverStates,
  raisedDivVariants,
  transformValues,
  widthStates,
} from './styles';
import { PopoverProps } from './types';

export type PopoverVariants = StyleProps<typeof raisedDivVariants> & {
  widthRestricted?: boolean;
};

export const RaisedDiv = styled.div<
  StyleProps<typeof outlineVariants> &
    StyleProps<typeof raisedDivVariants> &
    StyleProps<typeof popoverToolTipBodyAlignments> &
    StyleProps<typeof widthStates>
>(
  outlineVariants,
  popoverToolTipBodyAlignments,
  raisedDivVariants,
  widthStates
);

export const Beak = styled(Box)<
  StyleProps<typeof popoverStates> &
    StyleProps<typeof outlineVariants> &
    StyleProps<typeof beakVariants> &
    StyleProps<typeof beakSize>
>(beakVariants, beakSize);

export const BeakBox = styled(FlexBox)(
  css({
    alignItems: 'flex-end',
    bg: 'blue',
    height: '15px',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    px: 8,
    top: -15,
    width: '100%',
  })
);

export const PatternContainer = styled.div(
  variant({
    base: {
      height: '100%',
      ...patternContainerBaseStyles,
    },
    variants: patternVariantStyles,
  })
);

export const PopoverPortal: React.FC<
  Pick<PopoverProps, 'animation' | 'isOpen'> & WithChildrenProp
> = ({ animation, isOpen, ...rest }) =>
  animation ? (
    <AnimatePresence>
      {isOpen && (
        <BodyPortal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: timingValues.fast / 1000,
              duration: timingValues.fast / 1000,
            }}
            {...rest}
          />
        </BodyPortal>
      )}
    </AnimatePresence>
  ) : (
    <BodyPortal {...rest} />
  );

export type PopoverContainerProps = Pick<PopoverProps, 'position' | 'align'>;

export const PopoverContainer = styled.div<PopoverContainerProps>`
  position: fixed;
  display: flex;
  transform: ${({ position, align }) =>
    position &&
    align &&
    `${transformValues[position]} ${transformValues[align]}`};
`;
