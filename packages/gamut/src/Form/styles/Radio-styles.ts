import {
  system,
  theme,
  timing,
  transitionConcat,
} from '@codecademy/gamut-styles';

import {
  formBaseComponentStyles,
  formFieldBaseDisabledStyles,
  InputSelectors,
} from '.';

export const radioWrapper = system.css({
  margin: '0.25rem 0',
  width: '100%',
  fontWeight: 'normal',
});

const consistentLabelStyles = {
  content: '""',
  display: 'block',
  width: 20,
  height: 20,
  minWidth: 20,
  borderRadius: '100%',
  mr: 8,
} as const;

export const radioLabel = system.css({
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
    boxShadow: `0 0 0 1px ${theme.colors[`text-disabled`]}`,
    transition: timing.slow,
  },
  [InputSelectors.AFTER]: {
    position: 'absolute',
    transition: transitionConcat(['transform'], 'slow', 'ease-in-out'),
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'background',
    transform: 'scale(0)',
  },
});

export const radioInput = system.css({
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

export const conditionalRadioLabelStyles = system.variant({
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

export const conditionalRadioInputStyles = system.variant({
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
