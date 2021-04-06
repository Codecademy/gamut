import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Text } from '@codecademy/gamut';

export const FooterHeading = styled(Text)()

FooterHeading.defaultProps = {
  as: 'h2',
  fontSize: [14, ,16],
  marginTop: [24, ,0],
  marginBottom: 16,
  textTransform: 'uppercase',
  fontWeight: 'base',
};
