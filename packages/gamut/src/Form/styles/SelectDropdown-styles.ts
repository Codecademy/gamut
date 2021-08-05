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
  const borderTopColor = error
    ? theme.colors['feedback-error']
    : theme.colors.primary;

  return system.css({
    ...formBaseComponentStyles,
    border: 1,
    borderColor: 'currentColor',
    position: 'absolute',
    marginTop: '-2px',
    zIndex: 2,
    borderTopColor,
  });
};
