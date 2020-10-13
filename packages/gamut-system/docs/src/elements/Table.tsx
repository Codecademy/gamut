import { styled } from '../system';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
`;

export const Th = styled.th`
  font-family: ${({ theme }) => theme.fontFamily.base};
  font-size: ${({ theme }) => theme.fontSize[3]}px;
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.backgroundColor.contrast};
`;

export const Td = styled.td`
  font-family: ${({ theme }) => theme.fontFamily.monospace};
  font-size: ${({ theme }) => theme.fontSize[1]}px;
  padding: ${({ theme }) => theme.space[4]}px ${({ theme }) => theme.space[0]};
`;

export const Tr = styled.tr`
  &::first-of-type {
    > * {
      padding-top: ${({ theme }) => theme.space[8]}px;
    }
  }
`;
