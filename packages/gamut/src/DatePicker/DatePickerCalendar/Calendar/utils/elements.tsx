import {
  css,
  states,
  transitionConcat,
  zIndexes,
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

export const CalendarTable = styled.table(
  css({
    /** Row gaps only: 0 between columns, 8px token between rows (incl. under header). */
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
  })
);

export const TableHeader = styled.th(
  css({
    fontSize: 14,
    fontWeight: 'base',
    color: 'text-disabled',
    textAlign: 'center',
  })
);

const datecellStates = states({
  isToday: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 4,
      /** Half of dot width (4px) so the marker sits under the centered date numeral. */
      insetInlineStart: 'calc(50% - 2px)',
      width: 4,
      height: 4,
      borderRadius: 'full',
      bg: 'hyper',
    },
  },
  isSelected: {
    bg: 'text',
    color: 'background',
    '&:hover, &:focus': {
      bg: 'secondary-hover',
      color: 'background',
    },
    '&::after': {
      bg: 'background',
    },
  },
  isRangeStart: {
    borderRadiusRight: 'none',
  },
  isRangeEnd: {
    borderRadiusLeft: 'none',
  },
  isInRange: {
    bg: 'text-disabled',
    color: 'background',
    borderRadius: 'none',
    '&:hover, &:focus': {
      bg: 'secondary-hover',
      color: 'background',
    },
    '&::after': {
      bg: 'background',
    },
  },
  isDisabled: {
    color: 'text-disabled',
    bg: 'transparent',
    cursor: 'not-allowed',
    userSelect: 'none',
    textDecoration: 'line-through',
    '&:hover, &:focus': {
      color: 'text-disabled',
      bg: 'transparent',
      textDecoration: 'line-through',
      cursor: 'not-allowed',
      userSelect: 'none',
    },
  },
});

type DateCellProps = StyleProps<typeof datecellStates>;

export const DateCell = styled.td<DateCellProps>(
  css({
    fontWeight: 'base',
    width: '32px',
    height: '32px',
    textAlign: 'center',
    padding: 0,
    position: 'relative',
    borderRadius: 'md',
    transition: transitionConcat(
      ['border-color', 'color', 'background-color', 'box-shadow'],
      'fast',
      'ease-in'
    ),
    '&:hover': {
      color: 'secondary',
      bg: 'background-hover',
      transition: transitionConcat(
        ['background-color', 'box-shadow'],
        'fast',
        'ease-in'
      ),
      cursor: 'pointer',
    },
    '&:focus-visible': {
      color: 'secondary',
      outline: 'none',
    },
    '&:active': {
      color: 'text',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: -3,
      borderRadius: 'lg',
      border: 2,
      opacity: 0,
      zIndex: zIndexes.base,
    },
    '&:focus-visible::before': {
      opacity: 1,
    },
  }),
  datecellStates
);
