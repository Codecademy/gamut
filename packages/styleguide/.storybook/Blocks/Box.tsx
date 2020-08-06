import styled from '@emotion/styled';
import { colors } from '@codecademy/gamut-styles';

type BoxProps = { size: string };

export const Box = styled.div<BoxProps>`
  background-color: ${colors.gray[400]};
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
