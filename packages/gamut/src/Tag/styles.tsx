import { states, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors, Selectors } from '../ButtonBase/ButtonBase';


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
      py: 1.5 as any
    },
    large: {
      py: 5.5 as any
    },
  },
})


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

const hoverAndDisabled = `${Selectors.HOVER}, ${Selectors.DISABLED}` as const;

export const anchorVariants = variant({
  prop: 'interactiveType',
  base: {
    // might go back to original padding stored as a variable and values used depending on variant
    px: 8,
    py: 1.5 as any,
    textDecoration: 'none',
    ":before": {
      display: 'none'
    },
    // color: 'text',
    [ButtonSelectors.FOCUS_VISIBLE]: {
      outline: 'none',
      border: 'none',
    },
    [ButtonSelectors.DISABLED]: {
      borderColor: 'border-disabled',
    },
    [ButtonSelectors.FOCUS]: {
      textDecoration: 'none',
    },
    [ButtonSelectors.HOVER]: {
      bg: 'background-hover',
    },
    [hoverAndDisabled]: {
      bg: 'background-current'
    },
  },
  variants: {
    navigation: {
      color: 'text',
      [ButtonSelectors.ACTIVE]: {
        color: 'background',
        bg: 'secondary',
        textDecoration: 'none',
      },
    },
    suggestion: {
      color: 'text',
      [ButtonSelectors.ACTIVE]: {
        bg: 'primary',
        color: 'background',
        textDecoration: 'none',
      },
    },
  }
})
