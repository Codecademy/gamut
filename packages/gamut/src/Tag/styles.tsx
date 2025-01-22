import { states, theme, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors } from '../ButtonBase/ButtonBase';


export const tagLabelFontSize = 14;

export const tagBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '100%',
  width: 'fit-content',
};

// KENNY: rename to usageVariants?
export const colorVariants = variant({
  defaultVariant: 'readOnly',
  base: {
    ...tagBaseStyles,
    borderRadius: 'md',
  },
  variants: {
    readOnly: {
      bg: 'text-secondary',
      color: 'background',
      borderRadius: 'none',
    },
    selection: {
      bg: 'text-secondary',
      color: 'background',
      borderRadiusRight: 'none',
    },
    navigation: {
      border: 1,
      borderColor: 'border-secondary',
      bg: 'background-current',
      [ButtonSelectors.ACTIVE]: {
        // Not sure why, but the TagAnchor variant won't accept bg to change the active color
        bg: 'secondary',
      },
    },
    suggestion: {
      color: 'text',
      border: 1,
      borderColor: 'primary',
      bg: 'background-current',
    }
  },
});

export const sizeVariants = variant({
  defaultVariant: 'default',
  prop: 'size',
  variants: {
    default: {
      minHeight: 24,
    },
    large: {
      minHeight: 32,
      py: 4,
    },
  },
})

// KENNY: might have to be interactiveTagWrapperStates
// seems to mess up suggestions as it is currently
export const tagWrapperStates = states({
  readOnly: {
    borderRadius: 'none'
  },
  disabled: {
    // KENNY: need this for suggestion's bordercolor
    borderColor: 'border-disabled',
  },
  selectionDisabled: {
    color: 'text-disabled',
    bg: 'background-disabled'
  }
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
