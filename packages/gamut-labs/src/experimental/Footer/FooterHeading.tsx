import styled from '@emotion/styled';

import { Text } from '../Text';

export const FooterHeading = styled(Text)`
  font-size: 1rem;
  font-weight: normal;
  margin: 1.5rem 0 0.7rem;
  text-transform: uppercase;
`;

FooterHeading.defaultProps = {
  as: 'h2',
};
