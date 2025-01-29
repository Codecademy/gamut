import { css, states, theme, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors, Selectors } from '../ButtonBase/ButtonBase';


export const tagLabelFontSize = 14;
export const tagLabelPadding = 8;
export const tagBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '100%',
  width: 'fit-content',
};
export const dismissSharedStyles = {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  minWidth: '24px',
};

const textDefaultVerticalPadding =  1.5;
const textLargeVerticalPadding =  5.5;
const anchorDefaultVerticalPadding =  0.5;
const anchorLargeVerticalPadding =  4.5;
const hoverAndFocus = `${Selectors.HOVER}, ${Selectors.FOCUS}` as const;

export const outlineStyling = css({
  // This is a bit of a hack as we don't have access to focus-visible from this component. If you are not properly dismissing your tags you may see this primary colored outline after clicking X, but otherwise you should never hit this behavior.
  borderRadius: 'md',
  width: '100%',
  maxWidth: 'fit-content',
  overflow: 'hidden',
  '&:focus-within': {
    outline: `2px solid ${theme.colors.primary}`,
    outlineOffset: '2px',
  },
  '&:active': {
    outlineColor: `transparent`,
  },
})

export const outlineStates = states({
  disabled: {
    cursor: 'not-allowed',
    userSelect: 'none',
  },
  readOnly: {
    borderRadius: 'none',
  }
})

export const tagUsageVariants = variant({
  defaultVariant: 'readOnly',
  base: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    width: 'fit-content',
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

export const textSizeVariants = variant({
  defaultVariant: 'default',
  prop: 'size',
  variants: {
    default: {
      py: textDefaultVerticalPadding as any
    },
    large: {
      py: textLargeVerticalPadding as any
    },
  },
})

export const anchorSizeVariants = variant({
  defaultVariant: 'default',
  prop: 'size',
  variants: {
    default: {
      py: anchorDefaultVerticalPadding as any
    },
    large: {
      py: anchorLargeVerticalPadding as any
    },
  },
})

export const tagWrapperStates = states({
  readOnly: {
    borderRadius: 'none'
  },
  disabled: {
    // Needed for suggestion's bordercolor since the text element won't have the correct style
    borderColor: 'border-disabled',
  },
  selectionDisabled: {
    color: 'text-disabled',
    bg: 'background-disabled'
  }
});

export const tagTextStyling = css({
  fontSize: tagLabelFontSize,
  lineHeight: 1.5 as any,
  px: tagLabelPadding
});

export const anchorVariants = variant({
  prop: 'interactiveType',
  base: {
    px: tagLabelPadding,
    lineHeight: 1.5 as any,
    fontSize: 14,
    textDecoration: 'none',
    ":before": {
      display: 'none'
    },
    color: 'text',
    [ButtonSelectors.FOCUS_VISIBLE]: {
      outline: 'none',
      border: 'none',
    },
    [ButtonSelectors.FOCUS]: {
      textDecoration: 'none',
    },
    [ButtonSelectors.HOVER]: {
      bg: 'background-hover',
    },
    [ButtonSelectors.DISABLED]: {
      borderColor: 'border-disabled',
      bg: 'background-current',
    },
  },
  variants: {
    navigation: {
      [ButtonSelectors.ACTIVE]: {
        color: 'background',
        bg: 'secondary',
        textDecoration: 'none',
      },
    },
    suggestion: {
      [ButtonSelectors.ACTIVE]: {
        bg: 'primary',
        color: 'background',
        textDecoration: 'none',
      },
    },
  }
});

export const dismissButtonOverrides = {
  // These pseudo elements add an extra slightly opaque border on hover/focus
  '::before, ::after': {
    display: 'none',
  },
  // This removes a black solid outline on focus
  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 0,
  },
};

export const dismissButtonStyling = css({
  color: 'background',
  bg: 'text-secondary',
  border: 'none',
  borderRadiusRight: 'md',
  borderRadiusLeft: 'none',
  width: 12,
  [hoverAndFocus]: {
    color: 'background',
    bg: 'secondary-hover',
  },
  [ButtonSelectors.DISABLED]: {
    bg: 'background-disabled',
    color: 'text-disabled',
  },
  ...dismissSharedStyles,
  ...dismissButtonOverrides,
})

export const miniDeleteIconVariants = variant({
  defaultVariant: 'default',
  prop: 'size',
  base: {
    color: 'inherit',
  },
  variants: {
    default: {
      width: 12
    },
    large: {
      width: 16
    },
  },
})
