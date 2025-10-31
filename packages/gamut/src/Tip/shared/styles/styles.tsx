import { fontSmoothPixel, theme, variant } from '@codecademy/gamut-styles';

import { popoverPrimaryBgColor } from '../../../Popover/styles/base';
import { tipAlignmentArray } from '../types';
import { createToolTipVariantFromAlignment } from './composeVariantsUtils';
import { createVariantsFromAlignments } from './createVariantsUtils';

/**
 * For the Popover + Tooltip style files:
 *
 * 'above' + 'below' map to position, 'top' + 'bottom' map to beak alignment
 *  variants for both follow this formula: `position`-`beakPosition`
 *  Popovers additionally will have `-sml` added to the end of this string if they are the `secondary` variant
 *
 */

export const tooltipBgColor = `background-contrast`;
export const tooltipArrowHeight = `1rem`;
export const tooltipArrowHeightPx = 16;
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

/*  This halfway fills the square we use to create the 'beak' of the tip so it does not overlap the tip text on the 'center' alignments
We split the backgroundImage out because we share these styles with Popover * */

const beakBackgroundRotation = {
  above: 'rotate(45deg)',
  below: 'rotate(-135deg)',
  right: 'rotate(135deg)',
  left: 'rotate(-45deg)',
};

type GetBeakBackgroundType = {
  alignment: keyof typeof beakBackgroundRotation;
  color: typeof tooltipBgColor | typeof popoverPrimaryBgColor;
};

export const getBeakBgAndRotation = ({
  alignment,
  color,
}: GetBeakBackgroundType) => {
  return {
    transform: beakBackgroundRotation[alignment],
    backgroundImage: `linear-gradient(to top left, ${theme.colors[color]} 55%, rgba(0,0,0,0) 20%)`,
  };
};

export const beakStylesBase = {
  borderColor,
  borderWidth: '0 1px 1px 0',
};

export const beakTopStyles = {
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'above', color: tooltipBgColor }),
};

export const beakBottomStyles = {
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'below', color: tooltipBgColor }),
};

export const beakRightCenterStyles = {
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'right', color: tooltipBgColor }),
};

export const beakLeftCenterStyles = {
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'left', color: tooltipBgColor }),
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
  ...beakTopStyles,
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
  ...beakBottomStyles,
  top: '0.25rem',
} as const;

export const rightAlignStyles = {
  pl: containerOffsetVertical,
  left: '100%',
} as const;

export const horizontalCenterStyles = {
  ...horizontalCenterWidths,
  ...centerHorizontal,
  /*
   * This may seem odd, but since this width includes the beak
   * we need to add the beak width to the max width to get the correct max width
   */
  maxWidth: horizontalCenterWidths.maxWidth + tooltipArrowHeightPx,
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
  ...beakRightCenterStyles,
} as const;

export const leftAlignStylesAfter = {
  right: '4px',
  ...beakLeftCenterStyles,
} as const;

export const tooltipVariantStyles = createVariantsFromAlignments(
  tipAlignmentArray,
  createToolTipVariantFromAlignment
);

export const tooltipCenteredPadding = 4;

const centeredBodyStyles = {
  p: tooltipCenteredPadding,
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
  bg: tooltipBgColor,
  color: 'text',
  border: 1,
  boxShadow: 'none',
  borderRadius: 'sm',
  display: 'inline-block',
  fontSize: 14,
  lineHeight: 'base',
} as const;
