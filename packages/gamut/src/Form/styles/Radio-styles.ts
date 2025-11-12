import {
  css,
  theme,
  timing,
  transitionConcat,
  variant,
} from '@codecademy/gamut-styles';

import {
  formBaseComponentStyles,
  formFieldBaseDisabledStyles,
  InputSelectors,
} from '.';

export const radioWrapper = css({
  margin: '0.25rem 0',
  width: '100%',
  fontWeight: 'normal',
  display: 'flex',
});

const consistentLabelStyles = {
  content: '""',
  display: 'block',
  width: 20,
  height: 20,
  minWidth: 20,
  borderRadius: 'full',
  mr: 8,
} as const;

export const radioLabel = css({
  ...formBaseComponentStyles,
  bg: 'transparent',
  display: 'flex',
  py: 16,
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  [InputSelectors.BEFORE_AND_AFTER]: consistentLabelStyles,
  [InputSelectors.BEFORE]: {
    bg: 'background',
    boxShadow: `0 0 0 1px ${theme.colors[`border-primary`]}`,
    transition: timing.medium,
  },
  [InputSelectors.AFTER]: {
    position: 'absolute',
    transition: transitionConcat(['transform'], 'medium', 'ease-in-out'),
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'background',
    transform: 'scale(0)',
  },
  width: 'max-content',
});

export const radioInput = css({
  [InputSelectors.CHECKED_AFTER]: {
    bg: 'primary',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: 'background',
    transform: 'scale(1)',
  },
  [InputSelectors.CHECKED_BEFORE]: {
    boxShadow: `0 0 0 1px ${theme.colors.primary}`,
  },
  [InputSelectors.HOVER_FOCUS_BEFORE]: {
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
  },
});

export const conditionalRadioLabelStyles = variant({
  base: {
    [InputSelectors.BEFORE]: {
      boxShadow: `0 0 0 1px currentColor`,
    },
  },
  variants: {
    error: {
      [InputSelectors.BEFORE_AND_AFTER]: {
        color: 'feedback-error',
      },
    },
    disabled: {
      ...formFieldBaseDisabledStyles,
    },
  },
});

export const conditionalRadioInputStyles = variant({
  base: {
    [InputSelectors.CHECKED_AFTER]: {
      bg: 'currentColor',
    },
    [InputSelectors.CHECKED_BEFORE]: {
      boxShadow: `0 0 0 1px currentColor`,
    },
  },
  variants: {
    error: {
      [InputSelectors.HOVER_FOCUS_BEFORE]: {
        boxShadow: `0 0 0 2px currentColor`,
      },
    },
    disabled: {
      ...formFieldBaseDisabledStyles,
      [InputSelectors.HOVER_FOCUS_BEFORE]: {
        boxShadow: `0 0 0 1px currentColor`,
      },
    },
  },
});
