import {
  styledOptions,
  system,
  transitionConcat,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';

import { sharedStates } from '../Box/props';
import { resetStyles, Selectors } from '../ButtonBase/ButtonBase';

enum MenuItemSelectors {
  OUTLINE = '&:after',
  OUTLINE_FOCUS_VISIBLE = '&:focus-visible:after',
}

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
  variant?: 'popover' | 'fixed';
  /** is root menu */
  root?: boolean;
  /** bordered */
  as?: 'ul' | 'ol';
  showBorder?: boolean;
}

const StyledList = styled('ul', styledOptions<'ul'>())<ListProps>(
  system.css({
    listStyle: 'none',
    width: 1,
    bg: 'inherit',
    display: 'inline-block',
    pl: 24,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  }),
  system.states({
    root: {
      minWidth: 192,
      bg: 'background',
      p: 0,
    },
    showBorder: {
      border: 1,
      borderRadius: 'sm',
    },
  }),
  sharedStates,
  listProps
);

export const List = forwardRef<
  HTMLUListElement,
  ComponentProps<typeof StyledList>
>(({ context = true, m = 0, root = true, variant, ...rest }, ref) => (
  <StyledList
    context={context}
    m={m}
    root={root}
    showBorder={variant !== 'fixed'}
    ref={ref}
    variant={variant}
    {...rest}
  />
));

const interactiveVariants = system.variant({
  base: {
    display: 'flex',
    alignItems: 'center',
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
    [Selectors.FOCUS_VISIBLE]: {
      outline: 'none',
    },
    [MenuItemSelectors.OUTLINE]: {
      content: "''",
      position: 'absolute',
      inset: 4,
      borderRadius: 'md',
      border: 2,
      borderColor: 'primary',
      opacity: 0,
      zIndex: -1,
    },
    [MenuItemSelectors.OUTLINE_FOCUS_VISIBLE]: {
      opacity: 1,
    },
  },
  variants: {
    select: {
      [Selectors.DISABLED]: {
        pointerEvents: 'none',
      },
      [Selectors.HOVER]: {
        bg: 'background-hover',
      },
    },
    link: {
      [Selectors.BEFORE]: {
        bg: 'inherit',
        position: 'absolute',
        display: 'inline-block',
        left: 0,
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
    bg: 'background-selected',
    [Selectors.BEFORE]: {
      content: "''",
      bg: 'secondary',
    },
  },
});

const sizeVariants = system.variant({
  prop: 'spacing',
  variants: {
    condensed: {
      lineHeight: 'title',
      minHeight: 40,
      py: 8,
      fontSize: 14,
      [Selectors.BEFORE]: {
        minHeight: 40,
      },
    },
    normal: {
      fontSize: 16,
      minHeight: 48,
      [Selectors.BEFORE]: {
        minHeight: 48,
      },
    },
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

const StyledListLink = styled('a', styledOptions<'a'>())<ListLinkProps>(
  resetStyles,
  interactiveVariants,
  activeStates,
  sizeVariants,
  sharedStates,
  listProps
);

export const ListLink = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof StyledListLink>
>(({ zIndex = 1, ...rest }, ref) => (
  <StyledListLink zIndex={zIndex} ref={ref} {...rest} />
));

export const ListButton = styled(
  'button',
  styledOptions<'button'>()
)<ListLinkProps>(
  resetStyles,
  interactiveVariants,
  activeStates,
  sizeVariants,
  sharedStates,
  listProps
);
