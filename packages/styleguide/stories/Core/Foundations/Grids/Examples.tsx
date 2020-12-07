import React from 'react';
import { Column, Container, LayoutGrid } from '@codecademy/gamut/src';
import { styled } from '@storybook/theming';

export const viewports = {
  xl: {
    dimensions: '1440x900',
    maxContent: '1248',
    foldHeight: '680',
  },
  lg: {
    dimensions: '1200x900',
    maxContent: '1072',
    foldHeight: '680',
  },
  md: {
    dimensions: '1024x768',
    maxContent: '896',
    foldHeight: '680',
  },
  sm: {
    dimensions: '480x900',
    maxContent: '704',
    foldHeight: '680',
  },
  xs: {
    dimensions: '480x900',
    maxContent: '448',
    foldHeight: '440',
  },
  base: {
    dimensions: '320x480',
    maxContent: '288',
    foldHeight: '440',
  },
};

const Text = styled.p<{ bold?: boolean }>`
  margin: 0;
  color: ${({ theme }) => theme.color.defaultText};
  font-family: ${({ theme }) => theme.typography.fonts.base};
  font-size: ${({ theme }) => theme.typography.size.s2}px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
`;

export const Space = styled.div<{ size?: 8 | 16 }>`
  padding: ${({ size = 8 }) => size}px;
`;

export const ViewPort = ({
  viewport,
}: {
  viewport: keyof typeof viewports;
}) => {
  const { dimensions, maxContent, foldHeight } = viewports[viewport];
  return (
    <Container flex column>
      <Text bold>
        {viewport} {dimensions}
      </Text>
      <Text>max content width: {maxContent}</Text>
      <Text>fold height: {foldHeight}</Text>
    </Container>
  );
};

export const ViewPortGrid = () => {
  return (
    <LayoutGrid rowGap="sm">
      {Object.keys(viewports).map((key) => (
        <Column key={key} size={6}>
          <ViewPort viewport={key as keyof typeof viewports} />{' '}
        </Column>
      ))}
    </LayoutGrid>
  );
};
