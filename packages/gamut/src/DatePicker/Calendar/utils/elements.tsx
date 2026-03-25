import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { TextButton } from '../../../Button';

export const TableHeader = styled.th(
  css({
    fontSize: 14,
    fontWeight: 'base',
    color: 'text-disabled',
    textAlign: 'center',
  })
);

export const DateCell = styled.td(
  css({
    padding: 0,
  })
);

export const DateButton = styled(TextButton)(
  states({
    isToday: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 4,
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
    disabled: {
      color: 'text-disabled',
      textDecoration: 'line-through',
      '&:hover': {
        textDecoration: 'line-through',
      },
    },
  }),
  css({
    fontWeight: 'base',
    width: '32px',
  })
);
