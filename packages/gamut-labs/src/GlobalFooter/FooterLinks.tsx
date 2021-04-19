import { Box } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const FooterLinkItems = styled(Box)`
  list-style-type: none;
`;

FooterLinkItems.defaultProps = {
  as: 'ul',
  paddingLeft: 0,
  marginBottom: 0,
};

export const FooterLinkItem = styled.li`
  font-size: 0.875rem;
  margin: 0.5rem 0;

  ${theme.breakpoints.sm} {
    font-size: 1rem;
    margin: 0.25rem 0;
  }

  ${theme.breakpoints.md} {
    margin: 0.15rem 0;
  }
`;
