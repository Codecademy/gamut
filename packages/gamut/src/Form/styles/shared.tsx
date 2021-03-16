import { AlertIcon } from '@codecademy/gamut-icons';
import { properties, pxRem, theme } from '@codecademy/gamut-styles';
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
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
  activated: { borderColor: theme.colors.navy },
};

export type conditionalStyleProps = {
  error?: boolean;
  activated?: boolean;
};

type iconPadding = {
  icon?: boolean;
};

export type conditionalInputStyleProps = conditionalStyleProps & iconPadding;

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
export const iconPadding = ({ icon }: iconPadding) => {
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

export const styledIconCreator = (
  Icon: typeof AlertIcon,
  styles: SerializedStyles
) => {
  const StyledIcon = styled(Icon)(styles, properties.textColor);
  return StyledIcon;
};

export const iconBaseStyles = css`
  position: absolute;
  pointer-events: none;
  color: currentColor;
`;

export const iconStyles = css`
  ${iconBaseStyles}
  right: 1rem;
  height: 1rem;
  width: 1rem;
  top: calc(50% - ${pxRem(8)});
`;

export const miniIconStyles = css`
  ${iconBaseStyles}
  right: 0.75rem;
  height: 0.75rem;
  width: 0.75rem;
  top: calc(50% - ${pxRem(6)});
`;

export const customIconStyles = css`
  ${iconBaseStyles}
  right: .8rem;
  height: 1.25rem;
  width: 1.25rem;
  top: calc(50% - ${pxRem(10)});
`;

export const formBaseStyles = css`
  color: ${colorStates.base.color};
  font-weight: normal;
  font-size: ${theme.fontSize[16]};
`;

export const formBaseFieldStyles = css`
  ${formBaseStyles}
  ${transitionConcatenator(['border-color', 'box-shadow'], '0.2s ease-in-out')}
  width: 100%;
  outline: none;
  background-color: ${colorStates.base.backgroundColor};
  border: 1px solid ${colorStates.base.borderColor};
  border-radius: 2px;
  min-width: auto;

  &:hover {
    border-color: ${colorStates.hover.borderColor};
  }

  &:focus {
    border-color: ${colorStates.hover.borderColor};
    box-shadow: inset 0 0 0 1px ${colorStates.hover.borderColor};
  }
  &::placeholder {
    color: ${colorStates.base.placeholder};
    font-style: italic;
  }

  &:disabled,
  [disabled] {
    opacity: 1;
    background-color: ${colorStates.disabled.backgroundColor};
    border-color: ${colorStates.disabled.borderColor};
    color: ${colorStates.disabled.color};
    font-style: italic;
    cursor: not-allowed;
  }
`;

export const formFieldStyles = css`
  ${formBaseFieldStyles}
  padding: ${pxRem(11)} ${theme.spacing[8]};
`;
