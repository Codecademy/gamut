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
  borderColor: 'currentColor',
  textColor: 'textMuted',
  fontStyle: 'italic',
  cursor: 'not-allowed',
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

export const radioLabel = system.css({
  display: 'flex',
  padding: '1rem 0',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  '&::before': {
    content: '""',
    display: 'block',
    width: 20,
    height: 20,
    borderRadius: '100%',
    bg: 'background',
    boxShadow: `0 0 0 1px ${theme.colors.primary}`,
    transition: '0.3s',
    mr: 8,
  },
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    transition: 'transform 0.3s ease-in-out',
    width: 20,
    height: 20,
    borderRadius: '100%',
    borderColor: 'background',
    borderStyle: 'solid',
    borderWidth: 5,
    mr: 8,
  },
});
