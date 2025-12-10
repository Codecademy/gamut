import { timingValues, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

import { BodyPortal } from '../BodyPortal';
import { Box, FlexBox } from '../Box';
import { popoverToolTipBodyAlignments } from '../Tip/shared/styles/styles';
import { WithChildrenProp } from '../utils';
import {
  popoverStates,
  raisedDivVariants,
  transformValues,
} from './styles/base';
import { patternContainerBaseStyles } from './styles/pattern';
import {
  beakBorderStates,
  beakBoxVariants,
  beakSize,
  beakVariants,
  outlineVariants,
  patternVariantStyles,
  widthStates,
} from './styles/variants';
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
    StyleProps<typeof beakVariants> &
    StyleProps<typeof beakSize> &
    StyleProps<typeof beakBorderStates>
>(beakBorderStates, beakVariants, beakSize);

export const BeakBox =
  styled(FlexBox)<StyleProps<typeof beakBoxVariants>>(beakBoxVariants);

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
  Pick<PopoverProps, 'animation' | 'isOpen' | 'zIndex'> & WithChildrenProp
> = ({ animation, isOpen, zIndex, ...rest }) =>
  animation ? (
    <AnimatePresence>
      {isOpen && (
        <BodyPortal zIndex={zIndex}>
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
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
    <BodyPortal zIndex={zIndex} {...rest} />
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
