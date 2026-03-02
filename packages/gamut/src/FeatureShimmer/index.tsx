import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'motion/react';

import { Box, BoxProps } from '../Box';

const BaseContainer = motion.create(Box);
const Shimmer = styled(BaseContainer)(
  css({
    height: '150%',
    width: 'calc(100% / 9)',
    position: 'absolute',
    transform: 'rotate(30deg)',
    transformOrigin: 'top right',
    filter: 'blur(25px)',
    left: '-100%',
    top: 0,
    bg: 'white-400',
  })
);

const boxVariants = {
  inView: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    transition: {
      ease: 'easeOut' as const,
      duration: 0.3,
      delay: 4,
    },
  },
};

const shimmerVariants = {
  inView: {
    left: '120%', // extra % to account for rotation
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transition: {
      left: {
        ease: 'easeInOut' as const,
        duration: 2,
        delay: 2,
      },
      backgroundColor: {
        ease: 'easeOut' as const,
        duration: 1,
        delay: 4,
      },
    },
  },
};

export const FeatureShimmer: React.FC<Omit<BoxProps, 'ref'>> = ({
  children,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <Box {...rest}>
      {shouldReduceMotion ? (
        children
      ) : (
        <BaseContainer
          bg="background-selected"
          border={1}
          borderColor="border-tertiary"
          borderRadius={rest?.borderRadius}
          height={1}
          overflow="hidden"
          position="relative"
          variants={boxVariants}
          viewport={{ once: true }}
          whileInView="inView"
          width={1}
        >
          <Shimmer
            data-testid="feature-shimmer"
            variants={shimmerVariants}
            viewport={{ once: true }}
          />
          {children}
        </BaseContainer>
      )}
    </Box>
  );
};
