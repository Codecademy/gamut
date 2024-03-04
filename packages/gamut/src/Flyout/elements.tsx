import { motion } from 'framer-motion';

import { Box } from '../Box';

export const ButtonContainer = motion(Box);

export const closeButtonVariants = {
  right: {
    rightClosed: {
      right: '-26rem',
    },
    rightExpanded: { right: '1rem' },
  },
  left: {
    leftExpanded: {
      left: '26rem',
    },
    leftClosed: {
      left: 0,
    },
  },
};

export const getAnimationVariant = ({
  openFrom,
  expanded,
}: {
  openFrom?: 'left' | 'right';
  expanded?: boolean;
}) => {
  if (openFrom === 'left') {
    return expanded ? 'leftExpanded' : 'leftClosed';
  }
  return expanded ? 'rightExpanded' : 'rightClosed';
};
