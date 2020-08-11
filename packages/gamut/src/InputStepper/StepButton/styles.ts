import { css } from '@emotion/core';
import { colors } from '@codecademy/gamut-styles';

export const stepperButtonIconStyles = css`
  width: 1rem;
  height: 1rem;
  margin-top: -3px;
  display: block;
`;

export const stepperButtonStyles = css`
  transform-origin: 50% 50%;
  color: ${colors.gray[700]};
  background-color: transparent;
  cursor: pointer;
  font-size: 2rem;
  margin-top: 0.3rem;
  height: 2rem;
  min-width: 2rem;
`;
