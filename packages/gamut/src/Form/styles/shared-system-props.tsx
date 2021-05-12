import { system, theme } from '@codecademy/gamut-styles';
import { StandardPropertiesHyphen } from 'csstype';

const transitionConcatenator = (
  arrayOfProperties: Array<keyof StandardPropertiesHyphen>,
  transition: string
) => {
  const cssString = `${arrayOfProperties.join(
    ` ${transition},`
  )} ${transition}`;

  return {
    transition: cssString,
  };
};

export const formBaseStyles = {
  fontWeight: 'base',
  fontSize: 16,
  cursor: 'pointer',
} as const;

export const formBaseComponentStyles = {
  ...formBaseStyles,
  width: 1,
  outline: 'none',
  bg: 'background',
  color: `${theme.colors.text}`,
  minWidth: 'auto',
} as const;

const formFieldFocusStyles = {
  borderColor: 'primary',
  boxShadow: `inset 0 0 0 1px ${theme.colors.primary}`,
} as const;

const formFieldDisabledStyles = {
  bg: 'backgroundEmphasized',
  borderColor: 'textMuted',
  color: 'textMuted',
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

export const formBaseFieldStyles = {
  ...formBaseComponentStyles,
  ...transitionConcatenator(['border-color', 'box-shadow'], '0.2s ease-in-out'),
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

export const formFieldStyles = system.css({
  ...formBaseFieldStyles,
  ...formFieldPaddingStyles,
  '&:focus': formFieldFocusStyles,
});
