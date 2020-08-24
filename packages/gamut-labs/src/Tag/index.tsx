import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  fontSize,
  fontWeight,
  spacing,
  colors,
} from '@codecademy/gamut-styles';

export type TagProps = {
  background: keyof typeof colors.background.light;
};

const getBackground = ({ background }: TagProps) =>
  background &&
  css`
    background-color: ${colors.background.light[background]};
  `;

export const Tag = styled.span<TagProps>`
  font-size: ${fontSize.text.sm};
  font-weight: ${fontWeight.heading};
  padding: ${spacing[4]} ${spacing[16]};
  ${getBackground}
`;
