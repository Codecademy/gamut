import { compose } from '@codecademy/gamut-system';
import { spacing, styled, typography } from '../system';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
`;

export const Th = styled.th`
  ${typography}
  border-bottom: 2px solid ${({ theme }) => theme.backgroundColor.contrast};
`;

Th.defaultProps = {
  textAlign: 'left',
  fontSize: { base: 1, md: 3 },
};

export const Td = styled.td`
  ${compose(typography, spacing)}
`;

Td.defaultProps = {
  fontFamily: 'monospace',
  fontSize: 1,
  paddingX: 0,
  paddingY: 4,
};

export const Tr = styled.tr`
  &:first-of-type {
    > * {
      padding-top: ${({ theme }) => theme.space[8]}px;
    }
  }
`;
