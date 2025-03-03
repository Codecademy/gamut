import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box } from '../Box';
import {
  cardVariants,
  hoverShadowVariant,
  shadowVariants,
} from './styles';
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


