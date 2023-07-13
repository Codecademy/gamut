import { Text } from '@codecademy/gamut';
import styled from '@emotion/styled';

export const FooterHeading = styled(Text)();

FooterHeading.defaultProps = {
  as: 'h2',
  variant: 'p-small',
  fontSize: { sm: 16 },
  mt: [24, , 0],
  mb: 16,
  fontWeight: 'bold',
};
