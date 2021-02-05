import { colors, pxRem } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const textButtonStyles = css`
  background-color: transparent;
  border: none;
  color: ${colors.navy};
  display: flex;
  align-items: center;
  font-weight: normal;
  line-height: 1.5;
  min-width: 0;
  width: 100%;
  padding: ${pxRem(2)} 0;
  text-align: left;
  white-space: nowrap;
`;

export const focusStyles = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 0.3rem auto ${colors.navy};
  }
`;

export const hoverStyles = css`
  &:hover {
    color: ${colors.hyper};
    text-decoration: none;
    cursor: pointer;
  }
`;
