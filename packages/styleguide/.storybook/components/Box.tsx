import styled from '@emotion/styled';
import { swatches } from '@codecademy/gamut-styles';

type BoxProps = { size: string };

export const Box = styled.div<BoxProps>`
  background-color: ${swatches.gray[400]};
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
