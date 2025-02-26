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

const textDefaultVerticalPadding = 1.5;
const textLargeVerticalPadding = 5.5;
const anchorDefaultVerticalPadding = 0.5;
const anchorLargeVerticalPadding = 4.5;
const hoverAndFocus = `${Selectors.HOVER}, ${Selectors.FOCUS}` as const;

export const outlineStyling = css({
  // This is a bit of a hack as we don't have access to focus-visible from this component. If you are not properly dismissing your tags you may see this primary colored outline after clicking X, but otherwise you should never hit this behavior.
  borderRadius: 'md',
  flexDirection: 'row',
  maxWidth: 'fit-content',
  overflow: 'hidden',
  width: '100%',
  '&:focus-within': {
    outline: `2px solid ${theme.colors.primary}`,
    outlineOffset: '2px',
  },
  '&:active': {
    outlineColor: `transparent`,
  },
});

export const outlineStates = states({
  disabled: {
    cursor: 'not-allowed',
    userSelect: 'none',
  },
  readOnly: {
    borderRadius: 'none',
  },
});

export const tagUsageVariants = variant({
  defaultVariant: 'readOnly',
  base: {
    alignItems: 'center',
    borderRadius: 'md',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    width: 'fit-content',
  },
  variants: {
    readOnly: {
      bg: 'text-secondary',
      borderRadius: 'none',
      color: 'background',
    },
    selection: {
      bg: 'text-secondary',
      borderRadiusRight: 'none',
      color: 'background',
    },
    navigation: {
      bg: 'background-current',
      border: 1,
      borderColor: 'border-secondary',
      [ButtonSelectors.ACTIVE]: {
        bg: 'secondary',
      },
    },
    suggestion: {
      bg: 'background-current',
      border: 1,
      borderColor: 'primary',
      color: 'text',
    },
  },
});

export const textSizeVariants = variant({
  defaultVariant: 'default',
  prop: 'size',
  variants: {
    default: {
      pt: (textDefaultVerticalPadding + 1) as any,
      pb: (textDefaultVerticalPadding - 1) as any,
    },
    large: {
      pt: (textLargeVerticalPadding + 1) as any,
      pb: (textLargeVerticalPadding - 1) as any,
    },
  },
});

export const anchorSizeVariants = variant({
  defaultVariant: 'default',
  prop: 'size',
  variants: {
    default: {
      py: anchorDefaultVerticalPadding as any,
    },
    large: {
      py: anchorLargeVerticalPadding as any,
    },
  },
});

export const tagWrapperStates = states({
  readOnly: {
    borderRadius: 'none',
  },
  disabled: {
    // Needed for suggestion's bordercolor since the text element won't have the correct style
    borderColor: 'border-disabled',
  },
  selectionDisabled: {
    bg: 'background-disabled',
    color: 'text-disabled',
  },
});

export const tagTextStyling = css({
  fontSize: tagLabelFontSize,
  lineHeight: 1.5 as any,
  px: tagLabelPadding,
});

export const anchorVariants = variant({
  prop: 'interactiveType',
  base: {
    fontSize: 14,
    lineHeight: 1.5 as any,
    px: tagLabelPadding,
    textDecoration: 'none',
    ':before': {
      display: 'none',
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
  },
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

export const dismissButtonLargeStyling = states({
  isLarge: {
    minWidth: 32,
  },
});

export const dismissButtonStyling = css({
  bg: 'text-secondary',
  border: 'none',
  borderRadiusLeft: 'none',
  borderRadiusRight: 'md',
  color: 'background',
  width: '100%',
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
});

export const defaultMiniDeleteIconStyling = css({
  color: 'inherit',
  width: 12,
});

export const largeMiniDeleteIconStyling = css({
  color: 'inherit',
  width: 16,
});
