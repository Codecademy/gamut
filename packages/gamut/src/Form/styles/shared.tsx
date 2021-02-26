import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

type errorStateProps = {
  errorState: boolean;
};

export const errorStyle = ({ errorState }: errorStateProps) => {
  const errorStyle = errorState
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

const iconStyles = css`
  position: absolute;
  right: 16px;
  height: 16px;
  width: 16px;
`;

export const inputIconStyles = css`
  ${iconStyles}
  top: calc(50% - (${pxRem(8)} + ${theme.spacing[4]}));
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
  cursor: pointer;
  margin-bottom: ${theme.spacing[8]};
  width: 100%;
  padding: ${pxRem(11)} ${theme.spacing[8]};
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
  }
`;

export const inputStyles = css`
  ${formBaseFieldStyles}
  caret-color: ${theme.colors[`hyper-400`]};
  box-sizing: border-box;
  text-indent: 0;
`;
