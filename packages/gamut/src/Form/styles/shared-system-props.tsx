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
  bg: 'white',
  minWidth: 'auto',
} as const;

const formFieldFocusStyles = {
  borderColor: 'hyper',
  boxShadow: `inset 0 0 0 1px ${theme.colors.hyper}`,
} as const;

const formFieldDisabledStyles = {
  bg: 'gray-100',
  borderColor: 'gray-700',
  color: 'gray-700',
  fontStyle: 'italic',
  cursor: 'not-allowed',
  '&:hover': {
    borderColor: 'gray-700',
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
  borderColor: 'gray-400',
  borderRadius: '2px',
  '&:hover': {
    borderColor: 'hyper',
  },
  '&:placeholder': {
    borderColor: 'gray-700',
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
