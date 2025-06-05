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

const beakBackgroundImageAlignments = {
  top: 'top left',
  bottom: 'bottom right',
  right: 'top right',
  left: 'bottom left',
};

const linearAlignmentLeadingString = `linear-gradient(to `;
const linearAlignmentTrailingString = ` 55%, rgba(0,0,0,0) 20%)`;

type GetBeakBackgroundType = {
  alignment: keyof typeof beakBackgroundImageAlignments;
  color: typeof tooltipBgColor | typeof popoverPrimaryBgColor;
};

export const getBeakBackground = ({
  alignment,
  color,
}: GetBeakBackgroundType) => {
  return {
    backgroundImage: `${linearAlignmentLeadingString}${beakBackgroundImageAlignments[alignment]}, ${theme.colors[color]}${linearAlignmentTrailingString}`,
  };
};

export const beakTopStylesBase = {
  borderColor,
  borderWidth: '0 1px 1px 0',
};

export const beakTopStyles = {
  ...beakTopStylesBase,
  ...getBeakBackground({ alignment: 'top', color: tooltipBgColor }),
};

export const beakBottomStylesBase = {
  borderColor,
  borderWidth: '1px 0 0 1px',
};

export const beakBottomStyles = {
  ...beakBottomStylesBase,
  ...getBeakBackground({ alignment: 'bottom', color: tooltipBgColor }),
};

export const beakRightCenterStylesBase = {
  borderColor,
  borderWidth: '0 0 1px 1px',
};

export const beakRightCenterStyles = {
  ...beakRightCenterStylesBase,
  ...getBeakBackground({ alignment: 'right', color: tooltipBgColor }),
};

export const beakLeftCenterStylesBase = {
  borderColor,
  borderWidth: '1px 1px 0 0',
};

export const beakLeftCenterStyles = {
  ...beakLeftCenterStylesBase,
  ...getBeakBackground({ alignment: 'left', color: tooltipBgColor }),
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
  bg: tooltipBgColor,
  color: 'text',
  border: 1,
  boxShadow: 'none',
  borderRadius: 'sm',
  display: 'inline-block',
  fontSize: 14,
  lineHeight: 'base',
} as const;

export const beakRightCenterStylesSml = {
  ...beakRightCenterStyles,
  left: -8,
};
export const beakRightCenterStylesLrg = {
  ...beakRightCenterStyles,
  left: -10,
};

export const beakLeftCenterStylesSml = {
  ...beakLeftCenterStyles,
  right: -7,
};
export const beakLeftCenterStylesLrg = {
  ...beakLeftCenterStyles,
  right: -10,
};
