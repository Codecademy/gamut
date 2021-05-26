import { system, theme } from '@codecademy/gamut-styles';
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

export const iconPadding = ({ icon }: iconPaddingProps) => {
  if (icon) {
    return system.css({ paddingRight: '2.3rem' });
  }
};

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
        boxShadow: `inset 0 0 0 1px ${theme.colors.danger}`,
      },
    },
    activated: { borderColor: 'text' },
  },
});

/**  We greatly prefer NOT to do this but ReactRecurly has some specific needs around focus-styles + padding that force us to export them seperately. If we ever stop using React-Recurly, this code will be 🔪.
 *tldr: Do not do this unless you have already talked to Web-Plat and have failed to find any alternate (and better) solutions. */

export const iFrameWrapperBaseStyles = system.css({
  ...formBaseFieldStyles,
});

export const reactRecurlyFormFieldFocusStyles = system.css({
  ...formFieldFocusStyles,
});

export const reactRecurlyFormFieldPaddingStyles = system.css({
  ...formFieldPaddingStyles,
});
