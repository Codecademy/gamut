import {
  styledOptions,
  system,
  transitionConcat,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import isObject from 'lodash/isObject';
import { type LegacyRef, ComponentProps, forwardRef } from 'react';

import { sharedStates } from '../Box/props';
import { resetStyles, Selectors } from '../ButtonBase/ButtonBase';
import { ToolTip, ToolTipProps } from '../Tip/ToolTip';
import { MenuItem } from './MenuItem';

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
  HTMLUListElement | null,
  ComponentProps<typeof StyledList>
>(({ context = true, m = 0, root = true, variant, ...rest }, ref) => (
  <StyledList
    context={context}
    m={m}
    ref={ref as LegacyRef<HTMLUListElement>}
    root={root}
    showBorder={variant !== 'fixed'}
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
  // Is named isDisabled to avoid conflicts with the HTML `disabled` attribute
  isDisabled: {
    bg: 'inherit',
    cursor: 'not-allowed',
    fontWeight: 400,
    textColor: 'text-disabled',
    [Selectors.HOVER]: {
      textColor: 'text-disabled',
      textDecoration: 'none',
    },
    [Selectors.BEFORE]: {
      content: "''",
      bg: 'inherit',
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
  HTMLAnchorElement | null,
  ComponentProps<typeof StyledListLink>
>(({ zIndex = 1, ...rest }, ref) => (
  <StyledListLink
    ref={ref as LegacyRef<HTMLAnchorElement>}
    zIndex={zIndex}
    {...rest}
  />
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

export const MenuToolTipWrapper: React.FC<
  Pick<ComponentProps<typeof MenuItem>, 'children' | 'label'> & {
    tipId: string;
  }
> = ({ children, label, tipId }) => {
  if (!label) {
    return <>{children}</>;
  }

  const defaultTipProps = {
    placement: 'floating',
    id: tipId,
    inheritDims: true,
    shouldRenderAriaTip: false,
  };

  const wrapperProps =
    label && isObject(label)
      ? {
          ...defaultTipProps,
          ...label,
        }
      : {
          info: label,
          ...defaultTipProps,
        };

  return <ToolTip {...(wrapperProps as ToolTipProps)}>{children}</ToolTip>;
};
