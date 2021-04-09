import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import { StandardPropertiesHyphen } from 'csstype';

export const colorStates = {
  base: {
    color: theme.colors.navy,
    placeholder: theme.colors[`gray-700`],
    backgroundColor: theme.colors.white,
    borderColor: theme.colors['gray-400'],
  },
  hover: { borderColor: theme.colors.hyper },
  disabled: {
    color: theme.colors[`gray-700`],
    backgroundColor: theme.colors[`gray-100`],
    borderColor: theme.colors[`gray-700`],
  },
  error: { color: theme.colors.red, borderColor: theme.colors.red },
  valid: { color: theme.colors.green },
  activated: { borderColor: theme.colors.navy },
  dropdown: {
    hover: { backgroundColor: theme.colors[`gray-100`] },
    isSelected: { backgroundColor: theme.colors[`gray-300`] },
  },
};

export type conditionalStyleProps = {
  error?: boolean;
  activated?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
};

type iconPaddingProps = {
  icon?: boolean;
};

export type conditionalInputStyleProps = conditionalStyleProps &
  iconPaddingProps;

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

export const conditionalStyles = ({
  error,
  activated,
}: conditionalStyleProps) => {
  if (error) {
    return css`
      color: ${colorStates.error.color};
      border-color: ${colorStates.error.borderColor};

      &:hover {
        border-color: ${colorStates.error.borderColor};
      }

      &:focus {
        border-color: ${colorStates.error.borderColor};
        box-shadow: inset 0 0 0 1px ${colorStates.error.borderColor};
      }
    `;
  }

  if (activated) {
    return css`
      border-color: ${colorStates.activated.borderColor};
    `;
  }
};

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

export const conditionalColorStyles = (error?: boolean) => {
  if (error) {
    return css`
      color: ${colorStates.error.color};
    `;
  }

  return css`
    color: ${colorStates.base.color};
  `;
};

export const iconPadding = ({ icon }: iconPaddingProps) => {
  if (icon) {
    return css`
      padding-right: 2.3rem; ;
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
  cursor: pointer;
`;

export const formBaseComponentStyles = css`
  ${formBaseStyles}
  width: 100%;
  outline: none;
  background-color: ${colorStates.base.backgroundColor};
  min-width: auto;
`;

export const formDropdownStyles = css`
  ${formBaseComponentStyles}
  position: absolute;
  margin-top: -1px;
  border: 1px solid ${colorStates.activated.borderColor};
  border-top: none;
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
