import { timingValues } from '@codecademy/gamut-styles';
import { motion } from 'framer-motion';
import * as React from 'react';

import { WithChildrenProp } from '..';
import { Box } from '../Box';

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

const BaseContainer = motion(Box);

export const FadeInSlideOut: React.FC<WithChildrenProp> = ({ children }) => (
  <BaseContainer
    variants={motionVariants}
    initial="initial"
    animate="visible"
    exit="exit"
    py={8}
  >
    {children}
  </BaseContainer>
);
