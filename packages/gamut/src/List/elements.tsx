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
    StyleProps<typeof spacingVariants> {}

export const ListEl = styled(
  'ul',
  styledOptions<'ul'>()
)<ListProps>(listVariants);

const rowStates = states({
  isOl: {
    '&::before': {
      ...olStyles,
      display: { _: 'none', xs: 'flex' },
      pl: 16,
    },
  },
  scrollable: {
    minWidth: 'min-content',
    width: '100%',
  },
  expanded: {
    display: 'flex',
    flexDirection: { xs: 'column' },
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
      gap: { _: 8, xs: 40 },
    },
    condensed: {
      fontSize: 16,
      gap: { _: 8, xs: 32 },
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
  base: {
    // gridAutoRows: 'minmax(1.5rem, max-content)',
    // gridTemplateColumns: 'minmax(0, 1fr) max-content',
  },
  defaultVariant: 'xs',
  variants: {
    xs: {
      display: { _: 'grid', xs: 'flex' },
      flexDirection: { _: 'column', xs: 'row' },
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
    py: { _: 8, xs: 0 },
    bg: 'inherit',
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

export const HeaderEl = styled('div', styledOptions)<HeaderProps>(
  css({
    display: 'flex',
    position: { _: 'initial', xs: 'sticky' },
    flexDirection: ['column', 'row'],
    top: 0,
    bg: 'background-current',
    zIndex: 2,
    fontFamily: 'accent',
  }),
  spacingVariants,
  rowStates,
  headerVariants
);

const headerStyles = { gridColumn: undefined } as const;
const columnType = variant({
  prop: 'type',
  defaultVariant: 'content',
  variants: {
    header: {
      ...headerStyles,
    },
    orderedHeader: {
      ...headerStyles,
      '&::before': {
        ...olStyles,
        display: { _: 'flex', xs: 'none' },
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
        xs: 'center',
      },
      justifyItems: {
        _: 'end',
        xs: undefined,
      },

      gridColumn: { _: 2, xs: 1 },
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
      justifyContent: { xs: 'flex-start' },
    },
    right: {
      justifyContent: { xs: 'flex-end' },
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
      flexBasis: { xs: '6rem' },
      width: { xs: '6rem' },
    },
    md: {
      flexBasis: { xs: '10rem' },
      width: { xs: '10rem' },
    },
    lg: {
      flexBasis: { xs: '12rem' },
      width: { xs: '12rem' },
    },
    xl: {
      flexBasis: { xs: '20rem' },
      width: { xs: '20rem' },
    },
    content: {
      flexShrink: 0,
    },
  },
});

const columnStates = states({
  fill: { flexGrow: { xs: 1 } },
  sticky: {
    width: '100%',
    height: '100%',
    bg: 'inherit',
  },
  delimiter: {
    overflow: 'visible',
    '&:after': {
      display: { _: 'none', xs: 'block' },
      content: '""',
      bg: 'background-current',
      right: -4,
      top: 0,
      bottom: -2,
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
    px: { _: 16, xs: 0 },
    '&:first-of-type': {
      pl: 8,
    },
    '&:last-of-type': {
      pr: 8,
    },
  },
  variants: {
    normal: {
      py: { _: 0, xs: 16 },
    },
    condensed: {
      py: { _: 0, xs: 8 },
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

export const StickyColumnWrapper = styled.th(
  css({
    '&:before': {
      content: '""',
      position: 'absolute',
      bg: 'background',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: -1,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      bg: 'inherit',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: -1,
    },
    position: 'sticky',
    left: 0,
    zIndex: 1,
    bg: 'inherit',
    fontWeight: 400,
    '&:not(:first-of-type)': {
      left: { xs: 16 },
      overflow: 'visible',
    },
    '&:not(:first-of-type):before': {
      display: { _: 'none', xs: 'block' },
      content: '""',
      bg: 'inherit',
      left: -16,
      height: 1,
      width: 16,
      position: 'absolute',
    },
  })
);

export const ListWrapper = styled(Box)(
  states({
    scrollable: {
      boxShadow: { _: undefined, xs: 'inset -24px 0 24px -24px black' },
    },
  })
);
