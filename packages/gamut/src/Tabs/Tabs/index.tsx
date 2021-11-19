import { css, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { Tabs as ReachTabs, TabsProps as ReachTabsProps } from '@reach/tabs';

// Prevent dev-only errors due to excluding react-ui default styles
if (process.env.NODE_ENV !== 'production' && document?.documentElement) {
  document.documentElement.style.setProperty('--reach-tabs', '1');
}

export interface TabsProps
  extends Omit<ReachTabsProps, 'orientation'>,
    StyleProps<typeof tabsProps> {}

const tabsProps = variance.compose(system.layout, system.space);

export const Tabs = styled(ReachTabs)<TabsProps>(
  tabsProps,
  css({
    // Reset stacking context for Tabs contents
    position: 'relative',
    zIndex: 0,
  })
);
