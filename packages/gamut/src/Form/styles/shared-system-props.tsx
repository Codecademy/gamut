import { system, theme, transitionConcat } from '@codecademy/gamut-styles';

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

const formFieldDisabledStyles = {
  bg: 'backgroundEmphasized',
  borderColor: 'textMuted',
  textColor: 'textMuted',
  fontStyle: 'italic',
  cursor: 'not-allowed',
  '&:hover': {
    borderColor: 'textMuted',
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
    fontStyle: 'italic',
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
      borderColor: 'danger',
      '&:hover': {
        borderColor: 'danger',
      },
      '&:focus': {
        borderColor: 'danger',
        boxShadow: `inset 0 0 0 1px currentColor`,
      },
    },
    activated: { borderColor: 'text' },
  },
});

export type variantStyleType = 'error' | 'activated';

export const conditionalStyleState = (error: boolean, activated: boolean) => {
  return error ? 'error' : activated ? 'activated' : undefined;
};
