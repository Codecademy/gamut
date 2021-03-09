import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export type conditionalStyleProps = {
  error?: boolean;
  activated?: boolean;
};

export const conditionalStyles = ({
  error,
  activated,
}: conditionalStyleProps) => {
  const conditionalStyle = error
    ? css`
        color: ${theme.colors.red};
        border-color: ${theme.colors.red} !important;

        &:focus {
          box-shadow: 0 0 0 1px ${theme.colors.red};
        }
      `
    : activated
    ? css`
        border-color: ${theme.colors.navy};
      `
    : null;
  return conditionalStyle;
};

export const iconBaseStyles = css`
  position: absolute;
  pointer-events: none;
  color: currentColor;
`;

export const iconStyles = css`
  ${iconBaseStyles}
  right: 16px;
  height: 16px;
  width: 16px;
  top: calc(50% - ${pxRem(8)});
`;

export const formBaseStyles = css`
  color: ${theme.colors.navy};
  font-weight: normal;
  font-size: ${theme.fontSize[16]};
`;

export const formBaseFieldStyles = css`
  ${formBaseStyles}
  width: 100%;
  outline: none;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors['gray-200']};
  border-radius: 2px;
  transition: all 0.2s ease-in-out;
  padding-right: 2.5rem;
  min-width: auto;

  &:hover {
    border-color: ${theme.colors.hyper};
  }

  &:focus {
    border-color: ${theme.colors.hyper};
    box-shadow: inset 0 0 0 1px ${theme.colors.hyper};
  }
  &::placeholder {
    color: ${theme.colors[`gray-500`]};
    font-style: italic;
  }

  &:disabled {
    opacity: 1;
    background-color: ${theme.colors[`gray-100`]};
    border-color: ${theme.colors[`gray-500`]};
    color: ${theme.colors[`gray-500`]};
    font-style: italic;
    cursor: not-allowed;
  }
`;

export const formFieldStyles = css`
  ${formBaseFieldStyles}
  padding: ${pxRem(11)} ${theme.spacing[8]};
`;
