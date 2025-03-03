import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../Box';
import {
  cardVariants,
  hoverShadowVariant,
  patternState,
  shadowVariants} from './styles';
import { CardProps } from './types';


export const DynamicCardWrapper = styled(Box)<CardProps>(
  cardVariants,
  shadowVariants,
  hoverShadowVariant,
);

export const StaticCardWrapper = styled(Background)<CardProps>(
  cardVariants,
  shadowVariants,
  hoverShadowVariant,
);

export const CardWrapper = motion.create(Box);
export const PatternWrapper = styled(CardWrapper)(
  patternState
)


