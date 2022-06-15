import {
  Background,
  ColorModes,
  css,
  fontSmoothPixel,
  lineHeight,
  pxRem,
  states,
  theme,
  timing,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';

export type ToolTipAlignment =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

const arrowHeight = `1rem`;
const containerOffsetVertical = 12;

export const TooltipWrapper = styled.div(
  css({ position: 'relative', display: 'inline-flex' })
);

export const TargetContainer = styled.div(
  css({
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0,

    '&:focus-visible': {
      outline: `0.3rem auto ${theme.colors['primary-hover']}`,
    },
  })
);

type ToolTipBodyProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipAlignment;

  mode?: ColorModes;

  widthMode?: 'standard' | 'unlimited';
};

const centerMaxWidth = { maxWidth: '8rem' } as const;
const alignedMaxWidth = { maxWidth: '16rem' } as const;

const topStyles = {
  bottom: '100%',
  pb: containerOffsetVertical,
} as const;

const topStylesAfter = {
  borderColor: 'currentColor',
  borderBottomRightRadius: '4px',
  borderWidth: '0 1px 1px 0',
  bottom: '0.25rem',
} as const;

const bottomStyles = {
  top: '100%',
  pt: containerOffsetVertical,
} as const;

const bottomStylesAfter = {
  borderColor: 'currentColor',
  borderTopLeftRadius: '4px',
  borderWidth: '1px 0 0 1px',
  top: '0.25rem',
} as const;

const centerStyles = {
  ...centerMaxWidth,
  left: 'calc(50% - 4rem)',
} as const;

const centerStylesAfter = { left: 'calc(50% - 0.5rem)' } as const;

const leftStyles = {
  ...alignedMaxWidth,
  justifyContent: 'flex-end',
  left: 'calc(50% - 14rem)',
} as const;

const leftStylesAfter = { right: '1.5rem' } as const;

const rightStyles = {
  ...alignedMaxWidth,
  left: 'calc(50% - 2rem)',
} as const;

const rightStylesAfter = {
  left: '1.5rem',
} as const;

const toolTipAlignmentVariants = variant({
  prop: 'alignment',
  base: {
    bg: 'transparent',
    fontSmoothPixel,
    display: 'flex',
    transition: `opacity ${timing.fast}`,
    transitionDelay: `${timing.fast}`,
    position: 'absolute',
    width: '70vw',
    zIndex: 1,
    opacity: 0,
    visibility: 'hidden',
    '&::after': {
      bg: 'background-current',
      content: '""',
      display: 'block',
      height: `${arrowHeight}`,
      position: 'absolute',
      transform: 'rotate(45deg)',
      width: `${arrowHeight}`,
      borderStyle: 'solid',
    },
  },
  variants: {
    'bottom-center': {
      ...bottomStyles,
      ...centerStyles,
      '&::after': { ...bottomStylesAfter, ...centerStylesAfter },
    },
    'bottom-left': {
      ...bottomStyles,
      ...leftStyles,
      '&::after': { ...bottomStylesAfter, ...leftStylesAfter },
    },
    'bottom-right': {
      ...bottomStyles,
      ...rightStyles,
      '&::after': { ...bottomStylesAfter, ...rightStylesAfter },
    },
    'top-center': {
      ...topStyles,
      ...centerStyles,
      '&::after': { ...topStylesAfter, ...centerStylesAfter },
    },
    'top-left': {
      ...topStyles,
      ...leftStyles,
      '&::after': { ...topStylesAfter, ...leftStylesAfter },
    },
    'top-right': {
      ...topStyles,
      ...rightStyles,
      '&::after': { ...topStylesAfter, ...rightStylesAfter },
    },
  },
});

export interface ToolTipContainerProps
  extends StyleProps<typeof toolTipAlignmentVariants> {}

export const ToolTipContainer = styled(Background)<ToolTipContainerProps>`
  ${TargetContainer}:hover + &,
  ${TargetContainer}:focus-within + &,
  &:hover {
    opacity: 1;
    visibility: visible;
  }
  ${toolTipAlignmentVariants}s
`;

const toolTipBodyAlignments = variant({
  prop: 'alignment',
  variants: {
    centered: {
      m: 'auto',
      p: 8,
      textAlign: 'center',
    },
    aligned: {
      p: 16,
    },
  },
});

export const ToolTipBody = styled(Box)<
  StyleProps<typeof toolTipBodyAlignments>
>(
  css({
    bg: 'background-current',
    border: 1,
    borderRadius: '3px',
    display: 'inline-block',
    fontSize: 14,
    lineHeight: 'base',
  }),
  toolTipBodyAlignments
);
