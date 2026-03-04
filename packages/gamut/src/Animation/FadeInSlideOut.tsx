import { timingValues } from '@codecademy/gamut-styles';
import { motion } from 'motion/react';
import * as React from 'react';

import { Box } from '../Box';
import { WithChildrenProp } from '../utils';

const exitDuration = timingValues.fast / 1000;

const motionVariants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: exitDuration },
  },
  exit: {
    height: 0,
    opacity: 0,
    x: 100,
    transition: { duration: exitDuration, height: { delay: exitDuration } },
  },
};

const BaseContainer = motion.create(Box);

export const FadeInSlideOut: React.FC<WithChildrenProp> = ({ children }) => (
  <BaseContainer
    animate="visible"
    exit="exit"
    initial="initial"
    py={8}
    variants={motionVariants}
  >
    {children}
  </BaseContainer>
);
