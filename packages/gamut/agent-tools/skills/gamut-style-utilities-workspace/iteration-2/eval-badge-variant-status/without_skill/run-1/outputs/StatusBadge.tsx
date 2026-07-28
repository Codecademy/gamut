import { styledOptions, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

export type StatusBadgeStatus = 'success' | 'warning' | 'info';

const statusVariants = variant({
  prop: 'status',
  defaultVariant: 'info',
  base: {
    alignItems: 'center',
    borderRadius: 'xl',
    display: 'inline-flex',
    fontFamily: 'accent',
    fontSize: 12,
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: 1,
    px: 8,
    py: 4,
    whiteSpace: 'nowrap',
    width: 'min-content',
  },
  variants: {
    success: {
      bg: 'green-100',
      textColor: 'green-900',
    },
    warning: {
      bg: 'yellow-0',
      textColor: 'yellow-900',
    },
    info: {
      bg: 'blue-100',
      textColor: 'blue-800',
    },
  },
});

export type StatusBadgeProps = StyleProps<typeof statusVariants> & {
  status: StatusBadgeStatus;
};

/**
 * A small pill that communicates the status of something as
 * 'success', 'warning', or 'info', each with its own background
 * and text color.
 */
export const StatusBadge = styled(
  'span',
  styledOptions
)<StatusBadgeProps>(statusVariants);
