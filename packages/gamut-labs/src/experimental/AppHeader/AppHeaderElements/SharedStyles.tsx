import { colors } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const focusStyles = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 0.3rem auto ${colors.hyper};
  }
`;

export const hoverStyles = css`
  &:hover {
    color: ${colors.hyper};
    text-decoration: none;
  }
`;

export const hoverStyles = css`
  &:hover {
    color: ${colors.hyper};
    text-decoration: none;
    cursor: pointer;
  }
`;
