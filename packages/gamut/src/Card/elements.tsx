import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type { MotionProps } from 'motion/react';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { cardVariants, shadowVariants } from './styles';
import { CardWrapperProps } from './types';

type MotionBoxProps = ComponentProps<typeof Box> & MotionProps;
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
