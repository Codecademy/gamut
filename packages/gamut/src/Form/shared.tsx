import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

const formBaseStyles = css`
  font-size: ${theme.fontSize[14]};
  text-indent: 0.8rem;
  padding: 0.8rem 0;
  outline: none;
  width: 100%;
  border: 1px solid ${theme.colors[`blue-900`]};
  border-radius: 2px;
  transition: ${theme.colors[`blue-900`]} 0.15s;
  font-weight: normal;
  box-sizing: border-box;
  padding: ${pxRem(11)} ${theme.spacing[8]};
  text-indent: 0;

  &:hover {
    border-color: ${theme.colors.hyper};
  }

  &:focus {
    box-shadow: 0 0 0 1px ${theme.colors.hyper};
  }
`;

export const inputStyles = css`
  ${formBaseStyles}

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
