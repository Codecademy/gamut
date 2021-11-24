import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';
import React from 'react';

import { ButtonBase } from '../../ButtonBase';
import {
  tabElementBaseProps,
  TabElementStyleProps,
  TabSelectors,
} from '../props';

export interface TabProps
  extends ReachTabProps,
    StyleProps<typeof tabVariants>,
    TabElementStyleProps {}

const tabVariants = variant({
  base: {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    background: 'none',
    borderColor: 'transparent',
    borderBottomStyle: 'solid',
    borderBottomWidth: 4,
    fontWeight: 400,
    fontSize: 16,
    px: 24,
    py: 8,
    textOverflow: 'ellipsis',
    color: 'text',
    font: 'inherit',
    cursor: 'pointer',
    zIndex: 1,
    [TabSelectors.HOVER]: {
      bg: 'background-selected',
    },
    [TabSelectors.SELECTED]: {
      fontWeight: 700,
    },
    [TabSelectors.DISABLED]: {
      opacity: 0.25,
      cursor: 'default',
    },
  },
  variants: {
    underlined: {
      borderColor: 'text',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderRadius: 0,
      fontWeight: 400,
      fontSize: 16,
      px: 24,
      pt: 8,
      pb: 11 as 12, // border + padding = 12px
      [TabSelectors.SELECTED]: {
        pt: 8,
        pb: 8,
        borderBottomWidth: 4,
        borderColor: 'primary',
      },
    },
  },
});

export const TabButton = styled(ButtonBase)<TabElementStyleProps>(
  tabVariants,
  tabElementBaseProps
);

export const Tab: React.FC<TabProps> = (props) => {
  return <ReachTab as={TabButton} {...props} />;
};

Tab.defaultProps = {
  variant: 'underlined',
};
