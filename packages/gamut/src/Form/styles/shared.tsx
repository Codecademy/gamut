import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const errorStyle = ({ errorState }) => {
  const hulu = errorState
    ? css`
        color: ${theme.colors.red};
        border-color: ${theme.colors.red} !important;

        &:focus {
          box-shadow: 0 0 0 1px ${theme.colors.red};
        }
      `
    : null;
  return hulu;
};

export const iconStyles = (props) => {
  const { color } = props;
  return css`
    position: absolute;
    right: 16px;
    top: calc(50% - (${pxRem(8)} + ${theme.spacing[4]}));
    color: ${theme.colors[color]};
    height: 16px;
    width: 16px;
  `;
};

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
