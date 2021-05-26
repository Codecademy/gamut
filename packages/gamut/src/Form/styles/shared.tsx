import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import { StandardPropertiesHyphen } from 'csstype';

import { conditionalStyleProps } from './shared-system-props';

export const colorStates = {
  base: {
    color: theme.colors.navy,
    placeholder: theme.colors['gray-900'],
    backgroundColor: theme.colors.white,
    borderColor: theme.colors['gray-600'],
  },
  hover: { borderColor: theme.colors.hyper },
  disabled: {
    color: theme.colors['gray-900'],
    backgroundColor: theme.colors['gray-100'],
    borderColor: theme.colors['gray-900'],
  },
  error: { color: theme.colors.red, borderColor: theme.colors.red },
  valid: { color: theme.colors.green },
  activated: { borderColor: theme.colors.navy },
  dropdown: {
    focused: { backgroundColor: theme.colors['gray-100'] },
    selected: { backgroundColor: theme.colors['gray-300'] },
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

const transitionConcatenator = (
  arrayOfProperties: Array<keyof StandardPropertiesHyphen>,
  transition: string
) => {
  const cssString = `${arrayOfProperties.join(
    ` ${transition},`
  )} ${transition}`;

  return css`
    transition: ${cssString};
  `;
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
  ${formBaseComponentStyles}
  ${transitionConcatenator(['border-color', 'box-shadow'], '0.2s ease-in-out')}
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
  padding: ${pxRem(11)} ${theme.spacing[8]};
`;

export const formFieldStyles = css`
  ${formBaseFieldStyles}
  &:focus {
    ${formFieldFocusStyles}
  }
  ${formFieldPaddingStyles}
`;
