import styled from '@emotion/styled';
import { swatches } from '@codecademy/gamut-styles';

type BoxProps = { size: string };

export const Box = styled.div<BoxProps>`
  background-color: ${swatches.gray[400]};
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export const Row = styled.div`
  display: grid;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-columns: max-content 1fr;
`;

export const Column = styled.div`
  display: grid;
  align-items: center;
  justify-content: start;
`;
