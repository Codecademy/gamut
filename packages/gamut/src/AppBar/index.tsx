import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';
import { ContentContainer } from '../ContentContainer';

export type AppBarProps = {
  wide?: boolean;
};

const AppBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const AppBarLayout: React.FC<AppBarProps> = ({ wide, children }) => {
  return (
    <ContentContainer size={wide ? 'wide' : 'medium'}>
      <Box alignItems="center" height="100%">
        {children}
      </Box>
    </ContentContainer>
  );
};

export const AppBar = AppBarContainer.withComponent(AppBarLayout);

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
