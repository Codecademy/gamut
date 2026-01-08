import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../../Box';
import { barListItemPadding } from '../shared/styles';

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
  p: barListItemPadding,
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
    height: 20,
    borderRadius: { _: 'md', sm: 'xl' },
  })
);

const baseBarStyles = {
  alignItems: 'center',
  borderRadius: 'inherit',
  display: 'flex',
  height: '100%',
  left: 0,
  position: 'absolute',
} as const;

/**
 * Animated bar element for background/total value display
 * This bar has the border as it's the outer container
 */
export const BackgroundBar = styled(motion.create(Box))(
  css({
    ...baseBarStyles,
    borderWidth: '1px',
    borderStyle: 'solid',
  })
);

/**
 * Foreground bar for stacked display (progress value)
 * This bar also has a border with contrast-based color
 */
export const ForegroundBar = styled(motion.create(Box))(
  css({
    ...baseBarStyles,
    borderWidth: '1px',
    borderStyle: 'solid',
  })
);

export const BarListItem = ({ children }: { children: React.ReactNode }) => {
  return <Box as="li">{children}</Box>;
};
