import {
  system,
  theme,
  timing,
  transitionConcat,
} from '@codecademy/gamut-styles';

export type conditionalStyleProps = {
  error?: boolean;
  activated?: boolean;
  isFocused?: boolean | null;
  isDisabled?: boolean | null;
};

export enum InputSelectors {
  HOVER = '&:hover',
  ACTIVE = '&:active',
  PLACEHOLDER = '&:placeholder',
  FOCUS = '&:focus',
  DISABLED = "&:disabled, &[aria-disabled='true']",
  BEFORE = '&::before',
  AFTER = '&::after',
  BEFORE_AND_AFTER = '&::before, &::after',
  CHECKED_BEFORE = '&:checked + label::before',
  CHECKED_AFTER = '&:checked + label::after',
  HOVER_FOCUS_BEFORE = '&:hover + label::before, &:focus + label::before',
}

export const formBaseComponentStyles = {
  fontWeight: 'base',
  fontSize: 16,
  width: 1,
  outline: 'none',
  bg: 'background',
  textColor: 'text',
  minWidth: 'auto',
} as const;

export const formFieldFocusStyles = {
  borderColor: 'primary',
  boxShadow: `inset 0 0 0 1px ${theme.colors.primary}`,
} as const;

const formFieldBaseDisabledStyles = {
  borderColor: 'currentColor',
  textColor: 'text-disabled',
  fontStyle: 'italic',
  cursor: 'not-allowed',
} as const;

const formFieldDisabledStyles = {
  ...formFieldBaseDisabledStyles,
  bg: 'background-disabled',
  [InputSelectors.HOVER]: {
    borderColor: 'currentColor',
  },
} as const;

export const formFieldPaddingStyles = {
  py: 12,
  px: 8,
} as const;

export const formBaseFieldStylesObject = {
  ...formBaseComponentStyles,
  transition: transitionConcat(
    ['background-color', 'box-shadow'],
    'slow',
    'ease-in-out'
  ),
  border: 1,
  borderColor: 'text-disabled',
  borderRadius: '2px',
  [InputSelectors.HOVER]: {
    borderColor: 'primary',
  },
  [InputSelectors.PLACEHOLDER]: {
    borderColor: 'text-disabled',
    fontStyle: 'italic',
  },
  [InputSelectors.DISABLED]: {
    ...formFieldDisabledStyles,
  },
} as const;

export const formBaseFieldStyles = system.css(formBaseFieldStylesObject);

export const formFieldStyles = system.css({
  ...formBaseFieldStylesObject,
  ...formFieldPaddingStyles,
  [InputSelectors.FOCUS]: formFieldFocusStyles,
});

export const conditionalStyles = system.variant({
  variants: {
    error: {
      textColor: 'danger',
      borderColor: 'currentColor',
      [InputSelectors.HOVER]: {
        borderColor: 'currentColor',
      },
      [InputSelectors.FOCUS]: {
        borderColor: 'currentColor',
        boxShadow: `inset 0 0 0 1px currentColor`,
      },
    },
    activated: { borderColor: 'currentColor' },
  },
});

export const conditionalStyleState = (error: boolean, activated: boolean) => {
  return error ? 'error' : activated ? 'activated' : undefined;
};

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
      textColor: 'danger',
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
