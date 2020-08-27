import React from 'react';
import { Item } from '@codecademy/gamut/src';
import { colors } from '@codecademy/gamut-styles';
import { styled } from '@codecademy/gamut-styles/src';

type BoxProps = { size: string };

export const StyledBox = styled(Item)<BoxProps>`
  background-color: ${({ theme }) => theme.colors.standard.red};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export const Box: React.FC<BoxProps> = ({ children, size }) => (
  <StyledBox
    size={size}
    style={{
      padding: '5px',
      minHeight: '30px',
      marginBottom: '0.5rem',
      color: colors.white,
    }}
    flex
    alignSelf="stretch"
  >
    {children}
  </StyledBox>
);

export const defaultGridProps = {
  style: {
    padding: '1rem',
    backgroundColor: colors.blue[100],
  },
};
