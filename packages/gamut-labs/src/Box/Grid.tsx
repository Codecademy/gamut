import { css } from '@emotion/core';
import { spacing, SpacingSize } from '@codecademy/gamut-styles';
import { Box } from './BaseBox';
import styled from '@emotion/styled';

export type GridProps = {
  direction: 'column' | 'row';
  gap?: SpacingSize;
  ratio?: string;
};

const templateRatio = ({ direction, ratio }: Partial<GridProps>) => {
  if (!ratio) {
    const rule = `grid-auto-${direction}s`;

    return `${rule}: max-content;`;
  }
  const rule = `grid-template-${direction}s`;
  return `${rule}: ${ratio.replace(/\:/g, ' ')};`;
};

export const gridStyles = ({
  direction = 'row',
  gap,
  ratio,
}: Partial<GridProps>) => css`
  display: grid;
  grid-auto-flow: ${direction};
  ${gap && `grid-gap: ${spacing[gap]};`}
  ${templateRatio({ ratio, direction })}
`;

export const Grid = styled(Box)<GridProps>`
  ${gridStyles}
`;
