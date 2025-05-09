import {
  fontSmoothPixel,
  states,
  theme,
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
const borderColor = 'border-primary';

export const narrowWidth = 64;
export const verticalCenterWidths = { minWidth: 64, maxWidth: 128 } as const;
export const horizontalCenterWidths = { minWidth: 4, maxWidth: 128 } as const;

const alignedAvatarWidth = {
  maxWidth: { _: '95vw', xs: '600px' },
  width: 'max-content',
} as const;
const alignedMaxWidth = { width: 256 } as const;
const alignedPreviewWidth = { width: 418 } as const;

const previewTipPadding = { p: 16 } as const;

export const topStyles = {
  bottom: 'calc(100% + 4px)',
  pb: containerOffsetVertical,
} as const;

const beforeStylesVert = {
  content: '""',
  position: 'absolute',
  width: '100%',
};

const beforeStylesHorizontal = {
  content: '""',
  position: 'absolute',
  height: '100%',
};

export const topStylesBefore = {
  ...beforeStylesVert,
  height: 16,
  bottom: '-4px',
};

export const topStylesAfter = {
  borderColor,
  borderWidth: '0 1px 1px 0',
  bottom: '0.25rem',
} as const;

export const bottomStyles = {
  top: 'calc(100% + 4px)',
  pt: containerOffsetVertical,
} as const;

export const bottomStylesBefore = {
  ...beforeStylesVert,
  height: 24,
  top: '-8px',
};

export const bottomStylesAfter = {
  borderColor,
  borderWidth: '1px 0 0 1px',
  top: '0.25rem',
} as const;

export const rightAlignStyles = {
  top: 'calc(100% + 4px)',
  pt: containerOffsetVertical,
} as const;

export const rightAlignStylesBefore = {
  ...beforeStylesHorizontal,
  height: 24,
  left: '-8px',
  bg: 'red',
};

export const rightAlignStylesAfter = {
  borderColor,
  borderWidth: '1px 0 0 1px',
  top: '0.25rem',
} as const;

export const horizontalCenterStyles = {
  ...horizontalCenterWidths,
  top: 'calc(50% - 28px)',
} as const;

export const horizontalLeftStyles = {
  right: '100%',
} as const;

export const horizontalRightStyles = {
  left: '100%',
} as const;

export const verticalCenterStyles = {
  ...verticalCenterWidths,
  left: 'calc(50% - 4rem)',
} as const;

export const verticalCenterStylesAfter = {
  left: 'calc(50% - 0.5rem)',
} as const;

export const horizontalCenterStylesAfter = {
  left: 'calc(50% - 0.5rem)',
} as const;

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

const centeredBodyStyles = {
  p: 4,
  textAlign: 'center',
  minWidth: 'inherit',
  maxWidth: 'inherit',
} as const;

const alignedBodyStyles = { p: 16 } as const;

export const toolTipAlignmentVariants = variant({
  prop: 'alignment',
  base: {
    bg: 'transparent',
    display: 'flex',
    fontSmoothPixel,
    maxWidth: '70vw',
    opacity: 1,
    position: 'absolute',
    visibility: 'visible',

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

export const inlineToolTipState = states({
  isToolTip: { width: '70vw' },
});

export const inlineToolTipBodyAlignments = variant({
  prop: 'alignment',
  variants: {
    horizontalCenter: {
      my: 'auto',
      ...centeredBodyStyles,
    },
    vertCenter: {
      mx: 'auto',
      ...centeredBodyStyles,
    },
    aligned: {
      ...alignedBodyStyles,
      ...alignedMaxWidth,
    },
    previewAligned: {
      ...alignedPreviewWidth,
      ...previewTipPadding,
    },
    avatarAligned: {
      ...alignedAvatarWidth,
      ...previewTipPadding,
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
  prop: 'dims',
  variants: {
    horizontalCenter: {
      ...horizontalCenterWidths,
    },
    vertCenter: {
      ...verticalCenterWidths,
    },
    centered: {
      ...verticalCenterWidths,
    },
    aligned: {
      ...alignedMaxWidth,
    },
    avatarAligned: {
      ...alignedAvatarWidth,
    },
    previewAligned: {
      ...alignedPreviewWidth,
    },
  },
});

export const toolTipBodyCss = {
  bg: tooltipBackgroundColor,
  color: 'text',
  border: 1,
  boxShadow: 'none',
  borderRadius: 'sm',
  display: 'inline-block',
  fontSize: 14,
  lineHeight: 'base',
} as const;
