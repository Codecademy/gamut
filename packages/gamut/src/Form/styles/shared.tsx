import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const formBaseStyles = css`
  color: ${theme.colors.navy};
  font-weight: normal;
  font-size: ${theme.fontSize[16]};
`;

export const inputStyles = css`
  ${formBaseStyles}
  cursor: pointer;
  text-indent: 0.8rem;
  padding: 0.8rem 0;
  outline: none;
  width: 100%;
  border: 1px solid ${theme.colors[`blue-900`]};
  border-radius: 2px;
  transition: ${theme.colors[`blue-900`]} 0.15s;
  box-sizing: border-box;
  padding: ${pxRem(11)} ${theme.spacing[8]};
  text-indent: 0;

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

export const iconStyles = (props) => {
  const { color } = props;
  return css`
    position: absolute;
    right: 16px;
    top: calc(50% - 8px);
    color: ${theme.colors[color]};
    height: 16px;
    width: 16px;
  `;
};

export const errorStyle = ({ errorState }) => {
  const hulu = errorState
    ? css`
        color: ${theme.colors.red};
        border-color: ${theme.colors.red};
        &:hover {
          border-color: ${theme.colors.red};
        }

        &:focus {
          box-shadow: 0 0 0 1px ${theme.colors.red};
        }
      `
    : null;
  return hulu;
};
