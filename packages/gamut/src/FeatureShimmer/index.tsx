import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion, useReducedMotion } from 'framer-motion';

import { Box, BoxProps } from '../Box';

const BaseContainer = motion.create(Box);
const Shimmer = styled(BaseContainer)(
  css({
    height: 'calc(100% + 20px)',
    width: 'calc(100% / 8)',
    position: 'absolute',
    transform: 'rotate(30deg)',
    filter: 'blur(25px)',
    left: '-100%',
    top: 0,
    bg: 'white-400',
  })
);

const boxVariants = {
  inView: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    transition: {
      ease: 'easeOut',
      duration: 0.3,
      delay: 4,
    },
  },
};

const shimmerVariants = {
  inView: {
    left: '110%', // extra % to account for rotation
    transition: {
      ease: 'easeInOut',
      duration: 2,
      delay: 2,
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
          width={1}
          height={1}
          overflow="hidden"
          border={1}
          borderColor="border-tertiary"
          bg="background-selected"
          px={32}
          py={16}
          position="relative"
          borderRadius={rest?.borderRadius}
          variants={boxVariants}
          whileInView="inView"
          viewport={{ once: true }}
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
