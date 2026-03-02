import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import * as React from 'react';

import { Box } from '../Box';
import { cardVariants, shadowVariants } from './styles';
import { CardWrapperProps } from './types';

/** Minimal motion props used by Card; avoids TS4023 in declaration emit (React 19). */
type MotionBoxProps = React.ComponentProps<typeof Box> & {
  initial?: string;
  animate?: string;
  whileHover?: string;
  variants?: Variants;
};

export const MotionBox = motion.create(
  Box
) as React.ComponentType<MotionBoxProps>;

export const DynamicCardWrapper = styled(MotionBox)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);

const StaticCard = motion.create(Background);
export const StaticCardWrapper = styled(StaticCard)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);
