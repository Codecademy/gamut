import {
  fontSmoothPixel,
  theme,
  timing,
  variant,
} from '@codecademy/gamut-styles';

import { tipAlignmentArray } from './types';
import {
  createToolTipVariantFromAlignment,
  createVariantsFromAlignments,
} from './utils';

export const tooltipBackgroundColor = `background-contrast`;
export const tooltipArrowHeight = `1rem`;
const containerOffsetVertical = 12;

export const narrowWidth = 64;
export const centerWidths = { minWidth: 64, maxWidth: 128 } as const;
export const alignedMaxWidth = { width: 256 } as const;
export const alignedPreviewWidth = { width: 418 } as const;

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
  ...centerWidths,
  left: 'calc(50% - 4rem)',
} as const;

export const centerStylesAfter = { left: 'calc(50% - 0.5rem)' } as const;

// This halfway fills the square we use to create the 'beak' of the tip so it does not overlap the tip text on the 'center' alignments
export const topCenterStylesAfter = {
  backgroundImage: `linear-gradient(to top left, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

export const bottomCenterStylesAfter = {
  backgroundImage: `linear-gradient(to bottom right, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

export const alignedStylesAfter = { bg: tooltipBackgroundColor };

export const leftStyles = {
  justifyContent: 'flex-end',
  right: 'calc(50% - 2rem)',
} as const;

export const leftStylesAfter = {
  right: '1.5rem',
  ...alignedStylesAfter,
} as const;

export const rightStyles = {
  left: 'calc(50% - 2rem)',
} as const;

export const rightStylesAfter = {
  left: '1.5rem',
  ...alignedStylesAfter,
} as const;

export const tooltipVariantStyles = createVariantsFromAlignments(
  tipAlignmentArray,
  createToolTipVariantFromAlignment
);

const centeredBodyStyles = { m: 'auto', p: 4, textAlign: 'center' } as const;

const alignedBodyStyles = { p: 16 } as const;

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
    opacity: 0,
    visibility: 'hidden',
    '&::after': {
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

export const inlineToolTipBodyAlignments = variant({
  prop: 'alignment',
  variants: {
    centered: {
      ...centeredBodyStyles,
      ...centerWidths,
    },
    aligned: {
      ...alignedBodyStyles,
      ...alignedMaxWidth,
    },
    previewAligned: {
      ...alignedPreviewWidth,
      bg: 'paleBlue',
    },
    avatarAligned: {
      maxWidth: 'fit-content',
    },
  },
});

export const popoverToolTipBodyAlignments = variant({
  prop: 'alignment',
  variants: {
    centered: {
      ...centeredBodyStyles,
    },
    aligned: {
      ...alignedBodyStyles,
    },
  },
});

export const toolTipWidthRestrictions = variant({
  prop: 'widthRestricted',
  variants: {
    centered: {
      ...centerWidths,
    },
    aligned: {
      ...alignedMaxWidth,
    },
    previewAligned: {
      ...alignedPreviewWidth,
      bg: 'paleBlue',
    },
    default: {
      minWidth: undefined,
      maxWidth: undefined,
    },
    popover: {
      minWidth: '4rem',
      maxWidth: '16rem',
    },
  },
});

export const toolTipBodyCss = {
  bg: tooltipBackgroundColor,
  color: 'text',
  border: 1,
  boxShadow: 'none',
  borderRadius: '3px',
  display: 'inline-block',
  fontSize: 14,
  lineHeight: 'base',
} as const;
