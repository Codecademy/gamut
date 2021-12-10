import { states, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { ButtonBase } from '../ButtonBase';
import {
  tabElementBaseProps,
  TabElementStyleProps,
  TabSelectors,
} from './props';

export interface TabButtonProps
  extends StyleProps<typeof tabStyles>,
    StyleProps<typeof tabStates>,
    TabElementStyleProps {}

const tabSelectedStyles = {
  fontWeight: 700,
  pt: 8,
  pb: 8,
  borderBottomWidth: 4,
  borderColor: 'primary',
} as const;

const tabStyles = system.css({
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  background: 'none',
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
  textOverflow: 'ellipsis',
  color: 'text',
  font: 'inherit',
  cursor: 'pointer',
  zIndex: 1,
  [TabSelectors.HOVER]: {
    bg: 'background-selected',
  },
  [TabSelectors.DISABLED]: {
    opacity: 0.25,
    cursor: 'default',
  },
  [TabSelectors.SELECTED]: {
    ...tabSelectedStyles,
  },
});

const tabStates = states({
  selected: {
    ...tabSelectedStyles,
  },
});

export const TabButton = styled(ButtonBase)<TabButtonProps>(
  tabStyles,
  tabStates,
  tabElementBaseProps
);
