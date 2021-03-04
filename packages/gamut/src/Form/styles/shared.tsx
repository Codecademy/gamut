import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

type errorStateProps = {
  error?: boolean;
};

export const errorStyle = ({ error }: errorStateProps) => {
  const errorStyle = error
    ? css`
        color: ${theme.colors.red};
        border-color: ${theme.colors.red} !important;

        &:focus {
          box-shadow: 0 0 0 1px ${theme.colors.red};
        }
      `
    : null;
  return errorStyle;
};

export const iconStyles = css`
  position: absolute;
  right: 16px;
  height: 16px;
  width: 16px;
  pointer-events: none;
`;

export const selectIconStyles = css`
  ${iconStyles}
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
  border: 1px solid ${theme.colors[`blue-900`]};
  border-radius: 2px;
  transition: ${theme.colors[`blue-900`]} 0.15s;
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
