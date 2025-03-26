import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../Box';
import { cardVariants, shadowVariants } from './styles';
import { CardWrapperProps } from './types';

export const MotionBox = motion.create(Box);

export const CardWrapper = styled(MotionBox)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);
