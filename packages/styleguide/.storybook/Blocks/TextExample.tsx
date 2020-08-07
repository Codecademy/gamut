import React from 'react';
import { styled } from '@storybook/theming';
import {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
} from '@codecademy/gamut-styles';
import { fontStack } from '@codecademy/gamut-styles/src';

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

const TextRow = styled.div<{ hasProp?: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasProp }) =>
    hasProp ? 'minmax(4rem, max-content) 1fr' : '1fr'};
  grid-column-gap: 1rem;
`;

const PropCol = styled.div`
  font-size: ${fontSize.text.sm};
  color: ${colors.gray[300]};
  display: grid;
  align-content: center;
`;

export const TextExample: React.FC<
  { propName: keyof TextProps } & TextProps
> = ({ propName, children, ...rest }) => (
  <TextRow hasProp={Boolean(rest[propName])}>
    {rest[propName] && <PropCol>{rest[propName]}</PropCol>}
    <Text {...rest}>{children}</Text>
  </TextRow>
);
