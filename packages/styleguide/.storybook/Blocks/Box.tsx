import { styled } from '@codecademy/gamut-styles/src';

type BoxProps = { size: string };

export const Box = styled.div<BoxProps>`
  background-color: ${({ theme }) => theme.colors.standard.blue};
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
