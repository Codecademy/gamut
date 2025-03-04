import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../Box';
import { cardVariants, patternState, shadowVariants } from './styles';
import { CardProps } from './types';

export const CardContainer = motion.create(Box);
export const PatternWrapper = styled(CardContainer)(patternState);

export const DynamicCardWrapper = styled(CardContainer)<CardProps>(
  cardVariants,
  shadowVariants
);

const StaticCard = motion.create(Background);
export const StaticCardWrapper = styled(StaticCard)<CardProps>(
  cardVariants,
  shadowVariants
);
