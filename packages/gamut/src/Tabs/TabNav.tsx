import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { tabElementBaseProps, TabElementStyleProps } from '../Tabs/props';

export interface TabNavProps
  extends StyleProps<typeof tabNavStyles>,
    TabElementStyleProps {}

const tabNavStyles = system.css({
  display: 'flex',
  position: 'relative',
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
});

export const TabNav = styled('div')<TabNavProps>(
  tabElementBaseProps,
  tabNavStyles
);
