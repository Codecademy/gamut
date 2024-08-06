import { system, theme, transitionConcat } from '@codecademy/gamut-styles';

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
  FOCUS_LABEL_DIV_CHILD = '&:focus + label > div',
  DISABLED = "&:disabled, &[aria-disabled='true']",
  BEFORE = '&::before',
  AFTER = '&::after',
  BEFORE_AND_AFTER = '&::before, &::after',
  CHECKED_BEFORE = '&:checked + label::before',
  CHECKED_AFTER = '&:checked + label::after',
  HOVER_FOCUS_BEFORE = '&:hover + label::before, &:focus + label::before',
}

export const formBaseStyles = {
  fontWeight: 'base',
  fontSize: 16,
  color: 'text',
} as const;

export const formBaseComponentStyles = {
  width: 1,
  outline: 'none',
  bg: 'background',
  minWidth: 'auto',
  ...formBaseStyles,
} as const;

export const formFieldFocusStyles = {
  borderColor: 'primary',
  boxShadow: `inset 0 0 0 1px ${theme.colors.primary}`,
} as const;

export const formFieldTextDisabledStyles = {
  color: 'text-disabled',
  cursor: 'not-allowed',
} as const;

export const formFieldBaseDisabledStyles = {
  borderColor: 'currentColor',
  opacity: 1,
  ...formFieldTextDisabledStyles,
} as const;

export const formFieldDisabledStyles = {
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
  borderRadius: 'm',
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
  lineHeight: 'base',
  [InputSelectors.FOCUS]: formFieldFocusStyles,
});

export const conditionalStyles = system.variant({
  variants: {
    error: {
      borderColor: 'feedback-error',
      [InputSelectors.HOVER]: {
        borderColor: 'feedback-error',
      },
      [InputSelectors.FOCUS]: {
        borderColor: 'feedback-error',
        boxShadow: `inset 0 0 0 1px ${theme.colors['feedback-error']}`,
      },
    },
    activated: { borderColor: 'currentColor' },
  },
});

export const conditionalStyleState = (error: boolean, activated: boolean) => {
  return error ? 'error' : activated ? 'activated' : undefined;
};
