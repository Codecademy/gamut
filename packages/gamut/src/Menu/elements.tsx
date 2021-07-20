import {
  styledOptions,
  system,
  transitionConcat,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { sharedStates } from '../Box/props';
import { resetStyles, Selectors } from '../ButtonBase/ButtonBase';

type ListStyleProps = StyleProps<typeof listProps>;

type StyleStateProps = StyleProps<typeof sharedStates>;

const listProps = variance.compose(
  system.layout,
  system.typography,
  system.space,
  system.positioning,
  system.border,
  system.color
);

export interface ListProps extends ListStyleProps, StyleStateProps {
  /** How offset spacing should be */
  spacing?: 'normal' | 'condensed';
  /** Menu variants for specific use cases and styles */
  variant?: 'select' | 'navigation' | 'action';
  /** is root menu */
  root?: boolean;
  /** bordered */
  as?: 'ul' | 'ol';
}

export const List = styled('ul', styledOptions<'ul'>())<ListProps>(
  system.css({
    listStyle: 'none',
    width: 1,
    bg: 'inherit',
    display: 'inline-block',
    pl: 24,
  }),
  system.states({
    root: {
      minWidth: 192,
      bg: 'background',
      p: 0,
      border: 1,
      borderRadius: '2px',
    },
  }),
  sharedStates,
  listProps
);

List.defaultProps = {
  root: true,
  context: true,
  m: 0,
};

const interactiveVariants = system.variant({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    width: 1,
    zIndex: 1,
    px: 24,
    py: 12,
    position: 'relative',
    transition: transitionConcat(
      ['color', 'background-color', 'border-color'],
      'fast',
      'linear'
    ),
  },
  variants: {
    select: {
      [Selectors.DISABLED]: {
        pointerEvents: 'none',
      },
      [Selectors.HOVER]: {
        bg: 'background-hover',
      },
      [Selectors.FOCUS_VISIBLE]: {
        bg: 'background-hover',
      },
    },
    link: {
      [Selectors.BEFORE]: {
        bg: 'inherit',
        position: 'absolute',
        display: 'inline-block',
        left: 0,
        top: `calc(0% + 8px)`,
        minHeight: 32,
        width: 6,
      },
      [Selectors.HOVER]: {
        textColor: 'primary',
      },
    },
  },
});

const activeStates = system.states({
  selected: {
    bg: 'background-selected',
  },
  active: {
    fontWeight: 700,
  },
  'active-navlink': {
    fontWeight: 700,
    pl: 32,
    [Selectors.BEFORE]: {
      content: "''",
      bg: 'secondary',
    },
  },
});

const sizeVariants = system.variant({
  prop: 'spacing',
  variants: {
    condensed: { minHeight: 40, py: 8, fontSize: 14 },
    normal: { minHeight: 48 },
  },
});

export interface ListItemProps
  extends ListStyleProps,
    StyleStateProps,
    StyleProps<typeof interactiveVariants>,
    StyleProps<typeof activeStates>,
    StyleProps<typeof sizeVariants> {}

export const ListItem = styled('li', styledOptions<'li'>())<ListItemProps>(
  interactiveVariants,
  activeStates,
  sizeVariants,
  sharedStates,
  listProps
);

export interface ListLinkProps extends ListItemProps {
  active?: boolean;
  navlink?: boolean;
}

export const ListLink = styled('a', styledOptions<'a'>())<ListLinkProps>(
  resetStyles,
  interactiveVariants,
  activeStates,
  sizeVariants,
  sharedStates,
  listProps
);

ListLink.defaultProps = {
  zIndex: 1,
};
