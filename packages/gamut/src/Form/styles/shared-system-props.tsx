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
  textColor: 'textMuted',
  borderColor: 'currentColor',
  fontStyle: 'italic',
  cursor: 'not-allowed',
} as const;

const formFieldDisabledStyles = {
  formFieldBaseDisabledStyles,
  bg: 'backgroundEmphasized',
  '&:hover': {
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
  borderColor: 'secondaryDull',
  borderRadius: '2px',
  '&:hover': {
    borderColor: 'primary',
  },
  '&:placeholder': {
    borderColor: 'textMuted',
    fontStyle: 'italic',
  },
  '&:disabled': {
    ...formFieldDisabledStyles,
  },
} as const;

export const formBaseFieldStyles = system.css(formBaseFieldStylesObject);

export const formFieldStyles = system.css({
  ...formBaseFieldStylesObject,
  ...formFieldPaddingStyles,
  '&:focus': formFieldFocusStyles,
});

export const conditionalStyles = system.variant({
  variants: {
    error: {
      textColor: 'danger',
      borderColor: 'currentColor',
      '&:hover': {
        borderColor: 'currentColor',
      },
      '&:focus': {
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
  borderRadius: '100%',
  mr: 8,
} as const;

export const radioLabel = system.css({
  display: 'flex',
  py:  16,
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  '&::before, &::after': consistentLabelStyles,
  '&::before': {
    bg: 'background',
    boxShadow: `0 0 0 1px ${theme.colors.primary}`,
    transition: timing.slow,
  },
  '&::after': {
    position: 'absolute',
    transition: `transform ${timing.slow} ease-in-out`,
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'background',
    transform: 'scale(0)',
  },
});

export const radioInput = system.css({
  '&:checked + label::after': {
    bg: 'primary',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: 'background',
    transform: 'scale(1)',
  },
  '&:checked + label::before': {
    boxShadow: `0 0 0 1px ${theme.colors.primary}`,
  },
  '&:hover + label::before': {
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
  },
  '&:focus + label::before': {
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
  },
});

export const conditionalRadioLabelStyles = system.variant({
  variants: {
    error: {
      textColor: 'danger',
      '&::before': {
        boxShadow: `0 0 0 1px currentColor`,
      },
    },
    disabled: {
      ...formFieldBaseDisabledStyles,
      '&::before': {
        boxShadow: `0 0 0 1px currentColor`,
      },
    },
  },
});

export const conditionalRadioInputStyles = system.variant({
  base: {
      '&:checked + label::before': {
        boxShadow: `0 0 0 1px currentColor`,
      },
      '&:hover + label::before,
       &:focus + label::before': {
        boxShadow: `0 0 0 2px currentColor`,
      },
      '': {
        boxShadow: `0 0 0 2px currentColor`,
      },
   },
  variants: {
    error: {
      '&:checked + label::after': {
        bg: 'danger',
      },
    },
    disabled: {
      ...formFieldBaseDisabledStyles,
      '&:checked + label::after': {
        bg: 'currentColor',
      },
    },
  },
});
