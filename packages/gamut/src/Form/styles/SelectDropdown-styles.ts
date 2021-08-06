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
})({ theme });

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
    return system.css({ color: 'primary' });
    // return system.css(formFieldFocusStyles);
  }

  if (activated) {
    return system.css({
      borderColor: 'currentColor',
    });
  }
};

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
