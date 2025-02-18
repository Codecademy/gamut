import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { AppBar } from '../AppBar';
import { Box, BoxProps } from '../Box';

export const StyledAppBar = styled(AppBar)(
  css({
    boxShadow: `none`,
  })
);

export const StyledNavBar = styled.ul(
  css({
    alignItems: 'stretch',
    display: `flex`,
    padding: 0,
    listStyle: `none`,
    margin: 0,
    width: `100%`,
  })
);

export const spacing = {
  standard: 8,
  enterprise: 12,
} as const;

export const StyledListItem = styled(Box)(
  css({
    display: `flex`,
    justifyContent: `center`,
    flexDirection: `column`,
    position: `relative`,

    '&:first-of-type': {
      ml: { md: 0 },
    },
    '&:last-of-type': {
      mr: { md: 0 },
    },
  })
);

type HeaderListItemProps = {
  onBlur?: () => void;
  onFocus?: () => void;
} & BoxProps;

export const HeaderListItem: React.FC<HeaderListItemProps> = ({
  children,
  ...props
}) => (
  <StyledListItem as="li" {...props}>
    {children}
  </StyledListItem>
);
