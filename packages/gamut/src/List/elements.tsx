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

const { space, grid, flex, layout } = system;

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
    StyleProps<typeof space> {}

export const ListEl = styled('ul', styledOptions<'ul'>())<ListProps>(
  listVariants,
  space
);

const rowStates = states({
  isOl: {
    '&::before': {
      ...olStyles,
      display: { _: 'flex', c_base: 'none', c_sm: 'flex' },
      pl: 16,
    },
  },
  scrollable: {
    minWidth: 'min-content',
    width: '100%',
  },
  expanded: {
    display: 'flex',
    flexDirection: { _: 'column', c_base: 'row', c_sm: 'column' },
  },
  /**
   * Overrides the background of the element to transparent.
   */
  transparentBg: {
    bg: 'transparent',
  },
});

const interactiveState = states({
  interactive: {
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
      rowGap: { _: 0, c_base: 8, c_sm: 0 },
      columnGap: { _: 40, c_base: 8, c_sm: 40 },
    },
    condensed: {
      fontSize: 16,
      rowGap: { _: 0, c_base: 8, c_sm: 0 },
      columnGap: { _: 32, c_base: 8, c_sm: 32 },
      gap: { _: 40, c_base: 8, c_sm: 40 },
    },

    compact: {
      gap: 0,
      py: 0,
    },
  },
});

const rowVariants = variant({
  prop: 'variant',
  base: {},
  variants: {
    default: {
      bg: 'background',
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
      bg: 'background',
      border: 1,
      borderRadius: 'sm',
    },
    block: {
      bg: 'background',
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
      display: { _: 'flex', c_base: 'grid', c_sm: 'flex' },
      flexDirection: { _: 'row', c_base: 'column', c_sm: 'row' },
    },
    sm: {
      display: { _: 'grid', c_md: 'flex', md: 'flex' },
      flexDirection: { _: 'column', c_md: 'row', md: 'row' },
    },
    md: {
      display: { _: 'grid', c_lg: 'flex', lg: 'flex' },
      flexDirection: { _: 'column', c_lg: 'row', lg: 'row' },
    },
    grid: { display: 'grid' },
  },
});

export interface RowProps
  extends StyleProps<typeof rowVariants>,
    StyleProps<typeof rowBreakpointVariants>,
    StyleProps<typeof spacingVariants>,
    StyleProps<typeof interactiveState>,
    StyleProps<typeof rowStates>,
    StyleProps<typeof flex>,
    StyleProps<typeof grid> {}

export const RowEl = styled('li', styledOptions<'li'>())<RowProps>(
  css({
    py: { _: 0, c_base: 8, c_sm: 0 },
    width: 1,
  }),
  variance.compose(grid, flex),
  rowBreakpointVariants,
  rowVariants,
  spacingVariants,
  interactiveState,
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
    position: { _: 'sticky', c_base: 'initial', c_sm: 'sticky' },
    flexDirection: { _: 'row', c_base: 'column', c_sm: 'row' },
    top: 0,
    bg: 'background-current',
    zIndex: 2,
    fontFamily: 'accent',
    pb: { _: 0, c_base: 8, c_sm: 0 },
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
        display: { _: 'none', c_base: 'flex', c_sm: 'none' },
        pl: 8,
      },
    },
    content: {
      gridColumn: { _: 'auto', c_base: 1, c_sm: 'auto' },
      gridColumnEnd: { _: 'auto', c_base: 'span 1', c_sm: 'auto' },
    },
    select: {
      gridColumn: { _: 1, c_base: 3, c_sm: 1 },
      gridRow: 1,
      minWidth: 'min-content',
      alignItems: {
        _: 'center',
        c_base: 'flex-start',
        c_sm: 'center',
      },
      justifyItems: {
        _: 'auto',
        c_base: 'end',
        c_sm: 'auto',
      },
    },
    control: {
      gridColumn: { _: 1, c_base: 3, c_sm: 1 },
      gridRow: 1,
      minWidth: 'min-content',
      alignItems: {
        _: 'center',
        c_base: 'flex-start',
        c_sm: 'center',
      },
      justifyItems: {
        _: 'auto',
        c_base: 'end',
        c_sm: 'auto',
      },
    },
    tableControl: {
      minWidth: 'min-content',
      alignItems: {
        _: 'center',
        c_base: 'flex-start',
        c_sm: 'center',
      },
      justifyItems: {
        _: 'auto',
        c_base: 'end',
        c_sm: 'auto',
      },
    },
    expand: {
      minWidth: 'min-content',
    },
    expandControl: {
      gridColumnEnd: { _: 'auto', c_base: 'span 3', c_sm: 'auto' },
    },
  },
});

const columnJustify = variant({
  prop: 'justify',
  defaultVariant: 'left',
  variants: {
    left: {
      justifyContent: {
        _: 'flex-start',
        c_base: 'initial',
        c_sm: 'flex-start',
      },
    },
    right: {
      justifyContent: { _: 'flex-end', c_base: 'initial', c_sm: 'flex-end' },
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
      flexBasis: { _: '6rem', c_base: 'auto', c_sm: '6rem' },
      width: { _: '6rem', c_base: 'auto', c_sm: '6rem' },
    },
    md: {
      flexBasis: { _: '10rem', c_base: 'auto', c_sm: '10rem' },
      width: { _: '10rem', c_base: 'auto', c_sm: '10rem' },
    },
    lg: {
      flexBasis: { _: '12rem', c_base: 'auto', c_sm: '12rem' },
      width: { _: '12rem', c_base: 'auto', c_sm: '12rem' },
    },
    xl: {
      flexBasis: { _: '20rem', c_base: 'auto', c_sm: '20rem' },
      width: { _: '20rem', c_base: 'auto', c_sm: '20rem' },
    },
    content: {
      flexShrink: 0,
    },
  },
});

const columnStates = states({
  fill: { flexGrow: { _: 1, c_base: 0, c_sm: 1 } },
  sticky: {
    height: '100%',
    bg: 'inherit',
  },
  delimiter: {
    overflow: 'visible',
    '&:after': {
      display: { _: 'block', c_base: 'none', c_sm: 'block' },
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
    height: 0,
  },
  columnHeader: {
    fontWeight: 400,
    overflow: 'visible',
    whiteSpace: 'normal',
    alignItems: 'flex-end',
  },
  dataTablePadding: {
    '&:first-of-type': {
      pl: 8,
    },
    '&:last-of-type': {
      pr: 8,
    },
  },
  /**
   * Padding is added to the first and last columns of a RowEl except expandable DataList because it causes a layout shift.
   * In that case, the padding is instead added directly to the Expandable control.
   */
  firstColumn: { pl: 8 },
  lastColumn: { pr: 8 },
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
    px: { _: 0, c_base: 8, c_sm: 0 },
  },
  variants: {
    normal: {
      py: { _: 16, c_base: 0, c_sm: 16 },
    },
    condensed: {
      py: { _: 8, c_base: 0, c_sm: 8 },
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
    StyleProps<typeof layout> {}

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
  layout
);

const stickyHeaderStates = states({
  notFirstStickyColumn: {
    left: { _: 16, c_base: 0, c_sm: 16 },
    overflow: 'visible',
    '&:before': {
      display: { _: 'block', c_base: 'none', c_sm: 'block' },
      content: '""',
      left: -16,
      height: 1,
      width: 16,
      position: 'absolute',
    },
  },
});

const stickyHeaderStyles = css({
  '&:before': {
    content: '""',
    position: 'absolute',
    bg: { _: 'background', c_base: 'transparent', c_sm: 'background' },
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bg: {
      _: 'background-current',
      c_base: 'inherit',
      c_sm: 'background-current',
    },
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  display: 'flex',
  flexShrink: 0,
  position: 'sticky',
  left: 0,
  zIndex: 1,
  bg: { _: 'inherit', c_base: 'transparent', c_sm: 'inherit' },
});

export interface StickyHeaderColWrapperProps
  extends StyleProps<typeof stickyHeaderStates> {}

export const StickyHeaderColWrapper = styled(
  'th',
  styledOptions<'th'>()
)<StickyHeaderColWrapperProps>(stickyHeaderStyles, stickyHeaderStates);

const listStyles = css({
  containerType: 'inline-size',
});

const listStates = states({
  disableContainerQuery: {
    containerType: 'normal',
  },
});

export const StaticListWrapper = styled(Box)(listStyles, listStates);

export const AnimatedListWrapper = styled(motion.create(Box))(
  listStyles,
  listStates
);

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
