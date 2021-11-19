import { system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { Tab as ReachTab, TabProps as ReachTabProps } from '@reach/tabs';

import { TabSelectors } from '../constants';

export interface TabProps
  extends ReachTabProps,
    StyleProps<typeof tabVariants>,
    StyleProps<typeof tabProps> {}

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
    [TabSelectors.SELECTED]: {
      fontWeight: 700,
    },
    [TabSelectors.DISABLED]: {
      opacity: 0.25,
      cursor: 'default',
    },
    // Allow proper spacing for badges & icons
    // '> *': {
    //   ml: 8,
    // },
    // '> *:first-child': {
    //   ml: 0,
    // },
  },
  variants: {
    underlined: {
      borderColor: 'transparent',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderBottomStyle: 'solid',
      borderBottomWidth: 4,
      fontWeight: 400,
      fontSize: 16,
      px: 24,
      py: 8,
      [TabSelectors.SELECTED]: {
        borderColor: 'primary',
      },
    },
  },
});

const tabProps = variance.compose(
  system.layout,
  system.typography,
  system.space
);

export const Tab = styled(ReachTab)<TabProps>(tabVariants, tabProps);

Tab.defaultProps = {
  variant: 'underlined',
};
