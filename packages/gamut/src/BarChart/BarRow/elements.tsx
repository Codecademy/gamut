import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box, FlexBox } from '../../Box';
import { barListItemPadding } from '../shared/styles';

export const TotalValueLabelsHoverTarget = styled(FlexBox)(
  css({
    alignItems: 'center',
    flexShrink: 0,
    height: 'stretch',
    justifyContent: 'flex-end',
  })
);

const rowBaseStyles = css({
  alignItems: 'center',
  bg: 'transparent',
  border: 'none',
  cursor: 'inherit',
  display: 'flex',
  flexDirection: { _: 'column', c_xs: 'row' },

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
  interactiveStyles,
  css({
    [`&:hover ${TotalValueLabelsHoverTarget}`]: {
      textDecoration: 'underline',
    },
  })
);

export const BarWrapper = styled(FlexBox)(
  css({
    alignItems: 'center',
    borderRadius: { _: 'md' as any, c_xs: 'xl' },
    flex: { _: 'none', c_xs: 1 },
    height: { _: 8, c_xs: 24 },
    overflow: 'hidden',
    position: 'relative',
    width: { _: '100%', c_xs: 'auto' },
    mt: { _: 8, c_xs: 0 },
  })
);

export const Bar = styled(motion.create(FlexBox))(
  css({
    alignItems: 'center',
    borderRadius: 'inherit',
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '100%',
    left: 0,
    position: 'absolute',
  })
);
