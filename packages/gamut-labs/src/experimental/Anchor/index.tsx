import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const anchorVariants = variant({
  inline: {
    textDecoration: 'underline',
  },
  notInline: {
    textDecoration: 'none',
  },
});

export const Anchor = styled.a`
  ${anchorVariants}
`;
