import {
  css,
  states,
  styledOptions,
  system,
  theme,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Box } from '../Box';

const olStyles = {
  alignItems: 'center',
  content: 'counters(section, ".") "."',
  counterIncrement: 'section',
  fontFamily: 'accent',
  fontSize: 'inherit',
} as const;

const listVariants = variant({
  prop: 'variant',
  defaultVariant: 'default',
  base: {
    counterReset: 'section',
    listStyleType: 'none',
    p: 0,
    m: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    default: {
      borderRadius: 'sm',
    },
    table: {},
    card: {
      gap: 24,
    },
    block: {
      gap: 16,
    },
    plain: {},
  },
});

export interface ListProps
  extends StyleProps<typeof listVariants>,
    StyleProps<typeof spacingVariants>,
    StyleProps<typeof system.space> {}

export const ListEl = styled('ul', styledOptions<'ul'>())<ListProps>(
  listVariants,
  system.space
);

const rowStates = states({
  isOl: {
    '&::before': {
      ...olStyles,
      display: { _: 'none', c_sm: 'flex' },
      pl: 16,
    },
  },
  scrollable: {
    minWidth: 'min-content',
    width: '100%',
  },
  expanded: {
    display: 'flex',
    flexDirection: { c_sm: 'column' },
  },
  clickable: {
    cursor: 'pointer',
    '&:hover': {
      bg: 'background-hover',
    },
    '&:focus-visible, &:focus-within': {
      outline: `1px solid ${theme.colors.primary}`,
      boxShadow: `0 0 0 1px ${theme.colors.primary} inset`,
      bg: 'background-selected',
    },
  },
});

const spacingVariants = variant({
  prop: 'spacing',
  variants: {
    normal: {
      gap: { _: 8, c_sm: 40 },
    },
    condensed: {
      fontSize: 16,
      gap: { _: 8, c_sm: 32 },
    },
    compact: {
      gap: 0,
      py: 0,
    },
  },
});

const rowVariants = variant({
  prop: 'variant',
  base: {
    bg: 'background',
  },
  variants: {
    default: {
      border: 1,
      borderTop: 'none',
      '&:first-of-type': {
        borderTop: 1,
      },
    },
    table: {
      bg: 'transparent',
      '&:nth-of-type(2n)': {
        bg: 'background-selected',
      },
    },
    card: {
      border: 1,
      borderRadius: 'sm',
    },
    block: {
      border: 'none',
      borderRadius: 'sm',
    },
    plain: {},
  },
});

const rowBreakpointVariants = variant({
  prop: 'rowBreakpoint',
  defaultVariant: 'xs',
  variants: {
    xs: {
      display: { _: 'grid', c_sm: 'flex' },
      flexDirection: { _: 'column', c_sm: 'row' },
    },
    sm: {
      display: { _: 'grid', sm: 'flex' },
      flexDirection: { _: 'column', sm: 'row' },
    },
    md: {
      display: { _: 'grid', md: 'flex' },
      flexDirection: { _: 'column', md: 'row' },
    },
    grid: { display: 'grid' },
  },
});

export interface RowProps
  extends StyleProps<typeof rowVariants>,
    StyleProps<typeof rowBreakpointVariants>,
    StyleProps<typeof spacingVariants>,
    StyleProps<typeof rowStates>,
    StyleProps<typeof system.grid> {}

export const RowEl = styled('li', styledOptions<'li'>())<RowProps>(
  css({
    py: { _: 8, c_sm: 0 },
    // bg: 'inherit',
  }),
  variance.compose(system.grid),
  rowBreakpointVariants,
  rowVariants,
  spacingVariants,
  rowStates
);

const headerVariants = variant({
  prop: 'variant',
  variants: {
    default: {},
    card: {},
    block: {},
    table: {
      borderBottom: 2,
    },
    plain: {},
  },
});

export interface HeaderProps
  extends StyleProps<typeof spacingVariants>,
    StyleProps<typeof rowStates>,
    StyleProps<typeof listVariants> {}

export const HeaderRowEl = styled('tr', styledOptions)<HeaderProps>(
  css({
    display: 'flex',
    position: { _: 'initial', c_sm: 'sticky' },
    flexDirection: { _: 'column', c_sm: 'row' },
    top: 0,
    bg: 'background-current',
    zIndex: 2,
    fontFamily: 'accent',
    pb: { _: 8, c_sm: 0 },
  }),
  spacingVariants,
  rowStates,
  headerVariants
);

const columnType = variant({
  prop: 'type',
  defaultVariant: 'content',
  variants: {
    // Keeping this within variants for typing purposes, we use this behaviorally despite it not needing specific styling
    header: {},
    orderedHeader: {
      '&::before': {
        ...olStyles,
        display: { _: 'flex', c_sm: 'none' },
        pl: 8,
      },
    },

    content: {
      gridColumnEnd: 'span 2',
    },
    control: {
      minWidth: 'min-content',
      alignItems: {
        _: 'flex-start',
        c_sm: 'center',
      },
      justifyItems: {
        _: 'end',
        c_sm: undefined,
      },

      gridColumn: { _: 2, c_sm: 1 },
      gridRow: 1,
    },
    expand: {
      minWidth: 'min-content',
    },
  },
});

const columnJustify = variant({
  prop: 'justify',
  defaultVariant: 'left',
  variants: {
    left: {
      justifyContent: { c_sm: 'flex-start' },
    },
    right: {
      justifyContent: { c_sm: 'flex-end' },
      '& div': {
        width: { sm: 'fit-content' },
      },
    },
  },
});

const columnSizes = variant({
  prop: 'size',
  defaultVariant: 'content',
  base: { minWidth: 0, maxWidth: 1, flexShrink: 1 },
  variants: {
    sm: {
      flexBasis: { c_sm: '6rem' },
      width: { c_sm: '6rem' },
    },
    md: {
      flexBasis: { c_sm: '10rem' },
      width: { c_sm: '10rem' },
    },
    lg: {
      flexBasis: { c_sm: '12rem' },
      width: { c_sm: '12rem' },
    },
    xl: {
      flexBasis: { c_sm: '20rem' },
      width: { c_sm: '20rem' },
    },
    content: {
      flexShrink: 0,
    },
  },
});

const columnStates = states({
  fill: { flexGrow: { c_sm: 1 } },
  sticky: {
    width: '100%',
    height: '100%',
    bg: 'inherit',
  },
  delimiter: {
    overflow: 'visible',
    '&:after': {
      display: { _: 'none', c_sm: 'block' },
      content: '""',
      bg: 'background-current',
      right: -4,
      top: 0,
      bottom: -3,
      width: 4,
      position: 'absolute',
    },
  },
  ghost: {
    visibility: 'hidden',
    pointerEvents: 'none',
    opacity: 0,
  },
  columnHeader: {
    fontWeight: 400,
    overflow: 'visible',
    whiteSpace: 'normal',
    alignItems: 'flex-end',
  },
  wrap: {
    whiteSpace: 'normal',
  },
  /**
   * Whether the column/cell should allow content to overflow out of it.
   * Useful for tooltips and conditionally rendered content that wants to overflow.
   */
  showOverflow: {
    overflow: 'visible',
  },
});

const columnSpacing = variant({
  prop: 'spacing',
  base: {
    px: { _: 8, c_sm: 0 },
    '&:first-of-type': {
      pl: 8,
    },
    '&:last-of-type': {
      pr: 8,
    },
  },
  variants: {
    normal: {
      py: { _: 0, c_sm: 16 },
    },
    condensed: {
      py: { _: 0, c_sm: 8 },
    },
    compact: {},
  },
});

export interface ColProps
  extends StyleProps<typeof columnSizes>,
    StyleProps<typeof columnSpacing>,
    StyleProps<typeof columnType>,
    StyleProps<typeof columnStates>,
    StyleProps<typeof columnJustify>,
    StyleProps<(typeof system)['layout']> {}

export const ColEl = styled(
  'div',
  styledOptions([
    'fill',
    'ghost',
    'spacing',
    'columnHeader',
    'sticky',
    'size',
    'justify',
    'type',
  ])
)<ColProps>(
  css({
    fontWeight: 400,
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'relative',
  }),
  columnSpacing,
  columnSizes,
  columnType,
  columnStates,
  columnJustify,
  system.layout
);

export const StickyHeaderColWrapper = styled.th(
  css({
    '&:before': {
      content: '""',
      position: 'absolute',
      bg: { _: 'transparent', c_sm: 'background' },
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: -1,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      bg: { _: 'inherit', c_sm: 'background-current' },
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: -1,
    },
    position: 'sticky',
    left: 0,
    zIndex: 1,
    bg: { _: 'transparent', c_sm: 'inherit' },
    '&:not(:first-of-type)': {
      left: { c_sm: 16 },
      overflow: 'visible',
    },
    '&:not(:first-of-type):before': {
      display: { _: 'none', c_sm: 'block' },
      content: '""',
      left: -16,
      height: 1,
      width: 16,
      position: 'absolute',
    },
  })
);

const listStyles = css({
  containerType: 'inline-size',
});

export const StaticListWrapper = styled(Box)(listStyles);

export const AnimatedListWrapper = styled(motion(Box))(listStyles);

export const hiddenVariant = {
  background: `linear-gradient(90deg, transparent 0%, transparent 40%, ${theme.colors['background-selected']} 50%, ${theme.colors['border-tertiary']} 100%)`,
  backgroundSize: '0px 100%',
  backgroundPosition: 'right',
  backgroundRepeat: 'no-repeat',
} as const;

export const shadowVariant = {
  background: `linear-gradient(90deg, transparent 0%, transparent 40%, ${theme.colors['background-selected']} 50%, ${theme.colors['border-tertiary']} 100%)`,
  backgroundSize: '124px 100%',
  backgroundPosition: 'right',
  backgroundRepeat: 'no-repeat',
};
