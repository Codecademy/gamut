import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../../Box';

const rowBaseStyles = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 0,
  position: 'relative',
  bg: 'transparent',
  border: 'none',
  textDecoration: 'none',
  cursor: 'inherit',
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary',
    outlineOffset: '2px',
  },
});

const interactiveStyles = css({
  cursor: 'pointer',
  '&:hover': {
    bg: 'background-hover',
  },
});

export const RowWrapper = styled('div', styledOptions<'div'>())(rowBaseStyles);
export const RowButton = styled('button', styledOptions<'button'>())(
  rowBaseStyles,
  interactiveStyles
);
export const RowAnchor = styled('a', styledOptions<'a'>())(
  rowBaseStyles,
  interactiveStyles
);

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

export const barListItemPadding = 16;

export const BarListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box as="li" p={barListItemPadding}>
      {children}
    </Box>
  );
};
