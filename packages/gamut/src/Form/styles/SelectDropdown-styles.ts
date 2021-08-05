import { system, theme } from '@codecademy/gamut-styles';

import {
  conditionalStyleProps,
  formBaseComponentStyles,
  formBaseFieldStylesObject,
  formFieldDisabledStyles,
  formFieldFocusStyles,
  formFieldPaddingStyles,
  InputSelectors,
} from '.';

export const selectDropdownStyles = system.css({
  ...formBaseFieldStylesObject,
  ...formFieldPaddingStyles,
  display: 'flex',
  zIndex: 3,
});

export const conditionalBorderStyles = ({
  error,
  activated,
  isFocused,
  isDisabled,
}: conditionalStyleProps) => {
  if (isDisabled) {
    return system.css(formFieldDisabledStyles);
  }

  if (error && isFocused) {
    return system.css({
      borderColor: 'feedback-error',
      boxShadow: `inset 0 0 0 1px ${theme.colors['feedback-error']}`,

      [InputSelectors.HOVER]: {
        borderColor: 'feedback-error',
      },
    });
  }

  if (error) {
    return system.css({
      borderColor: 'feedback-error',

      [InputSelectors.HOVER]: {
        borderColor: 'feedback-error',
      },
    });
  }

  if (isFocused) {
    return system.css(formFieldFocusStyles);
  }

  if (activated) {
    return system.css({
      borderColor: 'currentColor',
    });
  }
};

export const formDropdownStyles = (error: boolean) => {
  const borderColorTop = error ? 'feedback-error' : 'primary';

  return system.css({
    ...formBaseComponentStyles,
    border: 1,
    borderColorTop,
  });
};

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
