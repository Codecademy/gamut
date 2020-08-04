import { styled } from '@storybook/theming';
import {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
} from '@codecademy/gamut-styles';
import { fontStack } from '@codecademy/gamut-styles/src';

type TextExampleProps = {
  size?: string;
  color?: string;
  family?: string;
  weight?: string;
  line?: string;
};

export const TextExample = styled.p<TextExampleProps>`
  font-size: ${({ size = fontSize.heading.lg }) => size};
  color: ${({ color = colors.black }) => color};
  font-family: ${({ family = fontStack.base }) => family};
  font-weight: ${({ weight = fontWeight.base }) => weight};
  line-height: ${({ line = lineHeight.text }) => line};
`;
