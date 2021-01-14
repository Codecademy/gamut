import { colors } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const focusStyles = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 1px solid ${colors.navy};
  }
`;
