import { states, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors } from '../ButtonBase/ButtonBase';

export const tagLabelPadding = 8;
export const tagLabelFontSize = 14;
export const tagBorderRadius = '4px';

export const tagBaseStyles = {
  alignItems: 'center',
  borderRadius: `${tagBorderRadius} 0 0 ${tagBorderRadius}`,
  display: 'flex',
  height: '24px',
  justifyContent: 'center',
  maxWidth: '100%',
  // width: 'fit-content',
};

export const colorVariants = variant({
  defaultVariant: 'default',
  base: {
    ...tagBaseStyles,
    color: 'background',
  },
  variants: {
    default: {
      bg: 'secondary',
    },
    grey: {
      bg: 'text-secondary',
    },
  },
});

export const tagWrapperStates = states({
  readOnly: {
    borderRadius: tagBorderRadius,
  },
});

export const dismissSharedStyles = {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  minWidth: '24px',
};

export const iconButtonOverrides = {
  // These pseudo elements add an extra slightly opaque border on hover/focus
  '::before, ::after': {
    display: 'none',
  },
  // This removes a black solid outline on focus
  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 0,
  },
};
