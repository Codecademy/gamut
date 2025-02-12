import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box, BoxProps } from '../Box';

const BaseContainer = motion(Box);
const Shimmer = styled(BaseContainer)(
  css({
    width: '100px',
    height: '144px',
    position: 'absolute',
    transform: 'rotate(30deg)',
    filter: 'blur(25px)',
    left: '-100%',
    bg: 'white-400',
  })
);

export const FeatureShimmer: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box {...rest}>
      <BaseContainer
        width={1}
        height={1}
        overflow="hidden"
        border={1}
        borderColor="border-tertiary"
        bg="background-selected"
        px={32}
        py={16}
        animate={{
          backgroundColor: 'transparent',
          border: 'none',
        }}
        transition={{
          ease: 'fadeOut',
          duration: '300ms',
          delay: 3,
        }}
      >
        <Shimmer
          animate={{
            left: '100%',
          }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 2,
          }}
        />
        {children}
      </BaseContainer>
    </Box>
  );
};
