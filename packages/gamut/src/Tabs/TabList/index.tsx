import { system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
} from '@reach/tabs';

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

export const TabList = styled(ReachTabList)<TabListProps>(
  tabListProps,
  tabListVariants
);

TabList.defaultProps = {
  variant: 'underlined',
};
