import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../Box';
import { cardVariants, shadowVariants } from './styles';
import { CardWrapperProps } from './types';

export const MotionBox = motion.create(Box);

export const DynamicCardWrapper = styled(MotionBox)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);

const StaticCard = motion.create(Background);
export const StaticCardWrapper = styled(StaticCard)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);
