import { Box, TextButton } from '@codecademy/gamut';
import { css, states, useCurrentMode } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { TabProps } from './types';

type TabButtonProps = Pick<TabProps, 'isActiveTab'> & {
  isLightActiveTab: boolean;
};

const TabButton = styled(TextButton)<TabButtonProps>(
  css({
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderColor: 'transparent',
    borderBottomStyle: 'solid',
    borderBottomWidth: '0.1875rem',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    fontWeight: 400,
    fontSize: 18,
    textOverflow: 'ellipsis',
    color: 'text',
  }),
  states({
    isActiveTab: {
      borderColor: 'primary',
      fontWeight: 700,
      color: 'primary',
    },
    isLightActiveTab: {
      borderColor: 'navy',
      color: 'navy',
    },
  })
);

export const Tab: React.FC<TabProps> = ({ title, isActiveTab, onClick }) => {
  const colorMode = useCurrentMode();
  return (
    <Box
      borderBottom={1}
      borderColor={
        isActiveTab && colorMode === 'light'
          ? 'navy-800'
          : isActiveTab
          ? 'primary'
          : 'text-disabled'
      }
    >
      <TabButton
        variant={isActiveTab ? 'primary' : 'secondary'}
        onClick={onClick}
        role="tab"
        aria-selected={isActiveTab}
        width={160}
        isActiveTab={isActiveTab}
        pt={8}
        overflow="hidden"
        display="block"
        isLightActiveTab={colorMode === 'light' && isActiveTab}
      >
        {title}
      </TabButton>
    </Box>
  );
};
