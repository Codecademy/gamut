import { fontSmoothPixel, theme, variant } from '@codecademy/gamut-styles';

import { createVariantsFromAlignments } from './createVariantsUtils';
import { createToolTipVariantFromAlignment } from './composeVariantsUtils';
import { tipAlignmentArray } from '../types';

export const tooltipBackgroundColor = `background-contrast`;
export const tooltipArrowHeight = `1rem`;
const containerOffsetVertical = 12;
const borderColor = 'border-primary';

export const narrowWidth = 64;
export const verticalCenterWidths = { minWidth: 64, maxWidth: 128 } as const;
export const horizontalCenterWidths = {
  height: 'fit-content',
  minWidth: 4,
  maxWidth: 128,
} as const;

export const centerHorizontal = { top: '0', bottom: '0', my: 'auto' } as const;

const alignedAvatarWidth = {
  maxWidth: { _: '95vw', xs: '600px' },
  width: 'max-content',
} as const;
const alignedMaxWidth = { width: 256 } as const;
const alignedPreviewWidth = { width: 418 } as const;

const previewTipPadding = { p: 16 } as const;

// This halfway fills the square we use to create the 'beak' of the tip so it does not overlap the tip text on the 'center' alignments
export const beakTopStylesAfter = {
  borderColor,
  borderWidth: '0 1px 1px 0',
  backgroundImage: `linear-gradient(to top left, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

export const beakBottomStylesAfter = {
  borderColor,
  borderWidth: '1px 0 0 1px',
  backgroundImage: `linear-gradient(to bottom right, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

export const beakRightCenterStylesAfter = {
  borderColor,
  borderWidth: '0 0 1px 1px',
  backgroundImage: `linear-gradient(to top right, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

export const beakLeftCenterStylesAfter = {
  borderColor,
  borderWidth: '1px 1px 0 0',
  backgroundImage: `linear-gradient(to bottom left, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

const beforeStylesVert = {
  content: '""',
  position: 'absolute',
  width: '100%',
};

export const topStyles = {
  bottom: 'calc(100% + 4px)',
  pb: containerOffsetVertical,
} as const;

export const topStylesAfter = {
  ...beakTopStylesAfter,
  bottom: '0.25rem',
} as const;

export const topStylesBefore = {
  ...beforeStylesVert,
  height: 16,
  bottom: '-4px',
};

export const bottomStyles = {
  top: 'calc(100% + 4px)',
  pt: containerOffsetVertical,
} as const;

export const beforeStylesHorizontal = {
  content: '""',
  position: 'absolute',
  height: '100%',
};

export const bottomStylesBefore = {
  ...beforeStylesVert,
  height: 24,
  top: '-8px',
};

export const bottomStylesAfter = {
  ...beakBottomStylesAfter,
  top: '0.25rem',
} as const;

export const rightAlignStyles = {
  pl: containerOffsetVertical,
  left: '100%',
} as const;

export const horizontalCenterStyles = {
  ...horizontalCenterWidths,
  ...centerHorizontal,
} as const;

export const leftAlignStyles = {
  pr: containerOffsetVertical,
  right: '100%',
} as const;

export const verticalCenterStyles = {
  ...verticalCenterWidths,
  left: 'calc(50% - 4rem)',
  width: '70vw',
} as const;

export const verticalCenterStylesAfter = { left: 'calc(50% - 0.5rem)' };

export const leftVertStyles = {
  justifyContent: 'flex-end',
  right: 'calc(50% - 2rem)',
} as const;

export const leftVertStylesAfter = {
  right: '1.5rem',
} as const;

export const rightVertStyles = { left: 'calc(50% - 2rem)' } as const;
export const rightVertStylesAfter = {
  left: '1.5rem',
} as const;

export const rightAlignStylesAfter = {
  left: '4px',
  ...beakRightCenterStylesAfter,
} as const;

export const leftAlignStylesAfter = {
  right: '4px',
  ...beakLeftCenterStylesAfter,
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
    opacity: 0,
    position: 'absolute',
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
    horizontalCenter: {
      ...centeredBodyStyles,
    },
    vertCenter: {
      ...centeredBodyStyles,
      mx: 'auto',
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

export const beakRightCenterStylesAfterSml = {
  ...beakRightCenterStylesAfter,
  left: -8,
};
export const beakRightCenterStylesAfterLrg = {
  ...beakRightCenterStylesAfter,
  left: -10,
};

export const beakLeftCenterStylesAfterSml = {
  ...beakLeftCenterStylesAfter,
  right: -7,
};
export const beakLeftCenterStylesAfterLrg = {
  ...beakLeftCenterStylesAfter,
  right: -10,
};
