import React from 'react';
import { styled } from '@storybook/theming';
import {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
} from '@codecademy/gamut-styles';
import { fontStack } from '@codecademy/gamut-styles/src';
import { ScaleColumn, ScaleRow } from './Scale';
type TextProps = {
  size?: string;
  color?: string;
  family?: string;
  weight?: string;
  line?: string;
};

export const Text = styled.p<TextProps>`
  margin: 0;
  font-size: ${({ size = fontSize.heading.lg }) => size};
  color: ${({ color = colors.black }) => color};
  font-family: ${({ family = fontStack.base }) => family};
  font-weight: ${({ weight = fontWeight.text }) => weight};
  line-height: ${({ line = lineHeight.text }) => line};
`;

export const TextExample: React.FC<
  { propName: keyof TextProps } & TextProps
> = ({ propName, children, ...rest }) => (
  <ScaleRow hasAlias={Boolean(rest[propName])}>
    {rest[propName] && <ScaleColumn>{rest[propName]}</ScaleColumn>}
    <Text {...rest}>{children}</Text>
  </ScaleRow>
);
