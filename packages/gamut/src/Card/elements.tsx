import { Background, createComponent } from '@codecademy/gamut-styles';
import { motion } from 'framer-motion';

import { Box } from '../Box';
import { cardVariants, shadowVariants } from './styles';
import { CardWrapperProps } from './types';

export const MotionBox = motion.create(Box);

export const DynamicCardWrapper = createComponent(MotionBox)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);

const StaticCard = motion.create(Background);
export const StaticCardWrapper = createComponent(StaticCard)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);
