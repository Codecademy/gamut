import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Text } from '@codecademy/gamut';

export const FooterSubHeading = styled(Text)`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 1rem 0 0;

  ${theme.breakpoints.lg} {
    margin-top: 0rem;
  }
`;
