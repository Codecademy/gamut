import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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

export const FeatureShimmer: React.FC<BoxProps> = ({ children, ...rest }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (inView) {
      console.log('is in view');
      setIsInView(true);
    }
  }, [inView]);

  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion || !isInView) {
    console.log('not doing animation');
    return <Box {...rest}>{children}</Box>;
  }

  console.log('doing animation');
  return (
    <Box {...rest} ref={ref}>
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
        animate={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
        transition={{
          ease: 'easeOut',
          duration: 0.3,
          delay: 4,
        }}
      >
        <Shimmer
          animate={{
            left: '110%', // extra % to account for rotation
          }}
          transition={{
            ease: 'easeInOut',
            duration: 2,
            delay: 2,
          }}
        />
        {children}
      </BaseContainer>
    </Box>
  );
};
