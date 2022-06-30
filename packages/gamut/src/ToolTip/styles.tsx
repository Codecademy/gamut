import { fontSmoothPixel, timing, variant } from '@codecademy/gamut-styles';

import { toolTipAlignmentArray } from './types';
import {
  createToolTipVariantFromAlignment,
  createVariantsFromAlignments,
} from './utils';

export const tooltipBackgroundColor = `background-contrast`;
export const tooltipArrowHeight = `1rem`;
const containerOffsetVertical = 12;

export const centerMaxWidth = { maxWidth: '8rem' } as const;
export const alignedMaxWidth = { maxWidth: '16rem' } as const;

export const topStyles = {
  bottom: 'calc(100% + 4px)',
  pb: containerOffsetVertical,
} as const;

export const topStylesAfter = {
  borderColor: 'currentColor',
  borderWidth: '0 1px 1px 0',
  bottom: '0.25rem',
} as const;

export const bottomStyles = {
  top: 'calc(100% + 4px)',
  pt: containerOffsetVertical,
} as const;

export const bottomStylesAfter = {
  borderColor: 'currentColor',
  borderWidth: '1px 0 0 1px',
  top: '0.25rem',
} as const;

export const centerStyles = {
  ...centerMaxWidth,
  left: 'calc(50% - 4rem)',
} as const;

export const centerStylesAfter = { left: 'calc(50% - 0.5rem)' } as const;

export const leftStyles = {
  ...alignedMaxWidth,
  justifyContent: 'flex-end',
  left: 'calc(50% - 14rem)',
} as const;

export const leftStylesAfter = { right: '1.5rem' } as const;

export const rightStyles = {
  ...alignedMaxWidth,
  left: 'calc(50% - 2rem)',
} as const;

export const rightStylesAfter = {
  left: '1.5rem',
} as const;

const tooltipVariantStyles = createVariantsFromAlignments(
  toolTipAlignmentArray,
  createToolTipVariantFromAlignment
);

export const toolTipAlignmentVariants = variant({
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
      bg: tooltipBackgroundColor,
      content: '""',
      display: 'block',
      height: `${tooltipArrowHeight}`,
      position: 'absolute',
      transform: 'rotate(45deg)',
      width: `${tooltipArrowHeight}`,
      borderStyle: 'solid',
    },
  },
  variants: tooltipVariantStyles,
});

export const toolTipBodyAlignments = variant({
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

export const toolTipBodyCss = {
  bg: tooltipBackgroundColor,
  color: 'text-accent',
  border: 1,
  boxShadow: 'none',
  borderRadius: '3px',
  display: 'inline-block',
  fontSize: 14,
  lineHeight: 'base',
} as const;
