import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

/**
 * `success` and `warning` use the existing `background-success`/`feedback-success`
 * and `background-warning`/`feedback-warning` semantic token pairs, so both adapt
 * correctly between light and dark ColorMode.
 *
 * There is no semantic `info` feedback token yet (only success/warning/error exist),
 * so `info` deliberately falls back to a fixed raw-palette pair and will NOT adapt
 * to ColorMode until a semantic "info" token is added to the theme.
 */
export const statusBadgeVariants = variant({
  prop: 'status',
  base: {
    alignItems: 'center',
    borderRadius: 'full',
    display: 'inline-flex',
    fontSize: 14,
    fontWeight: 'title',
    lineHeight: 'title',
    px: 8,
    py: 4,
    whiteSpace: 'nowrap',
  },
  defaultVariant: 'info',
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
      bg: 'blue-0',
      color: 'blue-500',
    },
  },
});

export type StatusBadgeProps = StyleProps<typeof statusBadgeVariants>;

/**
 * A small pill that communicates one of three mutually-exclusive statuses —
 * `success`, `warning`, or `info` — each with its own background and text color.
 *
 * ```tsx
 * <StatusBadge status="success">Live</StatusBadge>
 * <StatusBadge status="warning">Needs review</StatusBadge>
 * <StatusBadge status="info">Draft</StatusBadge>
 * ```
 */
export const StatusBadge = styled.span<StatusBadgeProps>(statusBadgeVariants);
