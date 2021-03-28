import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { Anchor } from '../Anchor';
import { Box, FlexBox } from '../Box';
import { ContentContainer } from '../ContentContainer';

export type AppBarProps = {
  wide?: boolean;
};

export const AppBar = ContentContainer.withComponent(
  ({ children, ...props }: ComponentProps<typeof ContentContainer>) => (
    <ContentContainer {...props}>
      <FlexBox alignItems="center" paddingY={12} height="100%">
        {children}
      </FlexBox>
    </ContentContainer>
  )
);

export const AppBarSection = styled(Box)(
  variant({
    prop: 'alignment',
    variants: {
      right: { justifyContent: 'flex-end' },
      left: {},
      center: { flexGrow: 2, justifyContent: 'center', textAlign: 'center' },
    },
  })
);

AppBarSection.defaultProps = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '0',
  alignment: 'left',
};

export const AppBarTab = styled(Box)`
  & + & {
    margin-left: ${({ theme }) => theme.spacing[16]};
  }
`;

export const AppBarButton = styled(Anchor)(
  variant({
    prop: 'menuVariant',
    default: 'closed',
    variants: {
      open: {
        letterSpacing: '-0.25px',
        fontWeight: 'title',
      },
      closed: {},
    },
  })
);

AppBarButton.defaultProps = {
  whiteSpace: 'nowrap',
  variant: 'interface',
  display: 'inline-flex',
  width: { base: '100%', md: 'auto' },
  paddingY: [12, , , 8],
};
