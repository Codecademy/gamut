import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import React from 'react';

import { Box } from '../Box';
import { cardVariants, shadowVariants } from './styles';
import { CardWrapperProps } from './types';

const MotionBoxInner = motion.create(Box);
type MotionBoxProps = Omit<
  React.ComponentProps<typeof Box>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onDragStart'
  | 'onDrag'
  | 'onDragEnd'
> & {
  onAnimationStart?: (definition: unknown) => void;
  onAnimationEnd?: (definition: unknown) => void;
  onDragStart?: (event: unknown, info?: unknown) => void;
  onDrag?: (event: unknown, info?: unknown) => void;
  onDragEnd?: (event: unknown, info?: unknown) => void;
} & Record<string, unknown>;
export const MotionBox: React.FC<MotionBoxProps> = (props) => (
  <MotionBoxInner {...props} />
);

const DynamicCardWrapperInner = styled(MotionBoxInner)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);
type DynamicCardWrapperProps = Omit<
  CardWrapperProps & Record<string, unknown>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onDragStart'
  | 'onDrag'
  | 'onDragEnd'
> & {
  onAnimationStart?: (definition: unknown) => void;
  onAnimationEnd?: (definition: unknown) => void;
  onDragStart?: (event: unknown, info?: unknown) => void;
  onDrag?: (event: unknown, info?: unknown) => void;
  onDragEnd?: (event: unknown, info?: unknown) => void;
};
export const DynamicCardWrapper: React.FC<DynamicCardWrapperProps> = (props) => (
  <DynamicCardWrapperInner {...props} />
);

const StaticCardInner = motion.create(Background);
const StaticCardWrapperInner = styled(StaticCardInner)<CardWrapperProps>(
  cardVariants,
  shadowVariants
);
type StaticCardWrapperProps = Omit<
  CardWrapperProps & Record<string, unknown>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onDragStart'
  | 'onDrag'
  | 'onDragEnd'
> & {
  onAnimationStart?: (definition: unknown) => void;
  onAnimationEnd?: (definition: unknown) => void;
  onDragStart?: (event: unknown, info?: unknown) => void;
  onDrag?: (event: unknown, info?: unknown) => void;
  onDragEnd?: (event: unknown, info?: unknown) => void;
};
export const StaticCardWrapper: React.FC<StaticCardWrapperProps> = (props) => (
  <StaticCardWrapperInner {...props} />
);
