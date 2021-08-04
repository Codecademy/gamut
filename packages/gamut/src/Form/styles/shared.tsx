import { theme, transitionConcat } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

import { conditionalStyleProps } from './shared-system-props';

export const colorStates = {
  base: {
    color: theme.colors.text,
    placeholder: theme.colors['text-disabled'],
    backgroundColor: theme.colors.background,
    borderColor: theme.colors['text-disabled'],
  },
  hover: { borderColor: theme.colors.primary },
  disabled: {
    color: theme.colors['text-disabled'],
    backgroundColor: theme.colors['background-disabled'],
    borderColor: 'currentColor',
  },
  error: {
    borderColor: theme.colors['feedback-error'],
  },
  activated: { borderColor: 'currentColor' },
  dropdown: {
    focused: { backgroundColor: theme.colors['background-hover'] },
    selected: { backgroundColor: theme.colors['background-selected'] },
  },
};

// these are split for now because ReactRecurly demands separate styles for focus.
export const formFieldFocusStyles = css`
  border-color: ${colorStates.hover.borderColor};
  box-shadow: inset 0 0 0 1px ${colorStates.hover.borderColor};
`;

const formFieldDisabledStyles = css`
  background-color: ${colorStates.disabled.backgroundColor};
  border-color: ${colorStates.disabled.borderColor};
  color: ${colorStates.disabled.color};
  font-style: italic;
  cursor: not-allowed;
  &:hover {
    border-color: ${colorStates.disabled.borderColor};
  }
`;

export const conditionalBorderStyles = ({
  error,
  activated,
  isFocused,
  isDisabled,
}: conditionalStyleProps) => {
  if (isDisabled) {
    return formFieldDisabledStyles;
  }

  if (error && isFocused) {
    return css`
      border-color: ${colorStates.error.borderColor};
      box-shadow: inset 0 0 0 1px ${colorStates.error.borderColor};

      &:hover {
        border-color: ${colorStates.error.borderColor};
      }
    `;
  }

  if (error) {
    return css`
      border-color: ${colorStates.error.borderColor};

      &:hover {
        border-color: ${colorStates.error.borderColor};
      }
    `;
  }

  if (isFocused) {
    return css`
      border-color: ${colorStates.hover.borderColor};
      box-shadow: inset 0 0 0 1px ${colorStates.hover.borderColor};
    `;
  }

  if (activated) {
    return css`
      border-color: ${colorStates.activated.borderColor};
    `;
  }
};

export const formBaseStyles = css`
  color: ${colorStates.base.color};
  font-weight: normal;
  font-size: ${theme.fontSize[16]};
`;

export const formBaseComponentStyles = css`
  ${formBaseStyles}
  width: 100%;
  outline: none;
  background-color: ${colorStates.base.backgroundColor};
  min-width: auto;
`;

export const formDropdownStyles = (error: boolean) => css`
  ${formBaseComponentStyles}
  position: absolute;
  margin-top: -2px;
  border: 1px solid ${colorStates.activated.borderColor};
  border-top: 1px solid
    ${error ? colorStates.error.borderColor : colorStates.hover.borderColor};
  z-index: 2;
`;

export const formBaseFieldStyles = css`
  ${formBaseComponentStyles};
  ${transitionConcat(['border-color', 'box-shadow'], 'fast')};
  border: 1px solid ${colorStates.base.borderColor};
  border-radius: 2px;

  &:hover {
    border-color: ${colorStates.hover.borderColor};
  }

  &::placeholder {
    color: ${colorStates.base.placeholder};
    font-style: italic;
  }

  &:disabled,
  [disabled] {
    ${formFieldDisabledStyles};
    opacity: 1;
  }
`;

// ReactRecurly needs to apply padding in a very particular way
export const formFieldPaddingStyles = css`
  padding: ${theme.spacing[12]} ${theme.spacing[8]};
`;

export const formFieldStyles = css`
  ${formBaseFieldStyles}
  &:focus {
    ${formFieldFocusStyles}
  }
  ${formFieldPaddingStyles}
`;
