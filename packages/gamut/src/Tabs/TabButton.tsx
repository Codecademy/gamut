import { states, theme, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { ButtonBase } from '../ButtonBase';
import {
  tabElementBaseProps,
  TabElementStyleProps,
  TabSelectors,
} from './props';

export interface TabButtonProps
  extends StyleProps<typeof tabVariants>,
    StyleProps<typeof tabStates>,
    TabElementStyleProps {}

const tabSelectedStyles = {
  fontWeight: 700,
  pt: 12,
  pb: 8,
  borderBottomWidth: 4,
  borderColor: 'primary',
} as const;

const tabVariants = variant({
  base: {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    borderRadius: 0,
    px: 24,
    textOverflow: 'ellipsis',
    color: 'text',
    font: 'inherit',
    cursor: 'pointer',
    zIndex: 1,
    [TabSelectors.DISABLED]: {
      opacity: 0.25,
      cursor: 'default',
    },
    [TabSelectors.FOCUS_VISIBLE]: {
      boxShadow: `inset 0 0 0 2px ${theme.colors.primary}`,
      borderRadius: '4px',
    },
  },
  variants: {
    standard: {
      background: 'none',
      borderColor: 'text',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      fontSize: 16,
      fontWeight: 400,
      pt: 12,
      pb: 11 as 12, // border + padding = 12px
      [TabSelectors.HOVER]: {
        bg: 'background-selected',
      },
      [TabSelectors.SELECTED]: {
        ...tabSelectedStyles,
        fontWeight: 'bold',
      },
    },
    block: {
      fontWeight: 'normal',
      fontSize: 14,
      py: 12,
      [TabSelectors.SELECTED]: {
        bg: 'background',
        fontWeight: 'bold',
      },
    },
  },
});

const tabStates = states({
  selected: {
    ...tabSelectedStyles,
  },
});

export const TabButton = styled(ButtonBase)<TabButtonProps>(
  tabVariants,
  tabStates,
  tabElementBaseProps
);
