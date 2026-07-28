import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';
import { HTMLAttributes } from 'react';

export type StatusBadgeStatus = 'success' | 'warning' | 'info';

/**
 * Mutually exclusive background/text color pairings for each status.
 * `success` and `warning` reuse the theme's semantic feedback colors so
 * StatusBadge stays in sync with dark/light color modes; `info` falls back
 * to the core blue swatches since the theme has no dedicated "info" token.
 */
const statusBadgeVariants = variant({
  prop: 'status',
  base: {
    alignItems: 'center',
    borderRadius: 'full',
    display: 'inline-flex',
    fontFamily: 'accent',
    fontSize: 12,
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: 1,
    px: 12,
    py: 4,
    whiteSpace: 'nowrap',
    width: 'fit-content',
  },
  variants: {
    success: {
      bg: 'background-success',
      color: 'feedback-success',
    },
    warning: {
      bg: 'background-warning',
      color: 'feedback-warning',
    },
    info: {
      bg: 'blue-100',
      color: 'blue-500',
    },
  },
});

const StatusBadgeBase = styled.span(statusBadgeVariants);

export type StatusBadgeProps = Omit<
  StyleProps<typeof statusBadgeVariants>,
  'status'
> &
  Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
    /** Which of the three mutually exclusive statuses this pill represents. */
    status: StatusBadgeStatus;
  };

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  ...props
}) => {
  return (
    <StatusBadgeBase status={status} {...props}>
      {children}
    </StatusBadgeBase>
  );
};
