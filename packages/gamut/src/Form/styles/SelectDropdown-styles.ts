import { system } from '@codecademy/gamut-styles';

import {
  formBaseComponentStyles,
  formBaseFieldStylesObject,
  formFieldDisabledStyles,
  formFieldPaddingStyles,
  InputSelectors,
} from '.';

export const selectDropdownStyles = system.css({
  ...formBaseFieldStylesObject,
  ...formFieldPaddingStyles,
  display: 'flex',
  zIndex: 3,
});

export const selectFocusStyles = {
  color: 'primary',
  borderColor: 'currentColor',
  boxShadow: `inset 0 0 0 1px currentColor`,
} as const;

export const conditionalBorderStates = system.states({
  isFocused: selectFocusStyles,
  activated: { borderColor: 'currentColor' },
  error: {
    color: 'feedback-error',
    borderColor: 'currentColor',
    [InputSelectors.HOVER]: {
      borderColor: 'currentColor',
    },
  },
  isDisabled: formFieldDisabledStyles,
});

export const sizeVariants = system.variant({
  prop: 'size',
  defaultVariant: 'base',
  variants: {
    base: formFieldPaddingStyles,
    small: { height: '2rem', px: 8, py: 0 },
  },
});

export const dropdownBorderStates = system.states({
  error: { borderColorTop: 'feedback-error' },
});

export const dropdownBorderStyles = system.css({
  ...formBaseComponentStyles,
  border: 1,
  borderColor: 'currentColor',
  position: 'absolute',
  marginTop: 0,
  borderRadius: 0,
  zIndex: 2,
});

export const optionBackground = (isSelected: boolean, isFocused: boolean) => {
  const backgroundColor = isFocused
    ? 'background-hover'
    : isSelected
    ? 'background-selected'
    : 'transparent';
  return system.css({
    bg: backgroundColor,
  });
};

export const textColor = system.css({
  color: 'text',
});

export const placeholderColor = system.css({
  color: 'text-disabled',
});
