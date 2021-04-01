import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Text } from '../Text';

export const FooterHeading = styled(Text)`
  font-size: 0.875rem;
  font-weight: normal;
  margin: 1.5rem 0 1rem;
  text-transform: uppercase;

  ${theme.breakpoints.sm} {
    font-size: 1rem;
    margin-top: 0;
  }
`;

FooterHeading.defaultProps = {
  as: 'h2',
};
