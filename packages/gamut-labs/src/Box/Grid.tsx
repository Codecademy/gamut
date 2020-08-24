import { css } from '@emotion/core';
import { spacing, SpacingSize } from '@codecademy/gamut-styles';
import { Box } from './BaseBox';
import styled from '@emotion/styled';

export type Alignments = 'center' | 'start' | 'end' | 'stretch';

export type GridProps = {
  direction: 'column' | 'row';
  gap?: SpacingSize;
  align?: Alignments;
  justify?: Alignments;
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
  justify,
  align,
  ratio,
}: Partial<GridProps>) => css`
  display: grid;
  grid-auto-flow: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  grid-gap: ${gap && spacing[gap]};
  ${templateRatio({ ratio, direction })};
`;

export const Grid = styled(Box)<GridProps>`
  ${gridStyles}
`;
