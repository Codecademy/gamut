import { colors, fontSize, spacing, swatches } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

export const listItemStyles = css`
  color: ${swatches.blue[900]};
  cursor: pointer;
  display: block;
  font-size: ${fontSize[16]};
  padding: ${spacing[16]} ${spacing[24]};

  &:hover {
    text-decoration: none;
  }

  [data-focus-visible-added] &[data-selected] {
    text-decoration: underline;
  }

  &[data-selected] {
    background: ${colors.white};
  }

  &[data-selected],
  &:hover {
    color: ${colors.hyper};
  }
`;
