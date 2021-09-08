import { motion } from 'framer-motion';
import React from 'react';

import { Box } from '../Box';

const entranceDuration = 0.35;
const exitDuration = entranceDuration / 2;

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

export const FadeInSlideOut: React.FC = ({ children }) => (
  <motion.div
    variants={motionVariants}
    initial="initial"
    animate="visible"
    exit="exit"
  >
    <Box py={8}>{children}</Box>
  </motion.div>
);
