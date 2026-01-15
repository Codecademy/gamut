import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../../Box';
import { barListItemPadding } from '../shared/styles';

const rowBaseStyles = css({
  alignItems: 'center',
  bg: 'transparent',
  border: 'none',
  cursor: 'inherit',
  display: 'flex',
  flexDirection: { _: 'column', xs: 'row' },

  p: barListItemPadding,
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
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

export const RowWrapper = styled('span')(rowBaseStyles);
export const RowButton = styled('button', styledOptions<'button'>())(
  rowBaseStyles,
  interactiveStyles
);
export const RowAnchor = styled('a', styledOptions<'a'>())(
  rowBaseStyles,
  interactiveStyles
);

export const BarWrapper = styled(Box)(
  css({
    alignItems: 'center',
    borderRadius: { _: 'md' as any, xs: 'xl' },
    display: 'flex',
    flex: { _: 'none', xs: 1 },
    height: { _: 8, xs: 24 },
    overflow: 'hidden',
    position: 'relative',
    width: { _: '100%', xs: 'auto' },
    mt: { _: 8, xs: 0 },
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

export const BackgroundBar = styled(motion.create(Box))(
  css({
    ...baseBarStyles,
    borderStyle: 'solid',
    borderWidth: '1px',
  })
);

export const ForegroundBar = styled(motion.create(Box))(
  css({
    ...baseBarStyles,
    borderStyle: 'solid',
    borderWidth: '1px',
  })
);
