import { system, theme, transitionConcat } from '@codecademy/gamut-styles';
import { StandardPropertiesHyphen } from 'csstype';

export type conditionalStyleProps = {
  error?: boolean;
  activated?: boolean;
  isFocused?: boolean | null;
  isDisabled?: boolean | null;
};

type iconPaddingProps = {
  icon?: boolean;
};

export type conditionalInputStyleProps = conditionalStyleProps &
  iconPaddingProps;

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
} as const;

export const formBaseComponentStyles = {
  ...formBaseStyles,
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
  // ...transitionConcatenator(['border-color', 'box-shadow'], '0.2s ease-in-out'),
  transition: transitionConcat(
    ['background-color', 'box-shadow'],
    '0.2s',
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

export const iconPadding = system.variant({
  prop: 'icon',
  variants: {
    extraPadding: {
      pr: 8,
    },
  },
});

export type variantStyleType = 'error' | 'activated';

export const conditionalStyleState = (error: boolean, activated: boolean) => {
  return error ? 'error' : activated ? 'activated' : undefined;
};
