import { Box, BoxProps } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

export const StyledListItem = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ theme }) => theme.breakpoints.md} {
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

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
