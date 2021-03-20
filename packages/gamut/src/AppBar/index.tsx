import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

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
