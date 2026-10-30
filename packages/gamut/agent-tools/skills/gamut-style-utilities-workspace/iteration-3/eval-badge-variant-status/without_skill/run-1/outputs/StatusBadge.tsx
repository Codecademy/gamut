import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

/**
 * Mutually exclusive visual variants for StatusBadge, each with its own
 * background and text color.
 */
const statusVariants = variant({
  defaultVariant: 'info',
  prop: 'status',
  base: {
    alignItems: 'center',
    borderRadius: 'xl',
    display: 'inline-flex',
    fontFamily: 'accent',
    fontSize: 12,
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: 1.5 as any,
    px: 8,
    py: 2,
    whiteSpace: 'nowrap',
    width: 'min-content',
  },
  variants: {
    success: {
      bg: 'green',
      textColor: 'white',
    },
    warning: {
      bg: 'yellow',
      textColor: 'navy',
    },
    info: {
      bg: 'blue',
      textColor: 'white',
    },
  },
});

const statusBadgeProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export type StatusBadgeProps = StyleProps<typeof statusBadgeProps> &
  StyleProps<typeof statusVariants> & {
    children?: ReactNode;
  };

/**
 * A small pill that communicates one of three statuses: 'success',
 * 'warning', or 'info'. Each status has its own background and text color.
 */
export const StatusBadge = styled('span', styledOptions)<StatusBadgeProps>(
  statusBadgeProps,
  statusVariants
);
