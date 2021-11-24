import { system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';
import React from 'react';

export interface TabListProps
  extends ReachTabListProps,
    StyleProps<typeof tabListVariants>,
    StyleProps<typeof tabListProps> {}

const tabListVariants = variant({
  base: {
    display: 'flex',
    position: 'relative',
  },
  variants: {
    underlined: {
      mb: 24,
      '&:after': {
        content: '""',
        height: '1px',
        bg: 'text',
        position: 'absolute',
        bottom: 0,
        zIndex: 0,
        width: '100%',
      },
    },
  },
});

const tabListProps = variance.compose(system.layout, system.space);

const TabListBase = styled('div')<TabListProps>(tabListProps, tabListVariants);

export const TabList: React.FC<TabListProps> = (props) => {
  return <ReachTabList as={TabListBase} {...props} />;
};

TabList.defaultProps = {
  variant: 'underlined',
};
