import { Box, BoxProps } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

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

type AppHeaderListItemProps = {
  onBlur?: () => void;
  onFocus?: () => void;
} & BoxProps;

export const AppHeaderListItem: React.FC<AppHeaderListItemProps> = ({
  children,
  ...props
}) => (
  <StyledListItem as="li" role="none" {...props}>
    {children}
  </StyledListItem>
);
