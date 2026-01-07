import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../../Box';

/**
 * Container for bars with responsive height
 */
export const BarWrapper = styled(Box)(
  css({
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    flex: 1,
    height: { _: 12, sm: 20 },
    borderRadius: { _: 'md', sm: 'xl' },
  })
);

const baseBarStyles = {
  alignItems: 'center',
  border: 1,
  borderColor: 'border-primary',
  borderRadius: 'inherit',
  display: 'flex',
  height: '100%',
  left: 0,
  position: 'absolute',
} as const;

/**
 * Animated bar element for background/total value display
 */
export const BackgroundBar = styled(motion.create(Box))(
  css({
    ...baseBarStyles,
  })
);

/**
 * Foreground bar for stacked display (progress value)
 */
export const ForegroundBar = styled(motion.create(Box))(
  css({
    ...baseBarStyles,
  })
);

export const BarsList = styled('ul')(
  css({
    listStyle: 'none',
    '& li:nth-of-type(even)': {
      bg: 'background-selected',
    },
  })
);
