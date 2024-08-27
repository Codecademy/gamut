import { timingValues, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { WithChildrenProp } from '..';
import { BodyPortal } from '../BodyPortal';
import { Box } from '../Box';
import { popoverToolTipBodyAlignments } from '../Tip/shared/styles';
import {
  beakSize,
  beakVariants,
  outlineVariants,
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

// TO-DO -- prob should use variance compose, only needs left
export const Beak = styled(Box)<
  StyleProps<typeof popoverStates> &
    StyleProps<typeof outlineVariants> &
    StyleProps<typeof beakVariants> &
    StyleProps<typeof beakSize>
>(beakVariants, beakSize);

export const PatternContainer = styled.div(
  variant({
    base: {
      width: '100%',
      height: '100%',
      borderRadius: 'sm',
      overflow: 'hidden',
      bg: 'background',
      position: 'absolute',
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

type PopoverContainerProps = Pick<PopoverProps, 'position' | 'align'>;

export const PopoverContainer = styled.div<PopoverContainerProps>`
  position: fixed;
  display: flex;
  transform: ${({ position, align }) =>
    position &&
    align &&
    `${transformValues[position]} ${transformValues[align]}`};
`;
