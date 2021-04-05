import { styled } from '@storybook/theming';
import {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
} from '@codecademy/gamut-styles/src';
import { fontFamily } from '@codecademy/gamut-styles/src';
type TextProps = {
  size?: string;
  color?: string;
  family?: string;
  weight?: string;
  line?: string;
};

export const Text = styled.p<TextProps>`
  margin: 0;
  font-size: ${({ size = fontSize[34] }) => size};
  color: ${({ color = colors.black }) => color};
  font-family: ${({ family = fontFamily.base }) => family};
  font-weight: ${({ weight = fontWeight.base }) => weight};
  line-height: ${({ line = lineHeight.base }) => line};
`;
